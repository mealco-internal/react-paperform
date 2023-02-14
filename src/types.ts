/**
 * Row of the fulled form data.
 */
export interface PaperformSubmissionDataItem {
  /**
   */
  display_label: string,
  /**
   */
  key: string,
  /**
   */
  label: string,
  /**
   */
  raw: string,
  /**
   */
  scopes: string[],
  /**
   */
  type: string,
  /**
   */
  value: string,
}

/**
 * The submission data is an array of objects, each representing a row of the form data.
 */
export interface PaperformSubmission {
  /**
   * The submission data is an array of objects, each representing a row of the form data.
   */
  data: PaperformSubmissionDataItem[],
  /**
   * paperformId is the ID of the form.
   */
  form_id: string,
  /**
   * The submission ID is a unique identifier for the submission.
   */
  submission_id: string,
  /**
   */
  total: 0
}

/**
 * Event fired when the page of the form is changed.
 */
export interface PaperformChangePageEvent {
  /**
   * paperformId is the ID of the form.
   */
  form_id: string,
  /**
   */
  currentPage: number,
  /**
   */
  totalPages: number,
}

/**
 * Base props for the Paperform components.
 * 
 * @see https://paperform.co/help/articles/embedding-guide/
 */
export interface PaperformProps {
  /**
   * To use pre-filling directly through the element, you may pass hardcode values. 
   * For example, you might pre-fill UTM parameters here instead of placing them in the URL's query string.
   */
  prefill?: Record<string, string> | string;

  /**
   * To pre-fill a form by using the query string of the page it's embedded on,
   * you may pre-fill by inheritance, setting this attribute on the element you're using to embed the form.
   * This lets you dynamically pre-fill the form based on the current query string.
   * 
   * @default false
   * @type {boolean}
   */
  prefillInherit?: boolean;

  /**
   * When changing pages on an inline, embedded form, the page is automatically scrolled to the top of the form.
   * 
   * However, if the page the form is embedded on has a fixed header or the form consistently sits lower 
   * on the page than the top, page changes may cause the scroll position to be lower than expected and 
   * may cause confusion for respondents as to where the form went.
   * 
   * Setting the scroll-offset to a number of pixels offsets what is considered the "top" and 
   * enables page changes to more reliably alter the scroll position to where it needs to be.
   */
  scrollOffset?: number;

  /**
   * When changing pages on an inline, embedded form, the page is automatically scrolled to the top of the form.
   * 
   * If you want to disable this behavior entirely, you can set `no-scroll` equal to "1".
   */
  noScroll?: boolean;

  /**
   * Use this to include a spinner (loading indicator) while the form is loading.
   */
  spinner?: boolean;

  /**
   * Delay loading an inline, embedded form until the form has scrolled into view on the screen.
   */
  lazy?: boolean;

  /**
   * This attribute applies to guided mode only.
   * 
   * The height of the embedded form may be restricted to a specific height. 
   * The value can be any valid CSS unit (px, %, em, rem, vw, vh, ...).
   * 
   * This is commonly used to reduce the amount of space a guided mode form takes, 
   * including the spacing between the centered form content and any buttons.
   * 
   * The height may never be larger than the viewport.
   */
  height?: string;

  /**
   * Show a border around an inline, embedded form.
   */
  border?: boolean;

  /**
   * Change the color of the border around an inline, embedded form. 
   * The color value can be any valid CSS color. 
   * If the `border` attribute is not present, this attribute will not do anything.
   */
  borderColor?: string;

  /**
   * Fires when the form is submitted, including the `submission` data.
   * 
   * @see https://paperform.co/help/articles/embedded-form-submission-handling-draft/
   */

  onSubmit?: (submission: PaperformSubmission) => void;
  /**
   * Fires when the page changes in a form, including the `currentPage` and `totalPages` in each response.
   * 
   * @see https://paperform.co/help/articles/embedded-form-submission-handling-draft/
   */

  onPageChange?: (event: PaperformChangePageEvent) => void;
  /**
   * Set the title of the embedded form's iframe.
   * 
   * This can be useful for accessibility purposes.
   */
  title?: string;

  /**
   * Unknown dev attribute.
   */
  dev?: string;
}

/**
 * Props for the Paperform embedded form.
 * 
 * @see https://paperform.co/help/articles/embedding-guide/
 */
export interface PaperformEmbeddedProps extends PaperformProps {
  /**
   * The ID of the form to embed.
   */
  paperformId: string;
}

/**
 * Props for the Paperform popup form.
 * 
 * @see https://paperform.co/help/articles/embedding-guide/
 */
export interface PaperformPopupProps extends Pick<
  PaperformEmbeddedProps,
  'paperformId' | 'spinner' | 'dev' | 'prefill' | 'prefillInherit' | 'onSubmit'
> {
  /**
   * Callback function to be called when the popup is closed by user.
   * 
   * Does not fire when the popup component was removed by the parent component.
   */
  onClose?: () => void,
}
