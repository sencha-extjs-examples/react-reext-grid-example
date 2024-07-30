import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

export const SkeletonTabsWrapper = styled.div`
    background-color: var(--base-color, #f4f4f4);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    min-height: 48px;
`;

export const SkeletonTab = styled(Skeleton)`
    width: 80px;
    height: 20px;
    border-radius: 16px;

    @media all and (min-width: 480px) {
        width: 120px;
    }
`;
