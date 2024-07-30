import ReExtData from "./ReExtData.json";

/**
 * Returns the path to the specified theme's CSS file for the given SDK version.
 *
 * @param {string} theme - The name of the theme.
 * @param {string} sdkversion - The version of the SDK.
 * @return {string} The path to the theme's CSS file.
 */
export function getThemePath(theme, sdkversion = ReExtData.sdkversion) {
    return `/ext-${sdkversion}/build/modern/theme-${theme}/resources/theme-${theme}-all.css`;
}

/**
 * Returns the path to the specified locale's JavaScript file for the given SDK version.
 *
 * @param {string} locale - The name of the locale.
 * @param {string} [sdkversion] - The version of the SDK.
 * @return {string} The path to the locale's JavaScript file.
 */
export function getLocalePath(locale, sdkversion = ReExtData.sdkversion) {
    debugger;
    return `/ext-${sdkversion}/build/modern/locale/locale-${locale}.js`;
}
