import { useEffect, useMemo } from "react";
import { PaperformEmbeddedProps } from "../types";
import { cleanUpGlobalCallbacks, injectPaperformScriptOnce, props2domDataset } from "../utils";

/**
 * Renders a paperform embedded form
 * 
 * @see https://paperform.co/help/articles/embedding-guide/
 */
export function PaperformEmbedded(props: PaperformEmbeddedProps) {
  useEffect(() => {
    injectPaperformScriptOnce();
  }, []);

  const nativeProps = useMemo(() => props2domDataset(props), [props]);

  // We need to keep a reference to the callbacks so that we can clean them up
  const callbacks = [nativeProps.onsubmit, nativeProps.onpagechange];
  useEffect(() => {
    return () => cleanUpGlobalCallbacks(callbacks);
  }, [callbacks]);

  return <div {...nativeProps} />;
}
