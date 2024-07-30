import { createGlobalStyle, css } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body[data-theme="material"] {
    ${({ theme }) =>
        css`
            --dark-mode: ${theme.darkMode};
            --base-color: ${theme.palette[500]};
            --base-highlight-color: ${theme.palette[300]};
            --base-light-color: ${theme.palette[100]};
            --base-dark-color: ${theme.palette[700]};
            --base-pressed-color: ${theme.palette[600]};
            --base-focused-color: ${theme.palette[400]};
            --base-app-toolbar: ${theme.palette[900]};
            --selected-background-color: ${theme.palette[700]};
            --listitem-selected-background-color: ${theme.palette[700]};
            --dataview_item_selected_background_color: ${theme.palette[700]};
            --dataitem_selected_background_color: ${theme.palette[700]};

            &.dark-mode {
                --base-invisible-color: rgba(3, 169, 244, 0);
                --base-foreground-color: #fff;
                --accent-color: #ff9800;
                --accent-light-color: #ffe0b2;
                --accent-dark-color: #f57c00;
                --accent-pressed-color: #b36a00;
                --accent-invisible-color: rgba(255, 152, 0, 0);
                --accent-foreground-color: #222;
                --confirm-color: #7cb342;
                --confirm-pressed-color: #557b2d;
                --alert-color: #c62828;
                --alert-pressed-color: #861b1b;
                --color: #fff;
                --reverse-color: #222;
                --highlight-color: rgba(255, 255, 255, 0.54);
                --disabled-color: rgba(255, 255, 255, 0.38);
                --reverse-disabled-color: rgba(34, 34, 34, 0.38);
                --divider-color: #3d3d3d;
                --hovered-background-color: #4d4d4d;
                --header-background-color: #424242;
                --faded-color: #4d4d4d;
                --background-color: #303030;
                --alt-background-color: #3a3a3a;
                --reverse-background-color: #fafafa;
                --reverse-alt-background-color: #f5f5f5;
                --overlay-color: rgba(255, 255, 255, 0.03);
                --reverse-border-color: #212121;
                --reverse-alt-border-color: #3a3a3a;
                --base_color_name: light-blue;
                --accent_color_name: orange;

                /* ext table overrides */
                .x-listitem.x-odd {
                    background-color: var(--background-color);
                }
                .x-button-primary {
                    color: var(--base-highlight-color);
                }
            }
        `}
  }
`;
