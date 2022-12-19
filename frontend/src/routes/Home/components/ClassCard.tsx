import React from 'react'
import { Flex, Card, Text } from 'components'
import { FaListUl, FaRegPlusSquare } from 'react-icons/fa'
import { Class } from 'state/types'

interface Props {
  classes: Class[]
}

const ClassCard: React.FC<Props> = ({ classes }) => {

  const classRows = classes?.map((classData) => {
    return (
      <Text key={classData.id} fontSize='s' style={{ padding: '1.6rem' }}>{classData.name}</Text>
    )
  })

  console.log('classrows', classRows)

  return (
    <Card size='sm' style={{ padding: '0', gap: '0' }}>
      <Flex justifyContent='space-between' width={1} style={{ borderBottom: '2px solid #0000005a', padding: '1.6rem' }}>
        <Text><FaListUl /> Sınıflarım </Text>
        <Text><FaRegPlusSquare cursor="pointer" /></Text>
      </Flex>
      {classRows}
    </Card>
  )
}

export default ClassCard