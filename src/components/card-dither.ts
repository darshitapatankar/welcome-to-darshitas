export type CardDitherConfig = {
  levels: number;
  ditherMatrix: 4 | 8 | 16;
  ditherCellPx: number;
  saturationBoost: number;
  contrastBoost: number;
  ditherOpacity: number;
  ditherMotionStrength: number;
  ditherMotionSpeed: number;
  parallaxStrength: number;
  textureZoom: number;
  fadeInMs: number;
  fadeOutMs: number;
};

export const CARD_DITHER_CONFIG: CardDitherConfig = {
  levels: 7,
  ditherMatrix: 16,
  ditherCellPx: 4,
  saturationBoost: 1.3,
  contrastBoost: 1.04,
  ditherOpacity: 0.75,
  ditherMotionStrength: 0.06,
  ditherMotionSpeed: 0.85,
  parallaxStrength: 0,
  textureZoom: 1,
  fadeInMs: 200,
  fadeOutMs: 300,
};

type TextureSource = HTMLImageElement | HTMLVideoElement;

type ActiveCard = {
  card: HTMLElement;
  container: HTMLElement;
  grid: HTMLElement | null;
  source: TextureSource;
};

type PendingSource = {
  event: "load" | "loadeddata";
  listener: () => void;
  source: TextureSource;
};

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  uniform vec2 u_uvScale;
  uniform float u_cellPx;
  uniform float u_levels;
  uniform float u_matrixSize;
  uniform float u_saturationBoost;
  uniform float u_contrastBoost;
  uniform float u_ditherOpacity;
  uniform float u_ditherTime;
  uniform float u_ditherMotionStrength;
  uniform float u_scrollProgress;
  uniform float u_parallaxStrength;
  uniform float u_textureZoom;
  uniform float u_aberrationPx;
  varying vec2 v_uv;

  float bayerDigit(float xBit, float yBit) {
    if (yBit < 0.5) return xBit < 0.5 ? 0.0 : 2.0;
    return xBit < 0.5 ? 3.0 : 1.0;
  }

  float bitAt(float value, float divisor) {
    return floor(mod(value / divisor, 2.0));
  }

  float bayerThreshold(vec2 point) {
    vec2 cell = mod(floor(point), u_matrixSize);
    float digit0 = bayerDigit(bitAt(cell.x, 1.0), bitAt(cell.y, 1.0));
    float digit1 = bayerDigit(bitAt(cell.x, 2.0), bitAt(cell.y, 2.0));
    float value = digit0 * 4.0 + digit1;

    if (u_matrixSize > 4.5) {
      float digit2 = bayerDigit(bitAt(cell.x, 4.0), bitAt(cell.y, 4.0));
      value = value * 4.0 + digit2;
    }
    if (u_matrixSize > 8.5) {
      float digit3 = bayerDigit(bitAt(cell.x, 8.0), bitAt(cell.y, 8.0));
      value = value * 4.0 + digit3;
    }

    return (value + 0.5) / (u_matrixSize * u_matrixSize);
  }

  float randomCell(vec2 cell, float timeSlice) {
    vec2 seed = cell + vec2(timeSlice * 19.19, timeSlice * 47.47);
    return fract(sin(dot(seed, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    vec2 zoomedUvScale = u_uvScale / max(u_textureZoom, 1.0);
    float verticalMargin = max((1.0 - zoomedUvScale.y) * 0.5, 0.0);
    float parallaxOffset = clamp(
      -u_scrollProgress * u_parallaxStrength,
      -verticalMargin,
      verticalMargin
    );
    vec2 uv = 0.5 + (v_uv - 0.5) * zoomedUvScale;
    uv.y += parallaxOffset;
    float edge = smoothstep(0.18, 0.72, length(v_uv - 0.5) * 1.45);
    vec2 aberration = vec2(u_aberrationPx / u_resolution.x, 0.0) * edge;
    vec4 centerSample = texture2D(u_texture, uv);
    vec3 sourceColor = vec3(
      texture2D(u_texture, uv + aberration).r,
      centerSample.g,
      texture2D(u_texture, uv - aberration).b
    );

    float luminance = dot(sourceColor, vec3(0.2126, 0.7152, 0.0722));
    vec3 saturated = clamp(
      mix(vec3(luminance), sourceColor, u_saturationBoost),
      0.0,
      1.0
    );
    vec3 contrasted = clamp(
      (saturated - 0.5) * u_contrastBoost + 0.5,
      0.0,
      1.0
    );

    vec2 ditherCell = floor(gl_FragCoord.xy / max(u_cellPx, 1.0));
    float centeredThreshold = bayerThreshold(ditherCell) - 0.5;
    float motionSlice = floor(u_ditherTime);
    float motionBlend = smoothstep(0.0, 1.0, fract(u_ditherTime));
    float randomNow = randomCell(ditherCell, motionSlice);
    float randomNext = randomCell(ditherCell, motionSlice + 1.0);
    float thresholdMotion = (
      mix(randomNow, randomNext, motionBlend) * 2.0 - 1.0
    ) * u_ditherMotionStrength;
    float levelCount = max(u_levels - 1.0, 1.0);
    vec3 thresholded = clamp(
      contrasted + vec3((centeredThreshold + thresholdMotion) / levelCount),
      0.0,
      1.0
    );
    vec3 quantized = floor(thresholded * levelCount + 0.5) / levelCount;

    gl_FragColor = vec4(
      mix(sourceColor, quantized, u_ditherOpacity),
      centerSample.a
    );
  }
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create card dither shader");
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
  const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!program) throw new Error("Unable to create card dither program");
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) ?? "Unknown program error";
    gl.deleteProgram(program);
    throw new Error(message);
  }
  return program;
}

class CardDitherRenderer {
  private readonly canvas: HTMLCanvasElement;
  private readonly gl: WebGLRenderingContext;
  private readonly program: WebGLProgram;
  private readonly texture: WebGLTexture;
  private readonly uniforms: {
    resolution: WebGLUniformLocation | null;
    uvScale: WebGLUniformLocation | null;
    cellPx: WebGLUniformLocation | null;
    levels: WebGLUniformLocation | null;
    matrixSize: WebGLUniformLocation | null;
    saturationBoost: WebGLUniformLocation | null;
    contrastBoost: WebGLUniformLocation | null;
    ditherOpacity: WebGLUniformLocation | null;
    ditherTime: WebGLUniformLocation | null;
    ditherMotionStrength: WebGLUniformLocation | null;
    scrollProgress: WebGLUniformLocation | null;
    parallaxStrength: WebGLUniformLocation | null;
    textureZoom: WebGLUniformLocation | null;
    aberrationPx: WebGLUniformLocation | null;
  };
  private active: ActiveCard | null = null;
  private cleanupTimer: number | null = null;
  private pendingSource: PendingSource | null = null;
  private textureReady = false;
  private videoFrameRequest: number | null = null;
  private ditherMotionFrameRequest: number | null = null;
  private parallaxFrameRequest: number | null = null;
  private parallaxListening = false;
  private readonly reducedMotionQuery: MediaQueryList;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.className = "card-dither-canvas";
    const gl = this.canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      stencil: false,
    });
    if (!gl) throw new Error("WebGL is unavailable for card dithering");
    this.gl = gl;
    this.reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    this.program = createProgram(gl);
    const texture = gl.createTexture();
    const buffer = gl.createBuffer();
    if (!texture || !buffer)
      throw new Error("Unable to allocate card dither GPU data");
    this.texture = texture;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.useProgram(this.program);
    const position = gl.getAttribLocation(this.program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.uniform1i(gl.getUniformLocation(this.program, "u_texture"), 0);

    this.uniforms = {
      resolution: gl.getUniformLocation(this.program, "u_resolution"),
      uvScale: gl.getUniformLocation(this.program, "u_uvScale"),
      cellPx: gl.getUniformLocation(this.program, "u_cellPx"),
      levels: gl.getUniformLocation(this.program, "u_levels"),
      matrixSize: gl.getUniformLocation(this.program, "u_matrixSize"),
      saturationBoost: gl.getUniformLocation(this.program, "u_saturationBoost"),
      contrastBoost: gl.getUniformLocation(this.program, "u_contrastBoost"),
      ditherOpacity: gl.getUniformLocation(this.program, "u_ditherOpacity"),
      ditherTime: gl.getUniformLocation(this.program, "u_ditherTime"),
      ditherMotionStrength: gl.getUniformLocation(
        this.program,
        "u_ditherMotionStrength",
      ),
      scrollProgress: gl.getUniformLocation(this.program, "u_scrollProgress"),
      parallaxStrength: gl.getUniformLocation(
        this.program,
        "u_parallaxStrength",
      ),
      textureZoom: gl.getUniformLocation(this.program, "u_textureZoom"),
      aberrationPx: gl.getUniformLocation(this.program, "u_aberrationPx"),
    };
  }

  start(card: HTMLElement, container: HTMLElement, source: TextureSource) {
    if (this.active && this.active.card !== card) this.finishActive();

    const canvasWasConnected = this.canvas.isConnected;
    this.clearCleanupTimer();
    this.clearPendingSource();
    this.stopVideoFrameLoop();
    this.stopDitherMotionLoop();

    const grid = card.closest<HTMLElement>(".project-card-grid");
    this.active = { card, container, grid, source };
    this.textureReady = false;
    card.dataset.ditherHovered = "true";
    if (grid) grid.dataset.cardHoverActive = "true";
    container.appendChild(this.canvas);
    this.resize();
    this.startParallaxUpdates();

    if (source instanceof HTMLVideoElement) {
      source.play().catch(() => undefined);
    }

    if (this.uploadTexture()) {
      this.draw();
      this.reveal(card, canvasWasConnected);
      this.startVideoFrameLoop();
      this.startDitherMotionLoop();
    } else {
      this.waitForSource(card, source, canvasWasConnected);
    }
  }

  stop(card: HTMLElement) {
    if (this.active?.card !== card) return;
    this.canvas.style.transition = `opacity ${CARD_DITHER_CONFIG.fadeOutMs}ms ease`;
    this.canvas.style.opacity = "0";
    if (
      this.active.source instanceof HTMLVideoElement &&
      !this.active.source.autoplay
    ) {
      this.active.source.pause();
    }
    this.stopVideoFrameLoop();
    this.stopDitherMotionLoop();
    this.stopParallaxUpdates();
    this.clearCleanupTimer();
    this.cleanupTimer = window.setTimeout(() => {
      if (this.active?.card === card) this.finishActive();
    }, CARD_DITHER_CONFIG.fadeOutMs);
  }

  private reveal(card: HTMLElement, canvasWasConnected: boolean) {
    this.canvas.style.transition = `opacity ${CARD_DITHER_CONFIG.fadeInMs}ms cubic-bezier(0.23, 1, 0.32, 1)`;
    if (canvasWasConnected) {
      this.canvas.style.opacity = "1";
      return;
    }
    this.canvas.style.opacity = "0";
    window.requestAnimationFrame(() => {
      if (this.active?.card === card) this.canvas.style.opacity = "1";
    });
  }

  private waitForSource(
    card: HTMLElement,
    source: TextureSource,
    canvasWasConnected: boolean,
  ) {
    const event = source instanceof HTMLVideoElement ? "loadeddata" : "load";
    const listener = () => {
      this.pendingSource = null;
      if (this.active?.card !== card || this.active.source !== source) return;
      this.resize();
      if (!this.uploadTexture()) return;
      this.draw();
      this.reveal(card, canvasWasConnected);
      this.startVideoFrameLoop();
      this.startDitherMotionLoop();
    };
    this.pendingSource = { event, listener, source };
    source.addEventListener(event, listener, { once: true });
  }

  private resize() {
    if (!this.active) return;
    const rect = this.active.container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));
    if (this.canvas.width === width && this.canvas.height === height) return;
    this.canvas.width = width;
    this.canvas.height = height;
    this.gl.viewport(0, 0, width, height);
  }

  private uploadTexture() {
    if (!this.active) return false;
    const { source } = this.active;
    if (
      (source instanceof HTMLImageElement &&
        (!source.complete || !source.naturalWidth)) ||
      (source instanceof HTMLVideoElement && source.readyState < 2)
    ) {
      return false;
    }

    try {
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
      this.gl.texImage2D(
        this.gl.TEXTURE_2D,
        0,
        this.gl.RGBA,
        this.gl.RGBA,
        this.gl.UNSIGNED_BYTE,
        source,
      );
      this.textureReady = true;
      return true;
    } catch {
      return false;
    }
  }

  private draw(timeSeconds = window.performance.now() * 0.001) {
    if (!this.active || !this.textureReady) return;
    const { gl } = this;
    const { source } = this.active;
    const sourceWidth =
      source instanceof HTMLVideoElement
        ? source.videoWidth
        : source.naturalWidth;
    const sourceHeight =
      source instanceof HTMLVideoElement
        ? source.videoHeight
        : source.naturalHeight;
    if (!sourceWidth || !sourceHeight) return;

    const sourceAspect = sourceWidth / sourceHeight;
    const canvasAspect = this.canvas.width / this.canvas.height;
    const uvScaleX =
      sourceAspect > canvasAspect ? canvasAspect / sourceAspect : 1;
    const uvScaleY =
      sourceAspect > canvasAspect ? 1 : sourceAspect / canvasAspect;

    gl.useProgram(this.program);
    gl.uniform2f(
      this.uniforms.resolution,
      this.canvas.width,
      this.canvas.height,
    );
    gl.uniform2f(this.uniforms.uvScale, uvScaleX, uvScaleY);
    gl.uniform1f(this.uniforms.cellPx, CARD_DITHER_CONFIG.ditherCellPx);
    gl.uniform1f(this.uniforms.levels, CARD_DITHER_CONFIG.levels);
    gl.uniform1f(this.uniforms.matrixSize, CARD_DITHER_CONFIG.ditherMatrix);
    gl.uniform1f(
      this.uniforms.saturationBoost,
      CARD_DITHER_CONFIG.saturationBoost,
    );
    gl.uniform1f(this.uniforms.contrastBoost, CARD_DITHER_CONFIG.contrastBoost);
    gl.uniform1f(this.uniforms.ditherOpacity, CARD_DITHER_CONFIG.ditherOpacity);
    gl.uniform1f(
      this.uniforms.ditherTime,
      timeSeconds * CARD_DITHER_CONFIG.ditherMotionSpeed,
    );
    gl.uniform1f(
      this.uniforms.ditherMotionStrength,
      CARD_DITHER_CONFIG.ditherMotionStrength,
    );
    gl.uniform1f(this.uniforms.scrollProgress, this.getScrollProgress());
    gl.uniform1f(
      this.uniforms.parallaxStrength,
      CARD_DITHER_CONFIG.parallaxStrength,
    );
    gl.uniform1f(this.uniforms.textureZoom, CARD_DITHER_CONFIG.textureZoom);
    gl.uniform1f(this.uniforms.aberrationPx, 1.25);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  private readonly queueParallaxDraw = () => {
    if (this.parallaxFrameRequest !== null) return;
    this.parallaxFrameRequest = window.requestAnimationFrame(() => {
      this.parallaxFrameRequest = null;
      if (this.active) this.draw();
    });
  };

  private startParallaxUpdates() {
    if (this.parallaxListening) return;
    this.parallaxListening = true;
    window.addEventListener("scroll", this.queueParallaxDraw, {
      passive: true,
    });
    this.reducedMotionQuery.addEventListener("change", this.queueParallaxDraw);
    this.queueParallaxDraw();
  }

  private stopParallaxUpdates() {
    if (this.parallaxListening) {
      window.removeEventListener("scroll", this.queueParallaxDraw);
      this.reducedMotionQuery.removeEventListener(
        "change",
        this.queueParallaxDraw,
      );
      this.parallaxListening = false;
    }
    if (this.parallaxFrameRequest !== null) {
      window.cancelAnimationFrame(this.parallaxFrameRequest);
      this.parallaxFrameRequest = null;
    }
  }

  private getScrollProgress() {
    if (!this.active || this.reducedMotionQuery.matches) return 0;
    const rect = this.active.card.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const cardCenter = rect.top + rect.height * 0.5;
    const viewportCenter = viewportHeight * 0.5;
    const travelDistance = Math.max((viewportHeight + rect.height) * 0.5, 1);
    return Math.max(
      -1,
      Math.min(1, (cardCenter - viewportCenter) / travelDistance),
    );
  }

  private startVideoFrameLoop() {
    if (!(this.active?.source instanceof HTMLVideoElement)) return;
    const source = this.active.source;
    const renderFrame = (time: number) => {
      if (this.active?.source !== source) return;
      this.uploadTexture();
      this.draw(time * 0.001);
      this.videoFrameRequest = source.requestVideoFrameCallback(renderFrame);
    };
    this.videoFrameRequest = source.requestVideoFrameCallback(renderFrame);
  }

  private stopVideoFrameLoop() {
    if (
      this.videoFrameRequest !== null &&
      this.active?.source instanceof HTMLVideoElement
    ) {
      this.active.source.cancelVideoFrameCallback(this.videoFrameRequest);
    }
    this.videoFrameRequest = null;
  }

  private startDitherMotionLoop() {
    if (
      !this.active ||
      this.active.source instanceof HTMLVideoElement ||
      this.ditherMotionFrameRequest !== null
    ) {
      return;
    }

    const source = this.active.source;
    const renderFrame = (time: number) => {
      if (this.active?.source !== source) return;
      this.draw(time * 0.001);
      this.ditherMotionFrameRequest = window.requestAnimationFrame(renderFrame);
    };
    this.ditherMotionFrameRequest = window.requestAnimationFrame(renderFrame);
  }

  private stopDitherMotionLoop() {
    if (this.ditherMotionFrameRequest !== null) {
      window.cancelAnimationFrame(this.ditherMotionFrameRequest);
    }
    this.ditherMotionFrameRequest = null;
  }

  private clearPendingSource() {
    if (!this.pendingSource) return;
    const { source, event, listener } = this.pendingSource;
    source.removeEventListener(event, listener);
    this.pendingSource = null;
  }

  private clearCleanupTimer() {
    if (this.cleanupTimer === null) return;
    window.clearTimeout(this.cleanupTimer);
    this.cleanupTimer = null;
  }

  private finishActive() {
    if (!this.active) return;
    this.clearCleanupTimer();
    this.clearPendingSource();
    this.stopVideoFrameLoop();
    this.stopDitherMotionLoop();
    this.stopParallaxUpdates();
    delete this.active.card.dataset.ditherHovered;
    if (this.active.grid) delete this.active.grid.dataset.cardHoverActive;
    if (
      this.active.source instanceof HTMLVideoElement &&
      !this.active.source.autoplay
    ) {
      this.active.source.pause();
    }
    this.canvas.remove();
    this.canvas.style.opacity = "0";
    this.textureReady = false;
    this.active = null;
  }
}

let sharedRenderer: CardDitherRenderer | null = null;

function getRenderer() {
  sharedRenderer ??= new CardDitherRenderer();
  return sharedRenderer;
}

export function startCardDither(
  card: HTMLElement,
  container: HTMLElement,
  source: TextureSource,
) {
  try {
    getRenderer().start(card, container, source);
  } catch {
    // WebGL is progressive enhancement; the untouched thumbnail remains visible.
  }
}

export function stopCardDither(card: HTMLElement) {
  sharedRenderer?.stop(card);
}
