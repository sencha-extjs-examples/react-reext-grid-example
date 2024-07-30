import {
    createContext,
    useState,
    useContext,
    useEffect,
    useCallback,
} from "react";

import ReExtData from "../config/ReExtData.json";
import { getThemePath } from "../config/setupExtConfig";

const searchParams = new URLSearchParams(window.location.search);

const initialContext = {
    state: {
        theme: searchParams.get("theme") || ReExtData.theme,
        toolkit: searchParams.get("toolkit") || ReExtData.toolkit,
        locale: searchParams.get("locale") || "en",
        palette: null,
        darkMode: false,
        mainTabActive: null
    },

    /** Updates the theme used by the application.
     *
     * @param {string} theme - 'material', 'triton', 'neptune','ios'
     * @example
     * ```
     * const { setTheme } = useAppStore();
     * setTheme('material');
     * ```
     */
    setTheme(theme) {},
    setThemePalette(palette) {},
    setThemeDarkMode(darkMode) {},

    /** Updates the toolkit used by the application.
     *
     * @param {string} toolkit - 'classic', 'modern' ou 'both'
     * @example
     * ```
     * const { setToolkit } = useAppStore();
     * setToolkit('classic');
     * ```
     */
    setToolkit(toolkit) {},
    setLocale(locale) {},
    setMainTabChange(tabActive) {},
};

const AppStoreContext = createContext(initialContext);

export default function AppStoreProvider(props) {
    const [state, setState] = useState(initialContext.state);

    const updateState = (fielName, fieldValue) => {
        setState((prevState) => ({ ...prevState, [fielName]: fieldValue }));
    };

    const setMainTabChange = (tabActive) =>
        updateState("mainTabActive", tabActive);
    const setTheme = (theme) => updateState("theme", theme);
    const setThemePalette = useCallback(
        (palette) => updateState("palette", palette),
        []
    );

    const setThemeDarkMode = useCallback((darkMode) => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }

        updateState("darkMode", darkMode);
    }, []);

    const setLocale = (locale) => updateState("locale", locale);
    const setToolkit = (toolkit) => updateState("toolkit", toolkit);

    /**
     * TODO: when changing the theme, update the theme link. As updating the theme is reloading the application, we can remove the hook.
     * This treatment can be useful when changes are made without the need to reload the application.
     * When following this path, it will be necessary to pre-load the styling to avoid loading delays.
     */
    useEffect(() => {
        const extThemeId = document.getElementById("ext-theme-link");
        const resourcePath = getThemePath(state.theme, ReExtData.sdkversion);

        document.body.setAttribute?.("data-theme", state.theme);

        if (extThemeId && resourcePath) {
            extThemeId.setAttribute("href", resourcePath);
        }
    }, [state.theme]);

    const values = {
        state,
        setTheme,
        setThemePalette,
        setThemeDarkMode,
        setToolkit,
        setLocale,
        setMainTabChange,
    };

    return (
        <AppStoreContext.Provider value={values}>
            {props.children}
        </AppStoreContext.Provider>
    );
}

export const useAppStore = () => {
    const context = useContext(AppStoreContext);

    if (context === undefined) {
        throw new Error("useAppStore must be used within a AppStoreProvider");
    }

    return context;
};
