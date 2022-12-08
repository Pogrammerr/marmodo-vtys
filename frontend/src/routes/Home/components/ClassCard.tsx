import React from 'react'
import { Flex, Card, Text } from 'components'
import { FaListUl } from 'react-icons/fa'

const ClassCard = () => {
  return (
    <Card size='sm'>
      <Flex justifyContent='space-between' width={1}>
        <Text>Sınıflarım <FaListUl /> </Text>
        <Text>+</Text>
      </Flex>
    </Card>
  )
}

export default ClassCard