import { Button, Input, Modal, Text } from "components"
import { useState } from 'react'

interface InputModalProps {
  title: string;
  inputLabel: string;
  buttonLabel: string;
  resultLabel?: string;
  clickHandler: (...args: any[]) => any;
  onDismiss?: () => void;
}

const InputModal: React.FC<InputModalProps> = ({ title, inputLabel, buttonLabel, resultLabel, clickHandler, onDismiss }) => {
  const [inputString, setInputString] = useState('')
  const [result, setResult] = useState('')

  const handleClick = async () => {
    const result = await clickHandler(inputString)
    setResult(result)
  }

  return (
    <Modal title={title} onDismiss={onDismiss}>
      <Input label={inputLabel} onChange={(e) => setInputString(e.target.value)} />
      <Button onClick={handleClick}>{buttonLabel}</Button>
      {resultLabel && result && <Text>{resultLabel} {result}</Text>}
    </Modal>
  )
}

export default InputModal