import styled from "styled-components";
import { space } from "styled-system";
import { SvgProps } from "./types";

const StyledSvg = styled.svg<SvgProps>`
  fill: ${p => p.theme.colors.primary};
  width: ${p => p.width || "32px"};
  rotate: ${p => p.rotate || '0'};
  
  ${space}
`

export default StyledSvg