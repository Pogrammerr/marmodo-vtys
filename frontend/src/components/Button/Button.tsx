import styled from "styled-components";
import { space } from 'styled-system'
import { ThemedButtonProps, ButtonProps } from "./types";

const getBackground = ({ theme, variant = "primary" }: ThemedButtonProps) => {
  return variant === 'secondary' ? theme.colors.secondaryButton : theme.colors[variant]
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${getBackground};
  border: ${p => p.variant === "secondary" ? `2px solid ${p.theme.colors.primary}` : 'none'};
  border-radius: ${p => p.variant === "smooth" ? "24px" : p.variant === "circle" ? "50%" : "6px"};
  padding: ${p => p.small ? '0.6rem 1.5rem' : '1.2rem 3rem'};
  font-weight: bold;
  font-size: ${p => p.theme.fontSizes.s}rem;
  color: ${p => p.variant === "secondary" ? p.theme.colors.primary : "#fff"};
  cursor: pointer;
  transition: all 100ms linear;
  width: fit-content;

  &:disabled {
    background: #eee;
    color: #666;
  }

  &:hover {
    background: ${p => p.theme.colors.primaryDark};
  }

  &:active {
    box-shadow: 0px 2px 4px 8px rgba(70, 148, 60, 0.5);
  }

  ${space}
`;


export default StyledButton;
