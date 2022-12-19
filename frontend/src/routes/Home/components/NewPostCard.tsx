import { Card, Flex, Input, Text, Dropdown, Button, Checkbox, Textarea } from 'components'
import UserImg from 'assets/user.png'
import React, { ChangeEvent, useState } from 'react'
import { FaUsers } from 'react-icons/fa'
import { Class } from 'state/types'
import axios from 'axios'

interface Props {
  classes: Class[];
  userId: string;
}

const initialInputState = {
  details: "",
  homeworkDetails: "",
  homeworkFile: "",
  homeworkDeadline: "",
  homeworkName: "",
}


const NewPostCard: React.FC<Props> = ({ classes, userId }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHomework, setIsHomework] = useState(false)
  const [inputState, setInputState] = useState(initialInputState)

  const classesArr = classes?.map((classData) => {
    return {
      label: classData.name,
      value: classData.id
    }
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value
    })
  }

  console.log(inputState)

  const handleDropdownChange = (e) => {
    const newValue = e.target.value;
    const chosenClassIndex = classesArr.findIndex((c) => c.value === newValue)
    setActiveIndex(chosenClassIndex)
  }

  const handlePost = async (e) => {
    const chosenClass = classesArr[activeIndex]
    const requestBody = { ...inputState, classId: chosenClass.value, userId }
    const result = await axios.post('/api/posts/addPost', requestBody)
    console.log(result)
  }

  return (
    <Card size='lg'>
      <Flex justifyContent='space-between'>
        <img src={UserImg} alt="User Picture" width={64} />
        <Input placeholder='Ne düşünüyorsun?' name="details" value={inputState.details} onChange={handleChange} />
      </Flex>
      <Flex justifyContent='space-between'>
        <Text> <FaUsers /> Şurada Paylaş: <Dropdown options={classesArr} value={classesArr?.[activeIndex]?.value} name="class" onChange={(e) => {
          handleDropdownChange(e)
          handleChange(e)
        }} /> </Text>
        <Button variant='primary' onClick={handlePost}>Paylaş</Button>
      </Flex>
      <Checkbox label="Ödev?" checked={isHomework} onChange={(e) => setIsHomework(e.target.checked)} />
      {
        isHomework &&
        <Flex flexDirection='column'>
          <Input label="Ödev Başlığı:" name="homeworkName" value={inputState.homeworkName} onChange={handleChange} />
          <Input type="file" label="Dosya:" name="homeworkFile" value={inputState.homeworkFile} onChange={handleChange} />
          <Input type="datetime-local" label="Teslim Tarihi" name="homeworkDeadline" value={inputState.homeworkDeadline} onChange={handleChange} />
          <Textarea label='Açıklama:' name="homeworkDetails" value={inputState.homeworkDetails} onChange={handleChange} />
        </Flex>
      }
    </Card>
  )
}

export default NewPostCard