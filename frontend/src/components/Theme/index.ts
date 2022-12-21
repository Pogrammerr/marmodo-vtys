import { createGlobalStyle } from "styled-components";
import globalTheme from "./config";
import darkTheme from "./dark";
import lightTheme from "./light";
import {
  Breakpoints,
  FontSizes,
  Gradients,
  MediaQueries,
  ThemedColors,
} from "./types";

export interface PisagorTheme {
  colors: ThemedColors;
  gradients: Gradients;
  breakpoints: Breakpoints;
  mediaQueries: MediaQueries;
  fontSizes: FontSizes;
}

export const darkThemeConfig: PisagorTheme = {
  colors: darkTheme,
  ...globalTheme,
};

export const lightThemeConfig: PisagorTheme = {
  colors: lightTheme,
  ...globalTheme,
};

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
  }
  html {
    scroll-behavior: smooth;
    font-size: 62.5%; // 1rem = 10px
    
    ${(p) => p.theme.mediaQueries.xl} {
      font-size: 50%; // 1rem = 8px
    }

    ${(p) => p.theme.mediaQueries.m} {
      font-size: 37.5%; // 1rem = 6px
    }
  }
  body {
    background: ${(p) => p.theme.colors.bodyBackgroundColor};
    margin: 0;
    padding: 0;
    min-height: 100vh;
    color: ${(p) => p.theme.colors.text};
    scroll-behavior: smooth;
  }

  body, div, textarea {
    &::-webkit-scrollbar {
      background-color: #fff0;
      border-radius: 16px;
      width: 20px;
      cursor: pointer;
    }

    &::-webkit-scrollbar-thumb {
      background: ${(p) => p.theme.gradients.primaryGradient};
      border-radius: 16px;
      background-clip: content-box;
      border: 6px solid transparent;
    }
  }

  input {
    &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type=number] {
      -moz-appearance: textfield;
    }
  }

  #root {
    min-height: 100vh;
  }

  h1,h2,h3,h4,h5,h6 {
    margin: 0;
    padding: 0;
    
    span {
      font-weight: 400;
    }
  }
`;

export { default as lightTheme } from "./light";
export { default as darkTheme } from "./dark";
export * from "./config";
export * from "./types";
