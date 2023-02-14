import { PaperformProps } from "../types";
import kebabCase from "lodash.kebabcase"

const baseGlobalCallbackName = '_react_puppeteer_on';

function normalizePrefill(prefill: Record<string, string> | string | undefined): string | undefined {
    if (!prefill || typeof prefill === 'string') return prefill;
    return Object.entries(prefill).map(([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join("&");
};

function normalizeBoolean(value: boolean | undefined): string | undefined {
    return value ? 'true' : undefined;
}

function normalizeNumber(value: number | undefined): string | undefined {
    return typeof value === 'number' ? value.toString() : undefined;
}

function globalizeCallback(callback?: Function): string | undefined {
    if (!callback) return undefined;
    const name = `${baseGlobalCallbackName}_${callback.name}_${Date.now()}`;
    window[name] = callback;
    return name;
}

export function props2domDataset({ onSubmit, onPageChange, ...props }: PaperformProps): Record<string, string | undefined> {
    const normalized = {
        ...props,
        prefill: normalizePrefill(props.prefill),
        'prefillInherit': normalizeBoolean(props['prefillInherit']),
        'scrollOffset': normalizeNumber(props['scrollOffset']),
        'noScroll': normalizeBoolean(props['noScroll']),
        spinner: normalizeBoolean(props['spinner']),
        lazy: normalizeBoolean(props['lazy']),
        border: normalizeBoolean(props['border']),
        onsubmit: globalizeCallback(onSubmit),
        onpagechange: globalizeCallback(onPageChange),
    };

    return Object.fromEntries(Object.entries(normalized).map(([key, value]) => {
        return [`data-${kebabCase(key)}`, value];
    }))
}

export function cleanUpGlobalCallbacks(callbackKeys: (string | undefined)[]) {
    callbackKeys.forEach(key => {
        if (key) delete window[key];
    })
}
