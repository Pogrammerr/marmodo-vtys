import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  max-width: 35%;

  & > button {
    align-self: flex-start;
  }
`;

export default StyledForm;
