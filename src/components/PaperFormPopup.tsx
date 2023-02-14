/// <reference types="../window" />
import { useEffect } from "react";
import { PaperformPopupProps } from "../types";
import { injectPaperformScriptOnce } from "../utils";

const PaperformLockedClassName = 'Paperform--locked'

/**
 * Renders a paperform popup
 * 
 * @see https://paperform.co/help/articles/embedding-guide/
 */
export function PaperformPopup(props: PaperformPopupProps) {
  const { paperformId, onClose, ...options } = props

  useEffect(() => {
    let isDestroyed = false;
    let close: (() => void) | undefined = undefined;
    // let element: HTMLElement;
    let observer: MutationObserver;

    function initForm() {
      if (isDestroyed) {
        return;
      }
      if (!window.Paperform) {
        setTimeout(initForm, 100);
        return;
      }
      const res = window.Paperform.popup(paperformId, options);
      close = res?.close;
      // element = res?.el;

      observer = new MutationObserver(function () {
        let isRemoved = !document.body.className.includes(PaperformLockedClassName);
        if (isRemoved) destroyForm(true);
      });

      observer.observe(document.body, {
        attributes: true,
        attributeOldValue: true,
      });
    }
    function destroyForm(byUser: boolean = false) {
      if (isDestroyed) {
        return;
      }
      isDestroyed = true;
      observer?.disconnect();
      close?.();
      if (byUser)
        onClose?.();
    }

    injectPaperformScriptOnce(initForm);

    return destroyForm;
  }, [paperformId, onClose, options]);

  return <></>;
}
