import React from "react";
import { SkeletonTabs } from "../components/Skeleton/SkeletonTabs";
import { SkeletonGrid } from "../components/Skeleton/SkeletonGrid";
import { SkeletonWrapper } from "./styles";

export function MainLayoutSkeleton({ children, showSkeleton }) {
    if (showSkeleton) {
        return (
            <SkeletonWrapper title="Loading ...">
                <SkeletonTabs />

                <SkeletonGrid />
            </SkeletonWrapper>
        );
    }

    return children;
}
