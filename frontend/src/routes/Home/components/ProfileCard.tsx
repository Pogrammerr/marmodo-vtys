import React from 'react'
import { Flex, Card, Text } from 'components'
import UserImg from 'assets/user.png'
import { FaGraduationCap } from 'react-icons/fa'

const ProfileCard = () => {
  return (
    <Card size='sm' flexDirection='row'>
      <img src={UserImg} alt="User Picture" width={64} />
      <Flex flexDirection='column'>
        <Text bold>Can Özfuttu <FaGraduationCap /> </Text>
        <Text>Bilgisayar Mühendisliği</Text>
      </Flex>
    </Card>
  )
}

export default ProfileCard