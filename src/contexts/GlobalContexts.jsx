import React from "react";

import AppStoreProvider from "./AppStore";
import ExtProvider from "./ExtProvider";
import ThemeProvider from "./ThemeProvider";

export default function GlobalContexts(props) {
    return (
        <AppStoreProvider>
            <ThemeProvider>
                <ExtProvider>{props.children}</ExtProvider>
            </ThemeProvider>
        </AppStoreProvider>
    );
}
