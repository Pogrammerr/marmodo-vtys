import { Button, Card, Flex, Text } from 'components'
import React from 'react'
import { Homework, User } from 'state/types'

interface Props {
  author?: User
  homework?: Homework
}

const HomeworkGiverCard: React.FC<Props> = ({ author, homework }) => {

  const deadlineFormatted = new Date(homework?.deadline || 0).toLocaleDateString('tr-TR', { day: '2-digit', weekday: 'short', month: 'short', hour: '2-digit', minute: '2-digit' })

  return (
    <Card size='lg' gap={2}>
      <Flex alignItems='center' gap={1}>
        <img src={'http://127.0.0.1:5000/' + author?.profileImgPath} alt="User Profile" />
        <Text fontSize='xl'>{author?.firstName} {author?.lastName}</Text>
      </Flex>
      <Flex justifyContent='space-between'>
        <Text bold fontSize='l'>{homework?.name}</Text>
        <Text bold fontSize='m'>Teslim Tarihi: {deadlineFormatted}</Text>
      </Flex>
      <Text>{homework?.details}</Text>
      <Button style={{ alignSelf: 'center' }} onClick={() => window.open('http://127.0.0.1:5000/' + homework?.filePath)}>Eki indir</Button>
    </Card>
  )
}

export default HomeworkGiverCard