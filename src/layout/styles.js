import styled from "styled-components";

export const MainLayoutWrapper = styled.main`
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

export const SkeletonWrapper = styled.div`
    cursor: progress;
`;
