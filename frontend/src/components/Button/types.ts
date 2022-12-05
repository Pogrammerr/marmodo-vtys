import { ReactNode } from "react";
import { DefaultTheme } from "styled-components";
import { SpaceProps } from "styled-system";

export type ButtonVariants = "primary" | "secondary" | "smooth" | "circle" | "success" | "fail";

export interface ButtonProps extends SpaceProps {
  variant?: ButtonVariants;
  small?: boolean;
  children: ReactNode;
}

export interface ThemedButtonProps extends ButtonProps {
  theme: DefaultTheme;
}
