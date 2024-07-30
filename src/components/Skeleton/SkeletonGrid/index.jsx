import React from "react";

import { SkeletonGridWrapper, SkeletonList, SkeletonListItem } from "./styles";
import Skeleton from "react-loading-skeleton";

export function SkeletonGrid() {
    const listItems = Array.from({ length: 12 }, (_, index) => index + 1);

    return (
        <SkeletonGridWrapper>
            {listItems.map((index) => (
                <SkeletonList key={`skeleton-grid-item-${index}`}>
                    <Skeleton circle width={30} height={30} />
                    <SkeletonListItem />
                    <SkeletonListItem />
                    <SkeletonListItem />
                    <SkeletonListItem />
                </SkeletonList>
            ))}
        </SkeletonGridWrapper>
    );
}
