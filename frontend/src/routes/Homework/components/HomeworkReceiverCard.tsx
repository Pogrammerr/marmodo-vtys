import Tippy from '@tippyjs/react'
import axios from 'axios'
import { Button, Card, Flex, Input, Text } from 'components'
import jwtDecode from 'jwt-decode'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useUser } from 'state/hooks'
import { Homework, Post } from 'state/types'
import { fetchUserData } from 'state/user'

interface Props {
  isAuthor: boolean;
  post: Post
}

const HomeworkReceiverCard: React.FC<Props> = ({ isAuthor, post }) => {
  const [file, setFile] = useState<File | undefined>(undefined)
  const dispatch = useDispatch<any>()
  const [success, setSuccess] = useState('')
  const user = useUser()

  const isUploaded = post?.homework?.completedUsers?.find((u) => u.id === user.id)

  const handleUpload = async () => {
    const jwtToken = localStorage.getItem('token')
    const decodedToken = jwtDecode<{ email: string, id: string }>(jwtToken!)
    const result = await axios.post('/api/posts/uploadHomework', { homeworkFile: file, homeworkId: post.homework?.id }, { headers: { "Authorization": `Bearer ${jwtToken}`, "Content-Type": "multipart/form-data" } })
    dispatch(fetchUserData(decodedToken?.id, jwtToken!))
    setSuccess('Yükleme başarılı.')
  }

  console.log('selected homework: ', post)

  if (isAuthor) {
    const completedUserImages = post?.homework?.completedUsers.map((user) => {
      const userImage = `http://127.0.0.1:5000/${user?.profileImgPath || "images/unknownUser.png"}`
      return (<Tippy content={user.firstName + ' ' + user.lastName}><img src={userImage} alt="Completed User" width={64} height={64} style={{ borderRadius: '50%' }} /></Tippy>)
    })
    return (
      <Card size="sm" alignItems='center' justifyContent='space-around'>
        <Text fontSize='xl'>Gönderenler</Text>
        <Flex>{completedUserImages}</Flex>
      </Card>
    )
  }

  return (
    <Card size="sm" alignItems='center' justifyContent='space-around'>
      <Text fontSize='xl'>Teslim Et</Text>
      <Input type="file" label="Dosya:" name="homeworkFile" onChange={(e) => setFile(e.target.files?.[0])} />
      <Button disabled={!!isUploaded} onClick={handleUpload}>{!isUploaded ? 'Gönder' : 'Zaten Gönderildi.'}</Button>
      {success && <Text color='success'>{success}</Text>}
    </Card>
  )
}

export default HomeworkReceiverCard