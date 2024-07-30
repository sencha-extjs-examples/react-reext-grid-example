import { useLayoutEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import colors from "../config/theme/material-colors.json";
import { GlobalStyles } from "../styles/global-styles";
import { useAppStore } from "./AppStore";

export default function ThemeProvider(props) {
    const { state, setThemeDarkMode } = useAppStore();

    useLayoutEffect(() => {
        if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            setThemeDarkMode(true);
        }
    }, [setThemeDarkMode]);

    const theme = {
        palette: colors[state.palette] || colors.deepPurple,
        darkMode: state.darkMode,
    };

    return (
        <StyledThemeProvider theme={theme}>
            <GlobalStyles />

            {props.children}
        </StyledThemeProvider>
    );
}
