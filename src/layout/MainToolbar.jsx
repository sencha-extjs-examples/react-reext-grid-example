import React from "react";

import { getAppMenu } from "./toolbar/appMenu";
import { SkeletonToolbar } from "../components/Skeleton/SkeletonToolbar";
import { NavigationBar } from "../components/NavigationBar";

export function MainToolbar({ isReady }) {
    if (isReady) {
        return <NavigationBar menus={getAppMenu()} />;
    }

    return <SkeletonToolbar />;
}
