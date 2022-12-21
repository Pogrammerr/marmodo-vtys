import { InputHTMLAttributes, MutableRefObject, TextareaHTMLAttributes, useEffect, useState } from "react";
import styled from "styled-components";

// INPUT

const InputWrapper = styled.div<{ small?: boolean }>`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  max-width: 90%;
  min-width: ${p => p.small ? '75px' : '250px'};
  width: ${p => p.small ? "100px" : "464px"};
  height: 62px;
`

const StyledLabel = styled.label`
`

const StyledInput = styled.input<{ wrong?: boolean, right?: boolean }>`
  border: 4px solid ${p => p.wrong ? p.theme.colors.fail : p.right ? p.theme.colors.success : p.theme.colors.secondary};
  border-radius: 4px;
  background: ${p => p.wrong ? `${p.theme.colors.fail}33` : p.right ? `${p.theme.colors.success}33` : '#0000'};
  color: ${p => p.theme.colors.text};
  width: 100%;
  height: 100%;

  &[type=file] {
    border: none;
    width: auto;
    height: auto;
  }
`

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  small?: boolean
  ref?: MutableRefObject<HTMLInputElement | null>
  wrong?: boolean
  right?: boolean
}

export const Input: React.FC<InputProps> = ({ label, ref, small, wrong, right, ...props }) => {
  return (
    <InputWrapper small={small}>
      {label && <StyledLabel htmlFor={props.id}>{label}</StyledLabel>}
      <StyledInput {...props} ref={ref} wrong={wrong} right={right} />
    </InputWrapper>
  )
}

// CHECKBOX

const CheckboxWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 16px;
`

const StyledCheckbox = styled.input`
  width: 2.4rem;
  height: 2.4rem;
`

export const Checkbox: React.FC<InputProps> = ({ label, ref, ...props }) => {
  return (
    <CheckboxWrapper>
      <StyledCheckbox type="checkbox" {...props} ref={ref} />
      <StyledLabel htmlFor={props.id}>{label}</StyledLabel>
    </CheckboxWrapper>
  )
}

// TEXTAREA

const TextareaWrapper = styled(InputWrapper)`
  height: auto;
`

const StyledTextarea = styled.textarea`
  border: 4px solid ${p => p.theme.colors.secondary};
  border-radius: 4px;
  background: #0000;
  color: ${p => p.theme.colors.text};
`

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  small?: boolean
  ref?: MutableRefObject<HTMLTextAreaElement | null>
  wrong?: boolean
}

export const Textarea: React.FC<TextareaProps> = ({ label, ref, small, wrong, ...props }) => {
  return (
    <TextareaWrapper>
      <StyledLabel>{label}</StyledLabel>
      <StyledTextarea {...props} rows={6} />
    </TextareaWrapper>
  )
}

// COUNTER

const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  max-width: 100px;
  height: 36px;

  & > input {
    background-color: #0000;
    text-align: center;
    color: white;
    width: 60%;
    height: 100%;
    border: none;
    border-top: 2px solid ${p => p.theme.colors.secondary};
    border-bottom: 2px solid ${p => p.theme.colors.secondary};
  }
`

const StyledCounterButton = styled.button<{ position: string, disabled?: boolean }>`
  background-color: ${p => p.theme.colors[p.disabled ? 'fail' : 'secondary']};
  width: 20%;
  height: 100%;
  border: none;
  border-bottom-left-radius: ${p => p.position === "left" ? "8px" : "0"};
  border-top-left-radius: ${p => p.position === "left" ? "8px" : "0"};
  border-top-right-radius: ${p => p.position === "right" ? "8px" : "0"};
  border-bottom-right-radius: ${p => p.position === "right" ? "8px" : "0"};
  color: #CECECE;
  cursor: ${p => p.disabled ? 'initial' : 'pointer'};
  transition: background-color 200ms linear;
`

interface CounterProps extends InputProps {
  value: number
  setValue: any;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
  maxValue?: number;
  minValue?: number;
  incrementAmount?: number;
  decrementAmount?: number;
  small: boolean;
}

export const Counter: React.FC<CounterProps> = ({ label, value, setValue, leftDisabled, rightDisabled, ref, small, maxValue = 100, minValue = 0, incrementAmount = 1, decrementAmount = 1, ...props }) => {
  const [leftDisabledState, setLeftDisabledState] = useState(false)
  const [rightDisabledState, setRightDisabledState] = useState(false)

  const handleDecrement = () => {
    try {
      setValue(prevState => {
        const newNumber = (parseInt(prevState[props.name!]) - 1).toFixed(0)
        return ({
          ...prevState,
          [props.name!]: newNumber
        })
      })
    } catch (e) {
      return;
    }
  }

  const handleIncrement = () => {
    try {
      setValue(prevState => {
        const newNumber = (parseInt(prevState[props.name!]) + 1).toFixed(0)
        return ({
          ...prevState,
          [props.name!]: newNumber
        })
      })
    } catch (e) {
      return;
    }
  }

  useEffect(() => {
    if (value >= maxValue) {
      setRightDisabledState(true)
    } else {
      setRightDisabledState(false)
    }
    if (value <= minValue) {
      setLeftDisabledState(true)
    } else {
      setLeftDisabledState(false)
    }
  }, [value, maxValue, minValue])

  return (
    <InputWrapper style={{ width: 'auto', minWidth: 'auto' }}>
      <StyledLabel htmlFor={props.id}>{label}</StyledLabel>
      <CounterWrapper>
        <StyledCounterButton type="button" position="left" disabled={leftDisabled || leftDisabledState} onClick={handleDecrement}>-</StyledCounterButton>
        <input type="number" value={value.toString()} {...props} min={minValue} />
        <StyledCounterButton type="button" position="right" disabled={rightDisabled || rightDisabledState} onClick={handleIncrement}>+</StyledCounterButton>
      </CounterWrapper>
    </InputWrapper>
  )
}