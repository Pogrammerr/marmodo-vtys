import { Card, Flex, Input, Text, Dropdown, Button, Checkbox, Textarea } from 'components'
import UserImg from 'assets/user.png'
import React, { ChangeEvent, useState } from 'react'
import { FaUsers } from 'react-icons/fa'
import { Class } from 'state/types'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { fetchUserData } from 'state/user'
import jwtDecode from 'jwt-decode'
import toISOLocal from 'utils/toLocalIso'

interface Props {
  classes: Class[];
  userId: string;
  profileImgPath: string;
}

const initialInputState = {
  details: "",
  homeworkDetails: "",
  homeworkFile: [],
  homeworkDeadline: "",
  homeworkName: "",
}


const NewPostCard: React.FC<Props> = ({ classes, userId, profileImgPath }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHomework, setIsHomework] = useState(false)
  const [inputState, setInputState] = useState(initialInputState)
  const dispatch = useDispatch<any>()

  const classesArr = classes?.map((classData) => {
    return {
      label: classData.name,
      value: classData.id
    }
  })

  const userImage = `http://127.0.0.1:5000/${profileImgPath || "images/unknownUser.png"}`

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setInputState({
      ...inputState,
      //@ts-ignore
      [e.target.name]: e.target.name === "homeworkFile" ? e.target.files[0] : e.target.value
    })
  }

  const handleDropdownChange = (e) => {
    const newValue = e.target.value;
    const chosenClassIndex = classesArr.findIndex((c) => c.value === newValue)
    setActiveIndex(chosenClassIndex)
  }

  const handlePost = async (e) => {
    const chosenClass = classesArr[activeIndex]
    const requestBody = { ...inputState, time: toISOLocal(new Date()), classId: chosenClass.value, userId }
    const jwtToken = localStorage.getItem('token')
    const decodedToken = jwtDecode<{ email: string, id: string }>(jwtToken!)
    const result = await axios.post('/api/posts/addPost', requestBody, { headers: { "Authorization": `Bearer ${jwtToken}`, "Content-Type": "multipart/form-data" } })
    console.log(result)
    dispatch(fetchUserData(decodedToken?.id, jwtToken!))
  }

  return (
    <Card size='lg' pinColor='rgba(250, 0, 255, 1)'>
      <Flex justifyContent='space-between'>
        <img src={userImage} alt="User Picture" width={64} style={{ borderRadius: '50%' }} />
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
        <Flex flexDirection='column' gap={1}>
          <Input label="Ödev Başlığı:" name="homeworkName" value={inputState.homeworkName} onChange={handleChange} />
          <Input type="file" label="Dosya:" name="homeworkFile" onChange={handleChange} />
          <Input type="datetime-local" label="Teslim Tarihi" name="homeworkDeadline" value={inputState.homeworkDeadline} onChange={handleChange} />
          <Textarea label='Açıklama:' name="homeworkDetails" value={inputState.homeworkDetails} onChange={handleChange} />
        </Flex>
      }
    </Card>
  )
}

export default NewPostCard