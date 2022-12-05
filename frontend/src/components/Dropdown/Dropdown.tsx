import React, { SelectHTMLAttributes } from 'react'
import styled from 'styled-components';

const Wrapper = styled.div<{ small?: boolean }>`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  max-width: 90%;
  min-width: ${p => p.small ? '45px' : '150px'};
  width: ${p => p.small ? "80px" : "350px"};
  height: 62px;
`

const StyledDropdown = styled.select<{ wrong?: boolean }>`
  border: 4px solid ${p => p.wrong ? p.theme.colors.fail : p.theme.colors.secondary};
  border-radius: 4px;
  background: ${p => p.wrong ? `${p.theme.colors.fail}33` : '#0000'};
  color: ${p => p.theme.colors.text};
  width: 100%;
  height: 100%;

  & > option {
    background: ${p => p.theme.colors.bodyBackgroundColor};
  }
`

interface Option {
  label: string;
  value: string
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[]
  label: string
  small?: boolean
}

const Dropdown: React.FC<Props> = ({ options, label, value, small, ...props }) => {
  return (
    <Wrapper small={small}>
      <label htmlFor={props.id}>{label}</label>
      <StyledDropdown value={value} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </StyledDropdown>
    </Wrapper>
  )
}

export default Dropdown