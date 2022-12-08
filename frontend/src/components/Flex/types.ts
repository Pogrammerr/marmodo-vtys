import { FlexboxProps, SpaceProps, MaxWidthProps, WidthProps } from "styled-system";
import { DefaultTheme } from "styled-components";

export interface FlexProps extends FlexboxProps, SpaceProps, MaxWidthProps, WidthProps {
  gap?: number;
}
