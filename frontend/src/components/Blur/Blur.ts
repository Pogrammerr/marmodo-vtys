import styled from "styled-components";

const Blur = styled.div`
  position: absolute;
  width: 22rem;
  height: 14rem;
  border-radius: 50%;
  background: #edd0ff;
  z-index: -9;
  top: -18%;
  left: 56%;
  filter: blur(72px);
`;

export default Blur;
