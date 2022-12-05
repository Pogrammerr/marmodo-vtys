import { FlexboxProps, SpaceProps, MaxWidthProps } from "styled-system";
import { DefaultTheme } from "styled-components";

export interface FlexProps extends FlexboxProps, SpaceProps, MaxWidthProps {
  gap?: number;
}
