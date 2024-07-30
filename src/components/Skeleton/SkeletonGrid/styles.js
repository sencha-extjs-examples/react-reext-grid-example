import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

export const SkeletonGridWrapper = styled.ul`
    margin: 0;
    padding: 0;
`;

export const SkeletonList = styled.li`
    padding: 8px;
    box-sizing: content-box;
    gap: 8px;
    display: grid;
    grid-template-columns: 32px 0 2fr 5fr 1fr;
    align-items: center;
    border-top: 1px solid rgba(0, 0, 0, 0.1);

    @media all and (min-width: 768px) {
        padding: 8px 16px;
        gap: 16px;
        grid-template-columns: 48px 1.4fr 2fr 5fr 1fr;
    }
`;

export const SkeletonListItem = styled(Skeleton)`
    width: 100%;
    height: 16px;
    border-radius: 8px;

    @media all and (min-width: 768px) {
        width: 60%;
    }
`;
