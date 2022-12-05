import { GlobalColors } from "components/Theme/types";
import { SpaceProps } from "styled-system";

export type TextSizes = "s" | "m" | "l" | "xl" | "xxl";

export interface TextProps extends SpaceProps {
  color?: keyof GlobalColors;
  fontSize?: TextSizes | number;
  bold?: boolean;
}
