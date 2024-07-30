import React, { useEffect, useState, useCallback, useRef } from "react";
import i18next from "i18next";

// config
import localization from "../config/locale/localization.json";
import { useAppStore } from "../contexts/AppStore";
import { ExtArtifacts } from "../config/ExtArtifacts";

// components
import MainView from "../view/main/MainView";
import { MainLayoutSkeleton } from "./MainLayout-skeleton";
import { MainToolbar } from "./MainToolbar";
import { MainLayoutWrapper } from "./styles";

const isProduction = process.env.NODE_ENV === "production";

export default function MainLayout() {
    const timerRef = useRef(null);
    const { state } = useAppStore();
    const [isReady, setReady] = useState(false);
    const [showSkeleton, setSkeleton] = useState(false);
    const locale = state.locale;

    const setReadyApp = useCallback(async () => {
        // Setup i18next. Ref https://www.i18next.com/overview/getting-started#basic-sample
        await i18next.init({
            debug: !isProduction,
            lng: locale,
            resources: localization,
        });

        // setup custom ext artifacts
        await ExtArtifacts.setup({ locale });

        setReady(true);
    }, [locale]);

    useEffect(() => {
        setReadyApp();
    }, [setReadyApp]);

    useEffect(() => {
        setSkeleton(true);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setSkeleton(false), 2500);

        return () => {
            clearTimeout(timerRef.current);
        };
    }, [state.darkMode, state.palette]);

    return (
        <MainLayoutWrapper>
            <MainToolbar isReady={isReady} />

            <MainLayoutSkeleton showSkeleton={showSkeleton || !isReady}>
                <MainView />
            </MainLayoutSkeleton>
        </MainLayoutWrapper>
    );
}
