import React from "react";

import { SkeletonTab, SkeletonTabsWrapper } from "./styles";

export function SkeletonTabs() {
    return (
        <SkeletonTabsWrapper>
            <SkeletonTab />
            <SkeletonTab />
            <SkeletonTab />
        </SkeletonTabsWrapper>
    );
}
