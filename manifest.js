import {
    CONTENT_FILE,
    ICON,
    ICON_128,
    ICON_16,
    ICON_32,
    ICON_48,
    POPUP_FILE,
    WORKER_FILE,
} from "./scripts/build.config";

export const NAME = "";
export const VERSION = "0.1.0";

/**
 * @param {"chrome" | "firefox"} browser
 */
export const MANIFEST = (browser) => ({
    manifest_version: 3,
    name: NAME,
    version: VERSION,
    description: "",
    permissions: ["storage"],
    host_permissions: ["<all_urls>"],
    content_scripts: CONTENT_FILE && [{
        matches: ["<all_urls>"],
        js: [CONTENT_FILE]
    }],
    background: WORKER_FILE && (browser === "chrome" ? {
        service_worker: WORKER_FILE
    } : {
        scripts: [WORKER_FILE]
    }),
    icons: ICON && {
        16: ICON_16,
        32: ICON_32,
        48: ICON_48,
        128: ICON_128,
    },
    action: {
        default_icon: ICON && {
            16: ICON_16,
            32: ICON_32,
            48: ICON_48,
            128: ICON_128,
        },
        default_title: POPUP_FILE && NAME + " popup",
        default_popup: POPUP_FILE
    },
    browser_specific_settings: browser === "chrome" ? undefined : {
        gecko: {
            id: NAME
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "-")
                + "@example.org",
            strict_min_version: "58.0"
        }
    },
});
