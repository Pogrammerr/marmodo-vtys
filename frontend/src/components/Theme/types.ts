export type LightOrDark = "light" | "dark";

export interface GlobalColors {
  primary: string;
  primaryDark: string;
  secondary: string;
  fail: string;
  success: string;
  white: string;
  lightGray: string;
  gray: string;
  black: string;
  orange: string;
  purple: string;
  darkBlue: string;
  lightPink: string;
  darkPink: string;
  lightBlue: string;
  cyan: string;
  yellow: string;
  darkGreen: string;
}

export interface Gradients {
  primaryGradient: string;
  primaryGradientHorizontal: string;
  classGradients: string[];
}

export interface ThemedColors extends GlobalColors {
  id: LightOrDark;
  text: string;
  secondaryText: string;
  secondaryButton: string;
  bodyBackgroundColor: string;
  cardBackgroundColor: string;
  modalBackgroundColor: string;
}

export interface Breakpoints {
  s: number;
  m: number;
  l: number;
  xl: number;
}

export interface MediaQueries {
  s: string;
  m: string;
  l: string;
  xl: string;
}

export interface FontSizes {
  s: 1.6;
  m: 2;
  l: 2.4;
  xl: 3.2;
  xxl: 4.8;
}
