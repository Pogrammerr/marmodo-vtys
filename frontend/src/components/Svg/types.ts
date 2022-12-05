import { SVGAttributes } from "react";
import { SpaceProps } from "styled-system";

export interface SvgProps extends SVGAttributes<SVGElement>, SpaceProps {
  spin?: boolean;
  color?: string;
}
