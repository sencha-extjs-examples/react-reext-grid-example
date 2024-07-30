import React, { lazy, Suspense } from "react";

import GlobalContexts from "./contexts/GlobalContexts";
import "react-loading-skeleton/dist/skeleton.css";

const MainLayout = lazy(() => import("./layout/MainLayout"));

export default function App() {
    return (
        <GlobalContexts>
            <Suspense fallback={null}>
                <MainLayout />
            </Suspense>
        </GlobalContexts>
    );
}
