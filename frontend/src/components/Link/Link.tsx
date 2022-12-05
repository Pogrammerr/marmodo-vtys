import { ReactNode } from "react";
import { Link as ReactLink, LinkProps as ReactLinkProps } from "react-router-dom";
import styled from "styled-components";

interface LinkProps extends ReactLinkProps {
  external?: boolean;
  isActive?: boolean;
  children: ReactNode;
}

const Link: React.FC<LinkProps> = ({ isActive, external, children, ...props }) => {
  const externalProps = external ? { target: '_blank', rel: 'noreferrer noopener' } : {}
  return (
    <ReactLink {...props} {...externalProps}>
      {children}
    </ReactLink>
  )
}

const StyledLink = styled(Link) <LinkProps>`
  font-weight: ${p => p.isActive ? 'bold' : 'normal'};
  font-family: inherit;
  color: ${p => p.isActive ? p.theme.colors.white : p.theme.colors.black};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1rem;
`

export default StyledLink