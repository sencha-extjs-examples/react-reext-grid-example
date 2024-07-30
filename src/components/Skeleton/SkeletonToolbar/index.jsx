import React from "react";
import { MainToolbar } from "./styles";
import Skeleton from "react-loading-skeleton";

export function SkeletonToolbar() {
    return (
        <MainToolbar>
            <Skeleton circle width={24} height={24} />
            <div>
                <Skeleton width={200} height={16} />
            </div>
            <Skeleton height={24} />
        </MainToolbar>
    );
}
