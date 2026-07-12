import { useEffect, useMemo, useRef, useState } from "react";
import { addPropertyControls, ControlType, RenderTarget } from "framer";

const VERSION = "2.2.1";

function parseVariablesJSON(value?: string) {
  if (!value?.trim()) return {};

  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch (error) {
    console.warn("[UnicornStudioEmbed] Invalid Variables JSON", error);
    return {};
  }
}

function getVariables(props) {
  return {
    ...parseVariablesJSON(props.initialVariables),
  };
}

/**
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 * @framerIntrinsicHeight 400
 * @framerIntrinsicWidth 800
 */
export default function UnicornStudioEmbed(props) {
  const userSdkVersion = props.sdkVersion?.trim();
  const sdkVersion = userSdkVersion || VERSION;
  const controlsEnabled = props.controls !== false;
  const initialPreset = props.preset?.trim() || "";

  const elementRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<any>(null);
  const unsubscribeVariablesRef = useRef<null | (() => void)>(null);
  const scriptId = useRef(
    `unicorn-project-${Math.random().toString(36).substr(2, 9)}`,
  );

  const [versionError, setVersionError] = useState<string | null>(null);
  const [latestVariablesJSON, setLatestVariablesJSON] = useState(
    props.initialVariables || "",
  );

  const variables = useMemo(
    () => getVariables(props),
    [props.initialVariables, props.variableControls],
  );

  const destroyRuntimeControls = (scene = sceneRef.current) => {
    const element = elementRef.current;
    if (!element) return;

    const controlsApi = (window as any).UnicornStudioControls;

    if (controlsApi?.initControls && scene) {
      try {
        const container = document.createElement("div");
        controlsApi.initControls({ scene, element, container })?.destroy?.();
      } catch (error) {
        console.warn("[UnicornStudioEmbed] Failed to destroy controls", error);
      }
    }

    element
      .querySelectorAll("[data-us-controls-root]")
      .forEach((node) => node.remove());
  };

  // simple semver check: 1.2.3
  const isValidVersion = (v: string) =>
    /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/.test(v.trim());

  useEffect(() => {
    const renderTarget = RenderTarget.current();
    const isEditorCanvas = renderTarget === "CANVAS";
    const isEditingOrPreviewing = ["CANVAS", "PREVIEW"].includes(renderTarget);

    if (!isValidVersion(sdkVersion)) {
      console.error(
        `[UnicornStudioEmbed] Invalid SDK version "${sdkVersion}". Expected format: x.y.z (e.g. 1.5.3)`,
      );
      setVersionError(
        `Invalid SDK version "${sdkVersion}". Use x.y.z (e.g. 1.5.3).`,
      );
      return;
    }

    setVersionError(null);

    const initializeScript = (callback: () => void) => {
      const cdnPrefix =
        "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js";
      const scriptSrc = `${cdnPrefix}@v${sdkVersion}/dist/unicornStudio.umd.js`;

      const existingScript = document.querySelector(
        'script[src^="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js"]',
      ) as HTMLScriptElement | null;

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = scriptSrc;
        script.onload = callback;
        script.onerror = () =>
          console.error("Failed to load UnicornStudio script at " + scriptSrc);
        document.body.appendChild(script);
      } else if ((window as any).UnicornStudio) {
        callback();
      } else {
        const waitForLoad = setInterval(() => {
          if ((window as any).UnicornStudio) {
            clearInterval(waitForLoad);
            callback();
          }
        }, 100);
      }
    };

    const initializeUnicornStudio = () => {
      if (props.projectJSON) {
        const dataScript = document.createElement("script");
        dataScript.id = scriptId.current;
        dataScript.type = "application/json";
        dataScript.textContent = props.projectJSON;
        document.body.appendChild(dataScript);

        elementRef.current?.setAttribute(
          "data-us-project-src",
          scriptId.current,
        );
      } else if (props.projectId) {
        const query = props.projectId.split("?");
        const projectId = query[0];
        const production = query[1] && query[1].includes("production");
        const cacheBuster = isEditingOrPreviewing
          ? "?update=" + Math.random()
          : "";

        elementRef.current?.setAttribute(
          "data-us-project",
          projectId + cacheBuster,
        );

        if (production) {
          elementRef.current?.setAttribute("data-us-production", "1");
        }
      }

      const US = (window as any).UnicornStudio;
      if (!US || !elementRef.current) return;

      const existingScene = US.scenes?.find(
        (s) => s.element === elementRef.current,
      );

      if (existingScene) {
        destroyRuntimeControls(existingScene);
        existingScene.destroy();
      }

      const args: any = {
        element: elementRef.current,
        dpi: props.dpi,
        scale: props.scale,
        fps: props.fps,
        lazyLoad: !!props.lazyLoad,
        fixed: !!props.fixed,
        altText: props.altText,
        ariaLabel: props.ariaLabel,
        controls: controlsEnabled,
        initialPreset,
        initialVariables: variables,
      };

      if (props.projectJSON) {
        args.filePath = scriptId.current;
      } else {
        args.projectId = props.projectId;
      }

      US.addScene(args).then((scene: any) => {
        sceneRef.current = scene;

        if (isEditorCanvas) {
          scene.paused = true;
        }

        setLatestVariablesJSON(
          JSON.stringify(scene.getVariables?.() || variables, null, 2),
        );

        unsubscribeVariablesRef.current = scene.onVariableChange?.(
          (_name, _value, values) => {
            setLatestVariablesJSON(JSON.stringify(values, null, 2));
          },
        );
      });
    };

    if (props.projectId || props.projectJSON) {
      initializeScript(initializeUnicornStudio);
    }

    return () => {
      unsubscribeVariablesRef.current?.();
      unsubscribeVariablesRef.current = null;

      destroyRuntimeControls();

      if (sceneRef.current) {
        sceneRef.current.destroy();
        sceneRef.current = null;
      }

      const dataScript = document.getElementById(scriptId.current);
      if (dataScript) dataScript.remove();
    };
  }, [
    props.projectId,
    props.projectJSON,
    sdkVersion,
    controlsEnabled,
    initialPreset,
  ]);

  useEffect(() => {
    if (!sceneRef.current) return;

    sceneRef.current.setVariables?.(variables);
    setLatestVariablesJSON(JSON.stringify(variables, null, 2));
  }, [variables]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div
        ref={elementRef}
        data-us-dpi={props.dpi}
        data-us-scale={props.scale}
        data-us-fps={props.fps}
        data-us-altText={props.altText}
        data-us-ariaLabel={props.ariaLabel}
        data-us-preset={initialPreset || undefined}
        data-us-controls={controlsEnabled ? "true" : undefined}
        {...(props.lazyLoad ? { "data-us-lazyload": "true" } : {})}
        style={{ width: "100%", height: "100%", ...props.style }}
      >
        {props.header && (
          <h1
            style={{
              width: "1px",
              height: "1px",
              margin: "-1px",
              padding: "0",
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              border: "0",
            }}
          >
            {props.header}
          </h1>
        )}
      </div>
      {versionError ? (
        <div
          style={{
            position: "absolute",
            inset: 8,
            background: "rgba(239, 68, 68, 0.12)",
            border: "1px solid rgba(239, 68, 68, 0.5)",
            borderRadius: 6,
            padding: "8px 10px",
            fontSize: 12,
            color: "#991B1B",
            pointerEvents: "none",
          }}
        >
          {versionError}
        </div>
      ) : null}
    </div>
  );
}

UnicornStudioEmbed.displayName = "Unicorn Studio Embed";

addPropertyControls(UnicornStudioEmbed, {
  projectId: {
    type: ControlType.String,
    title: "Project ID",
  },
  projectJSON: {
    type: ControlType.String,
    title: "Project JSON",
  },
  sdkVersion: {
    type: ControlType.String,
    title: "SDK version",
    defaultValue: VERSION,
    placeholder: VERSION,
  },
  preset: {
    type: ControlType.String,
    title: "Preset",
    placeholder: "Brand Dark",
  },
  initialVariables: {
    type: ControlType.String,
    title: "Variables JSON",
    displayTextArea: true,
    placeholder: '{"accentColor":"#88bbff","intensity":0.75}',
  },
  controls: {
    type: ControlType.Boolean,
    title: "Controls",
    defaultValue: true,
  },
  scale: {
    type: ControlType.Number,
    title: "Scale",
    defaultValue: 1,
    min: 0.25,
    max: 1,
    step: 0.01,
  },
  dpi: {
    type: ControlType.Number,
    title: "DPI",
    defaultValue: 1.5,
    min: 0.5,
    max: 2,
    step: 0.1,
  },
  fps: {
    type: ControlType.Number,
    title: "FPS",
    defaultValue: 60,
    min: 10,
    max: 120,
    step: 5,
  },
  header: {
    type: ControlType.String,
    title: "H1 text",
  },
  altText: {
    type: ControlType.String,
    title: "Alt text",
  },
  ariaLabel: {
    type: ControlType.String,
    title: "Aria label",
  },
  lazyLoad: {
    type: ControlType.Boolean,
    title: "Lazy Load",
    defaultValue: false,
  },
  fixed: {
    type: ControlType.Boolean,
    title: "Fixed",
    defaultValue: false,
  },
});
