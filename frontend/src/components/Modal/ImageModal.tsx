import { Button, Input, Modal, Text } from "components"
import { useState } from 'react'
import Cropper from 'react-easy-crop'

interface InputModalProps {
  title?: string;
  inputLabel?: string;
  buttonLabel?: string;
  resultLabel?: string;
  clickHandler: (...args: any[]) => any;
  onDismiss?: () => void;
}

const ImageModal: React.FC<InputModalProps> = ({ title, inputLabel, buttonLabel, resultLabel, clickHandler, onDismiss }) => {
  const [result, setResult] = useState('')
  const [file, setFile] = useState<File | undefined>(undefined)

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const handleClick = async () => {
    const result = await clickHandler(file)
    setResult(result)
  }

  return (
    <Modal title={title || "Choose an Image"} onDismiss={onDismiss}>
      {
        file ? <Cropper image="" crop={crop} onCropChange={setCrop} zoom={zoom} onZoomChange={setZoom} /> : <Input type='file' label={inputLabel || "Dosya:"} onChange={(e) => { console.log(e.target.files?.[0]) }} />
      }
      {file && <Button onClick={handleClick}>{buttonLabel || "Gönder!"}</Button>}
      {resultLabel && result && <Text>{resultLabel} {result}</Text>}
    </Modal>
  )
}

export default ImageModal