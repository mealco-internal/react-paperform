import { PaperformProps } from "./types";

export { };

declare global {
  interface Window {
    Paperform?: {
      popup(formId: string, option?: PaperformProps): {
        el: HTMLElement;
        close(): void;
      };
    };
  }
}
