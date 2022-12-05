import { ReactNode, CSSProperties } from "react";
import styled from "styled-components";
import { Navbar } from "../Navbar";

const StyledLayout = styled.main`
  width: 162rem;
  max-width: 86%;
  margin: 6.4rem auto;
  padding: 0 1.6rem;
  display: flex;
  justify-content: space-between;
  gap: 48px;
  margin-bottom: 64px;

  ${p => p.theme.mediaQueries.m} {
    flex-direction: column;
  }
`;

const Layout: React.FC<{ children: ReactNode, style?: CSSProperties }> = ({ children, ...props }) => {
  return (
    <StyledLayout {...props}>
      {children}
    </StyledLayout>
  )
}

export default Layout