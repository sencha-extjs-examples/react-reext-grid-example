import styled from "styled-components";

export const MainToolbar = styled.div`
    box-sizing: border-box;
    background-color: var(--base-app-toolbar, #024059);
    min-height: 48px;
    display: grid;
    grid-template-columns: 32px 3fr 0.5fr;
    align-items: center;
    padding: 8px 16px;
`;
