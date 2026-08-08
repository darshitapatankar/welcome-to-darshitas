"use client";

import { usePathname } from "next/navigation";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import styles from "./crt-effect.module.css";
import { getSiteSoundEnabled, playSiteSound } from "@/components/site-sound";
import { isProjectPath } from "@/lib/project-routes";

export type CrtConfig = {
  scanlineStrength: number;
  scanlinePitchPx: number;
  scanlineGamma: number;
  driftSpeed: number;
  rollPeriod: number;
  grainStrength: number;
  aberrationPx: number;
  glitchIntensity: number;
  vignette: number;
  barrel: number;
};

export const DEFAULT_CRT_CONFIG: CrtConfig = {
  scanlineStrength: 0.12,
  scanlinePitchPx: 5,
  scanlineGamma: 1.8,
  driftSpeed: 12,
  rollPeriod: 8,
  grainStrength: 0.04,
  aberrationPx: 1.8,
  glitchIntensity: 1,
  vignette: 0.045,
  // Tunable in development at `?crt-debug`; matched to the bezel cutout.
  barrel: 0.05,
};

export const PROJECT_CRT_CONFIG: CrtConfig = {
  scanlineStrength: 0.085,
  scanlinePitchPx: 5,
  scanlineGamma: 2.1,
  driftSpeed: 2.5,
  rollPeriod: 30,
  grainStrength: 0.025,
  aberrationPx: 0.25,
  glitchIntensity: 0.2,
  vignette: 0.025,
  barrel: 0,
};

const VERTEX_SHADER = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_scanlineStrength;
  uniform float u_scanlinePitchPx;
  uniform float u_scanlineGamma;
  uniform float u_driftSpeed;
  uniform float u_rollPeriod;
  uniform float u_grainStrength;
  uniform float u_aberrationPx;
  uniform float u_glitch;
  uniform float u_vignette;
  uniform float u_barrel;
  uniform float u_bootActive;
  uniform float u_bootRoll;
  uniform float u_bootInstability;

  const float TAU = 6.28318530718;

  float hash21(vec2 point) {
    vec3 point3 = fract(vec3(point.xyx) * 0.1031);
    point3 += dot(point3, point3.yzx + 33.33);
    return fract((point3.x + point3.y) * point3.z);
  }

  float triadChannel(float x, float center) {
    float phase = mod(x, 3.0);
    float distanceToCenter = abs(phase - center);
    distanceToCenter = min(distanceToCenter, 3.0 - distanceToCenter);
    return exp(-distanceToCenter * distanceToCenter * 5.5);
  }

  void main() {
    vec2 fragmentPx = gl_FragCoord.xy;
    vec2 uv = fragmentPx / u_resolution;
    vec2 centered = uv * 2.0 - 1.0;
    float radiusSquared = dot(centered, centered);

    // Barrel affects only the CRT structure. Page artwork remains untouched.
    vec2 warped = centered * (1.0 + u_barrel * radiusSquared);
    vec2 crtPx = (warped * 0.5 + 0.5) * u_resolution;

    float rollProgress = fract(u_time / max(u_rollPeriod, 0.001));
    float rollCenter = mix(-0.12, 1.12, rollProgress);
    float rollDistance = abs(uv.y - rollCenter);
    float rollBand = (1.0 - smoothstep(0.0, 0.11, rollDistance)) *
      (1.0 - step(0.5, u_bootActive));

    if (u_bootRoll >= 0.0) {
      float bootRollCenter = mix(-0.14, 1.14, u_bootRoll);
      float bootRollDistance = abs(uv.y - bootRollCenter);
      float bootRollBand = 1.0 - smoothstep(0.0, 0.105, bootRollDistance);
      rollBand = max(rollBand, bootRollBand);
    }

    float scanPhase = ((crtPx.y + u_time * u_driftSpeed) / max(u_scanlinePitchPx, 4.0)) * TAU;
    scanPhase += rollBand * 0.65;
    scanPhase += sin(u_time * 173.0 + crtPx.y * 0.031) *
      u_bootInstability * 1.15;
    float softLine = pow(0.5 + 0.5 * sin(scanPhase), u_scanlineGamma);
    float shade = 1.0 - u_scanlineStrength * softLine;

    // A brighter vertical-hold band is represented by less multiply-darkening.
    shade = min(1.0, shade + rollBand * 0.065);

    float edgeAmount = clamp(length(centered) / 1.41421356, 0.0, 1.0);
    float split = u_aberrationPx * edgeAmount * (1.0 + u_glitch * 3.0);
    vec3 grille = vec3(
      0.95 + 0.05 * triadChannel(crtPx.x + split, 0.5),
      0.95 + 0.05 * triadChannel(crtPx.x, 1.5),
      0.95 + 0.05 * triadChannel(crtPx.x - split, 2.5)
    );

    float frame = floor(u_time * 60.0);
    float grain = hash21(floor(fragmentPx) + vec2(frame * 17.0, frame * 31.0));
    float grainAmount = u_grainStrength * (1.0 + u_glitch);

    vec3 color = vec3(shade) * grille;
    color += (grain - 0.5) * grainAmount;

    float vignetteMask = 1.0 - u_vignette * smoothstep(0.28, 1.65, radiusSquared);
    color *= vignetteMask;

    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
  }
`;

const CONTROLS: Array<{
  key: keyof CrtConfig;
  label: string;
  min: number;
  max: number;
  step: number;
}> = [
  {
    key: "scanlineStrength",
    label: "Scanline darkness",
    min: 0,
    max: 0.5,
    step: 0.01,
  },
  {
    key: "scanlinePitchPx",
    label: "Pitch (device px)",
    min: 4,
    max: 8,
    step: 0.1,
  },
  { key: "scanlineGamma", label: "Edge softness", min: 1, max: 3, step: 0.05 },
  { key: "driftSpeed", label: "Drift (px/sec)", min: 0, max: 30, step: 0.5 },
  {
    key: "rollPeriod",
    label: "Roll period (sec)",
    min: 4,
    max: 15,
    step: 0.25,
  },
  { key: "grainStrength", label: "Grain", min: 0, max: 0.2, step: 0.005 },
  { key: "aberrationPx", label: "Aberration (px)", min: 0, max: 4, step: 0.1 },
  {
    key: "glitchIntensity",
    label: "Glitch intensity",
    min: 0,
    max: 2,
    step: 0.05,
  },
  { key: "vignette", label: "Vignette", min: 0, max: 0.4, step: 0.01 },
  { key: "barrel", label: "Barrel", min: 0, max: 0.06, step: 0.002 },
];

type CrtEffectProps = {
  contentSelector?: string;
};

type PowerOnState = {
  active: boolean;
  rollProgress: number;
  instability: number;
};

type ForceGlitchDetail = {
  durationMs?: number;
  intensityMultiplier?: number;
};

type CrtDebugState = {
  canvas: HTMLCanvasElement;
  config: React.MutableRefObject<CrtConfig>;
  getStats: () => {
    devicePixelRatio: number;
    drawingBufferWidth: number;
    drawingBufferHeight: number;
    drawCalls: number;
    frames: number;
    glitchActive: boolean;
  };
};

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create CRT shader");

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? "Unknown shader error";
    gl.deleteShader(shader);
    throw new Error(message);
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const program = gl.createProgram();

  if (!program) throw new Error("Unable to create CRT shader program");

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) ?? "Unknown program error";
    gl.deleteProgram(program);
    throw new Error(message);
  }

  return program;
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function clamp01(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function backOut(progress: number) {
  const amount = 1.9;
  const shifted = progress - 1;
  return 1 + (amount + 1) * shifted ** 3 + amount * shifted ** 2;
}

function copyCanvasFrames(source: HTMLElement, clone: HTMLElement) {
  const sourceCanvases = source.querySelectorAll("canvas");
  const cloneCanvases = clone.querySelectorAll("canvas");

  sourceCanvases.forEach((sourceCanvas, index) => {
    const cloneCanvas = cloneCanvases[index];
    if (!cloneCanvas) return;

    try {
      cloneCanvas.width = sourceCanvas.width;
      cloneCanvas.height = sourceCanvas.height;
      cloneCanvas.getContext("2d")?.drawImage(sourceCanvas, 0, 0);
    } catch {
      // Cross-origin or transient GPU surfaces may not be copyable. The burst
      // lasts less than 160ms, so leaving that one surface blank is preferable
      // to blocking the effect.
    }
  });
}

function createGlitchSlices(contentSelector: string, intensity: number) {
  const source = document.querySelector<HTMLElement>(contentSelector);
  if (!source) return () => undefined;

  const root = document.createElement("div");
  root.className = styles.glitchRoot;
  root.setAttribute("aria-hidden", "true");

  const viewportHeight = window.innerHeight;
  const sourceRect = source.getBoundingClientRect();
  const sliceCount = Math.floor(randomBetween(3, 7));

  for (let index = 0; index < sliceCount; index += 1) {
    const height = randomBetween(8, 60);
    const y = randomBetween(0, Math.max(viewportHeight - height, 0));
    const direction = Math.random() > 0.5 ? 1 : -1;
    const offset = direction * randomBetween(2, 30) * intensity;

    const slice = document.createElement("div");
    slice.className = styles.glitchSlice;
    slice.style.clipPath = `inset(${y}px 0 ${Math.max(viewportHeight - y - height, 0)}px 0)`;

    const clone = source.cloneNode(true) as HTMLElement;
    clone.classList.add(styles.glitchClone);
    clone.removeAttribute("data-crt-content");
    clone.setAttribute("aria-hidden", "true");
    clone.setAttribute("inert", "");
    clone.style.position = "fixed";
    clone.style.top = `${sourceRect.top}px`;
    clone.style.left = `${sourceRect.left}px`;
    clone.style.width = `${sourceRect.width}px`;
    clone.style.height = `${sourceRect.height}px`;
    clone.style.margin = "0";
    clone.style.transform = `translate3d(${offset}px, 0, 0)`;

    copyCanvasFrames(source, clone);
    slice.appendChild(clone);
    root.appendChild(slice);
  }

  document.body.appendChild(root);
  return () => root.remove();
}

export default function CrtEffect({
  contentSelector = "[data-crt-content]",
}: CrtEffectProps) {
  const pathname = usePathname();
  const projectMode = isProjectPath(pathname);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const powerBlackoutRef = useRef<HTMLDivElement>(null);
  const powerBeamRef = useRef<HTMLDivElement>(null);
  const powerStateRef = useRef<PowerOnState>({
    active: false,
    rollProgress: -1,
    instability: 0,
  });
  const [configOverrides, setConfigOverrides] = useState<Partial<CrtConfig>>(
    {},
  );
  const config = useMemo<CrtConfig>(
    () => ({
      ...(projectMode ? PROJECT_CRT_CONFIG : DEFAULT_CRT_CONFIG),
      ...configOverrides,
    }),
    [configOverrides, projectMode],
  );
  const showPanel = useSyncExternalStore(
    () => () => undefined,
    () =>
      process.env.NODE_ENV === "development" &&
      new URLSearchParams(window.location.search).has("crt-debug"),
    () => false,
  );
  const configRef = useRef(config);

  useLayoutEffect(() => {
    document.documentElement.dataset.crtMode = projectMode ? "project" : "home";
  }, [projectMode]);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  useEffect(() => {
    const root = document.documentElement;
    if (projectMode) {
      const powerWindow = window as typeof window & {
        __crtPowerFailsafe?: number;
      };
      if (powerWindow.__crtPowerFailsafe !== undefined) {
        window.clearTimeout(powerWindow.__crtPowerFailsafe);
        delete powerWindow.__crtPowerFailsafe;
      }
      if (root.dataset.crtPower === "boot") {
        delete root.dataset.crtPower;
        window.dispatchEvent(new CustomEvent("crt:power-on-complete"));
      }
      return;
    }

    const content = document.querySelector<HTMLElement>(contentSelector);
    const blackout = powerBlackoutRef.current;
    const beam = powerBeamRef.current;
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (
      root.dataset.crtPower !== "boot" ||
      reducedMotionQuery.matches ||
      !content ||
      !blackout ||
      !beam
    ) {
      if (root.dataset.crtPower === "boot") {
        delete root.dataset.crtPower;
        window.dispatchEvent(new CustomEvent("crt:power-on-complete"));
      }
      return;
    }

    const powerWindow = window as typeof window & {
      __crtPowerFailsafe?: number;
      __crtPowerSoundPlayed?: boolean;
    };
    if (powerWindow.__crtPowerFailsafe !== undefined) {
      window.clearTimeout(powerWindow.__crtPowerFailsafe);
      delete powerWindow.__crtPowerFailsafe;
    }

    // A window-scoped guard keeps React Strict Mode or a remount from
    // replaying the one-shot sound. A real refresh creates a fresh window.
    if (getSiteSoundEnabled() && !powerWindow.__crtPowerSoundPlayed) {
      powerWindow.__crtPowerSoundPlayed = true;
      playSiteSound("/crt/tv-power-on.mp3", 0.5);
    }

    let animationFrame = 0;
    let previousTime = performance.now();
    let elapsed = 0;
    let finished = false;
    let forcedGlitch = false;
    let currentPhase = -1;
    let scrollGuardFrame = 0;

    const resetNativeScroll = () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    };

    const originalContentStyles = {
      filter: content.style.filter,
      transform: content.style.transform,
      transformOrigin: content.style.transformOrigin,
      visibility: content.style.visibility,
      willChange: content.style.willChange,
    };
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    resetNativeScroll();
    const scrollHeightAtStart = document.documentElement.scrollHeight;

    powerStateRef.current = {
      active: true,
      rollProgress: -1,
      instability: 0,
    };
    content.style.visibility = "visible";
    content.style.transformOrigin = "50% 50vh";
    content.style.transform = "scale3d(1, 0.001, 1)";
    content.style.filter = "brightness(2.8) saturate(0) contrast(1.45)";
    content.style.willChange = "transform, filter";

    const restoreContentStyles = () => {
      content.style.filter = originalContentStyles.filter;
      content.style.transform = originalContentStyles.transform;
      content.style.transformOrigin = originalContentStyles.transformOrigin;
      content.style.visibility = originalContentStyles.visibility;
      content.style.willChange = originalContentStyles.willChange;
    };

    const enterPhase = (phase: number, label: string) => {
      if (currentPhase === phase) return;
      currentPhase = phase;
      const computed = getComputedStyle(content);
      console.info(`[CRT power-on] ${label}`, {
        bodyScrollHeight: document.body.scrollHeight,
        childElementCount: content.childElementCount,
        containsMain: content.querySelector("main") !== null,
        display: computed.display,
        documentScrollHeight: document.documentElement.scrollHeight,
        opacity: computed.opacity,
        scrollHeightMatchesStart:
          document.documentElement.scrollHeight === scrollHeightAtStart,
        scrollY: window.scrollY,
        transform: content.style.transform,
        visibility: computed.visibility,
      });
    };

    const finishPowerOn = () => {
      if (finished) return;
      finished = true;
      window.cancelAnimationFrame(animationFrame);
      blackout.style.display = "none";
      beam.style.display = "none";
      restoreContentStyles();
      powerStateRef.current = {
        active: false,
        rollProgress: -1,
        instability: 0,
      };
      resetNativeScroll();
      delete root.dataset.crtPower;
      resetNativeScroll();
      enterPhase(4, "complete");
      window.dispatchEvent(new CustomEvent("crt:power-on-complete"));
      let remainingGuardFrames = 18;
      const holdAtTop = () => {
        resetNativeScroll();
        remainingGuardFrames -= 1;
        if (remainingGuardFrames > 0) {
          scrollGuardFrame = window.requestAnimationFrame(holdAtTop);
        }
      };
      scrollGuardFrame = window.requestAnimationFrame(holdAtTop);
    };

    const drawPowerOn = (now: number) => {
      resetNativeScroll();
      elapsed += Math.min(Math.max((now - previousTime) / 1000, 0), 0.05);
      previousTime = now;

      if (elapsed < 0.12) {
        enterPhase(0, "phase 0: black");
        blackout.style.display = "block";
        beam.style.display = "none";
      } else if (elapsed < 0.26) {
        enterPhase(1, "phase 1: beam");
        const beamTime = elapsed - 0.12;
        const jitter = Math.sin(beamTime * 235) * 0.9;
        const widthWobble = 1 + Math.sin(beamTime * 91) * 0.004;
        blackout.style.display = "block";
        beam.style.display = "block";
        beam.style.transform = `translate3d(${jitter}px, -50%, 0) scaleX(${widthWobble})`;
      } else if (elapsed < 0.48) {
        enterPhase(2, "phase 2: vertical unfold");
        const progress = clamp01((elapsed - 0.26) / 0.22);
        const verticalScale = Math.max(backOut(progress), 0.001);
        const brightness = 2.8 - progress * 0.55;
        const saturation = 0.03 + progress * 0.09;
        const contrast = 1.45 - progress * 0.08;
        blackout.style.display = "none";
        beam.style.display = elapsed < 0.295 ? "block" : "none";
        content.style.transform = `scale3d(1, ${verticalScale}, 1)`;
        content.style.filter = `brightness(${brightness}) saturate(${saturation}) contrast(${contrast})`;
        powerStateRef.current.rollProgress = -1;
        powerStateRef.current.instability = 0;
      } else if (elapsed < 0.7) {
        enterPhase(3, "phase 3: instability");
        const progress = clamp01((elapsed - 0.48) / 0.22);
        const decay = 1 - progress;
        const horizontalScale =
          1 + Math.sin(progress * Math.PI * 5) * 0.026 * decay;
        const brightness = 1 + 1.25 * decay;
        const saturation = 1 - 0.88 * decay;
        const contrast = 1 + 0.37 * decay;
        blackout.style.display = "none";
        beam.style.display = "none";
        content.style.transform = `scale3d(${horizontalScale}, 1, 1)`;
        content.style.filter = `brightness(${brightness}) saturate(${saturation}) contrast(${contrast})`;
        powerStateRef.current.rollProgress = progress;
        powerStateRef.current.instability = decay;

        if (!forcedGlitch && elapsed >= 0.49) {
          forcedGlitch = true;
          window.dispatchEvent(
            new CustomEvent<ForceGlitchDetail>("crt:force-glitch", {
              detail: { durationMs: 135, intensityMultiplier: 2 },
            }),
          );
        }
      } else {
        finishPowerOn();
        return;
      }

      animationFrame = window.requestAnimationFrame(drawPowerOn);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(animationFrame);
        return;
      }
      previousTime = performance.now();
      animationFrame = window.requestAnimationFrame(drawPowerOn);
    };

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) finishPowerOn();
    };

    animationFrame = window.requestAnimationFrame(drawPowerOn);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.cancelAnimationFrame(scrollGuardFrame);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotionQuery.removeEventListener(
        "change",
        handleReducedMotionChange,
      );
      powerStateRef.current = {
        active: false,
        rollProgress: -1,
        instability: 0,
      };
      blackout.style.removeProperty("display");
      beam.style.removeProperty("display");
      beam.style.removeProperty("transform");
      restoreContentStyles();
      resetNativeScroll();
    };
  }, [contentSelector, projectMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      stencil: false,
    });

    if (!gl) {
      canvas.hidden = true;
      return;
    }

    let program: WebGLProgram;
    try {
      program = createProgram(gl);
    } catch (error) {
      console.error("CRT shader failed to initialize", error);
      canvas.hidden = true;
      return;
    }

    const positionBuffer = gl.createBuffer();
    if (!positionBuffer) {
      gl.deleteProgram(program);
      canvas.hidden = true;
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    gl.useProgram(program);
    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      resolution: gl.getUniformLocation(program, "u_resolution"),
      time: gl.getUniformLocation(program, "u_time"),
      scanlineStrength: gl.getUniformLocation(program, "u_scanlineStrength"),
      scanlinePitchPx: gl.getUniformLocation(program, "u_scanlinePitchPx"),
      scanlineGamma: gl.getUniformLocation(program, "u_scanlineGamma"),
      driftSpeed: gl.getUniformLocation(program, "u_driftSpeed"),
      rollPeriod: gl.getUniformLocation(program, "u_rollPeriod"),
      grainStrength: gl.getUniformLocation(program, "u_grainStrength"),
      aberrationPx: gl.getUniformLocation(program, "u_aberrationPx"),
      glitch: gl.getUniformLocation(program, "u_glitch"),
      vignette: gl.getUniformLocation(program, "u_vignette"),
      barrel: gl.getUniformLocation(program, "u_barrel"),
      bootActive: gl.getUniformLocation(program, "u_bootActive"),
      bootRoll: gl.getUniformLocation(program, "u_bootRoll"),
      bootInstability: gl.getUniformLocation(program, "u_bootInstability"),
    };

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let reducedMotion = reducedMotionQuery.matches;
    let animationFrame = 0;
    let previousTime = performance.now();
    let elapsed = 0;
    let drawCalls = 0;
    let frames = 0;
    let glitchActive = false;
    let glitchUntil = -1;
    let glitchMultiplier = 1;
    let removeGlitchSlices: () => void = () => undefined;

    const resizeCanvas = () => {
      const devicePixelRatio = window.devicePixelRatio || 1;
      const width = Math.max(
        1,
        Math.round(window.innerWidth * devicePixelRatio),
      );
      const height = Math.max(
        1,
        Math.round(window.innerHeight * devicePixelRatio),
      );

      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };

    const finishGlitch = () => {
      if (glitchActive) {
        window.dispatchEvent(new CustomEvent("crt:glitch-end"));
      }
      removeGlitchSlices();
      removeGlitchSlices = () => undefined;
      glitchActive = false;
      glitchUntil = -1;
      glitchMultiplier = 1;
    };

    const startGlitch = ({
      durationSeconds = randomBetween(0.08, 0.16),
      intensityMultiplier = 1,
    }: {
      durationSeconds?: number;
      intensityMultiplier?: number;
    } = {}) => {
      glitchActive = true;
      glitchMultiplier = intensityMultiplier;
      glitchUntil = elapsed + durationSeconds;
      removeGlitchSlices = createGlitchSlices(
        contentSelector,
        configRef.current.glitchIntensity * intensityMultiplier,
      );
      window.dispatchEvent(
        new CustomEvent("crt:glitch-start", {
          detail: { durationMs: durationSeconds * 1000 },
        }),
      );
    };

    const handleForcedGlitch = (event: Event) => {
      if (reducedMotion) return;
      const detail =
        event instanceof CustomEvent
          ? (event.detail as ForceGlitchDetail | undefined)
          : undefined;

      if (glitchActive) {
        finishGlitch();
      }
      startGlitch({
        durationSeconds: Math.max((detail?.durationMs ?? 135) / 1000, 0.04),
        intensityMultiplier: Math.max(detail?.intensityMultiplier ?? 2, 0.1),
      });
    };

    const draw = (now: number) => {
      resizeCanvas();

      const delta = Math.min(Math.max((now - previousTime) / 1000, 0), 0.1);
      previousTime = now;
      if (!reducedMotion) elapsed += delta;

      if (reducedMotion && glitchActive) finishGlitch();
      if (!reducedMotion && glitchActive && elapsed >= glitchUntil)
        finishGlitch();

      const current = configRef.current;
      const shaderTime = reducedMotion ? 0 : elapsed;
      const grainStrength = reducedMotion
        ? current.grainStrength * 0.45
        : current.grainStrength;
      const powerState = powerStateRef.current;

      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.time, shaderTime);
      gl.uniform1f(uniforms.scanlineStrength, current.scanlineStrength);
      gl.uniform1f(uniforms.scanlinePitchPx, current.scanlinePitchPx);
      gl.uniform1f(uniforms.scanlineGamma, current.scanlineGamma);
      gl.uniform1f(uniforms.driftSpeed, reducedMotion ? 0 : current.driftSpeed);
      gl.uniform1f(uniforms.rollPeriod, current.rollPeriod);
      gl.uniform1f(uniforms.grainStrength, grainStrength);
      gl.uniform1f(
        uniforms.aberrationPx,
        reducedMotion ? current.aberrationPx * 0.5 : current.aberrationPx,
      );
      gl.uniform1f(
        uniforms.glitch,
        glitchActive ? current.glitchIntensity * glitchMultiplier : 0,
      );
      gl.uniform1f(uniforms.vignette, current.vignette);
      gl.uniform1f(uniforms.barrel, current.barrel);
      gl.uniform1f(uniforms.bootActive, powerState.active ? 1 : 0);
      gl.uniform1f(uniforms.bootRoll, powerState.rollProgress);
      gl.uniform1f(uniforms.bootInstability, powerState.instability);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      drawCalls += 1;
      frames += 1;
      animationFrame = window.requestAnimationFrame(draw);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(animationFrame);
        return;
      }

      previousTime = performance.now();
      animationFrame = window.requestAnimationFrame(draw);
    };

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
    };

    resizeCanvas();
    animationFrame = window.requestAnimationFrame(draw);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("crt:force-glitch", handleForcedGlitch);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    if (process.env.NODE_ENV === "development") {
      (window as unknown as { __crtEffect?: CrtDebugState }).__crtEffect = {
        canvas,
        config: configRef,
        getStats: () => ({
          devicePixelRatio: window.devicePixelRatio,
          drawingBufferWidth: canvas.width,
          drawingBufferHeight: canvas.height,
          drawCalls,
          frames,
          glitchActive,
        }),
      };
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("crt:force-glitch", handleForcedGlitch);
      reducedMotionQuery.removeEventListener(
        "change",
        handleReducedMotionChange,
      );
      removeGlitchSlices();
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);

      if (process.env.NODE_ENV === "development") {
        delete (window as unknown as { __crtEffect?: CrtDebugState })
          .__crtEffect;
      }
    };
  }, [contentSelector, projectMode]);

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div
        ref={powerBlackoutRef}
        className={styles.powerBlackout}
        aria-hidden="true"
      />
      <div ref={powerBeamRef} className={styles.powerBeam} aria-hidden="true" />
      {showPanel && (
        <aside className={styles.panel} aria-label="CRT effect tuning">
          <h2 className={styles.panelTitle}>CRT post-process</h2>
          {CONTROLS.map((control) => (
            <label className={styles.control} key={control.key}>
              <span>{control.label}</span>
              <output className={styles.value}>{config[control.key]}</output>
              <input
                type="range"
                min={control.min}
                max={control.max}
                step={control.step}
                value={config[control.key]}
                onChange={(event) => {
                  const value = Number(event.currentTarget.value);
                  setConfigOverrides((current) => ({
                    ...current,
                    [control.key]: value,
                  }));
                }}
              />
            </label>
          ))}
        </aside>
      )}
    </>
  );
}
