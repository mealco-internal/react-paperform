/// <reference types="../window" />

export function injectPaperformScriptOnce(onload?: () => void) {
  const voidCallback = () => onload?.();
  if (window.Paperform) {
    voidCallback();
    return;
  }
  const script = document.createElement("script");
  script.src = "https://paperform.co/__embed";
  script.async = true;
  script.onload = voidCallback;
  document.body.appendChild(script);
}
