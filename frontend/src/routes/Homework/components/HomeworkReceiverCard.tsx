import { Button, Card, Input, Text } from 'components'
import React, { useState } from 'react'

const HomeworkReceiverCard = () => {
  const [file, setFile] = useState<File | undefined>(undefined)

  const handleUpload = () => {

  }

  return (
    <Card size="sm">
      <Text>Teslim Et</Text>
      <Input type="file" label="Dosya:" name="homeworkFile" onChange={(e) => setFile(e.target.files?.[0])} />
      <Button onClick={handleUpload}>Gönder</Button>
    </Card>
  )
}

export default HomeworkReceiverCard