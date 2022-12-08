import { Card, Flex, Input, Text, Dropdown, Button } from 'components'
import UserImg from 'assets/user.png'
import React from 'react'
import { FaUsers } from 'react-icons/fa'

const classes = [
  {
    label: 'Veri Tabanı Yönetim Sistemleri',
    value: '1', // Class ID
  },
  {
    label: 'Algoritma Analizi',
    value: '2', // Class ID
  },
]

const NewPostCard = () => {

  return (
    <Card size='lg'>
      <Flex>
        <img src={UserImg} alt="User Picture" width={64} />
        <Input />
      </Flex>
      <Flex justifyContent='space-between'>
        <Text> <FaUsers /> Şurada Paylaş: <Dropdown options={classes} value={classes[0].value} /> </Text>
        <Button variant='primary'>Paylaş</Button>
      </Flex>
    </Card>
  )
}

export default NewPostCard