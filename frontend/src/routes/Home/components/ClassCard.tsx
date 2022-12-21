import React from 'react'
import { Flex, Card, Text, Tooltip } from 'components'
import { FaListUl, FaRegPlusSquare } from 'react-icons/fa'
import { Class } from 'state/types'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css';
import axios from 'axios'
import useModal from 'components/Modal/useModal'
import InputModal from './modals/InputModal'
import jwtDecode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { fetchUserData } from 'state/user'

interface Props {
  classes: Class[]
  classAmount: string;
}

const tooltipText = ['Sınıf Oluştur', 'Sınıfa Katıl']

const ClassCard: React.FC<Props> = ({ classes, classAmount }) => {
  const dispatch = useDispatch<any>()

  const classRows = classes?.map((classData) => {
    return (
      <Text key={classData.id} fontSize='s' style={{ padding: '1.6rem' }}>{classData.name}</Text>
    )
  })

  const handleCreateClass = async (className: string) => {
    const jwtToken = localStorage.getItem('token')
    const decodedToken = jwtDecode<{ email: string, id: string }>(jwtToken!)
    const result = await axios.post('/api/classes/createClass', { className }, { headers: { "Authorization": `Bearer ${jwtToken}` } })
    dispatch(fetchUserData(decodedToken?.id, jwtToken!))
    return result.data.code
  }

  const handleJoinClass = async (classCode: string) => {
    const jwtToken = localStorage.getItem('token')
    const decodedToken = jwtDecode<{ email: string, id: string }>(jwtToken!)
    const result = await axios.post('/api/classes/joinClass', { classCode }, { headers: { "Authorization": `Bearer ${jwtToken}` } })
    dispatch(fetchUserData(decodedToken?.id, jwtToken!))
    return result.data.status
  }

  const [showCreateClassModal] = useModal(<InputModal title="Sınıf Oluştur" inputLabel='Sınıf Adı: ' buttonLabel='Oluştur!' resultLabel='Sınıf Kodunuz:' clickHandler={handleCreateClass} />)
  const [showJoinClassModal] = useModal(<InputModal title="Sınıfa Katıl" inputLabel='Sınıf Kodu: ' buttonLabel='Katıl!' clickHandler={handleJoinClass} />)

  return (
    <Card size='sm' style={{ padding: '0', gap: '0' }} pinColor="rgba(5, 255, 0, 1)">
      <Flex justifyContent='space-between' width={1} style={{ borderBottom: '2px solid #0000005a', padding: '1.6rem' }}>
        <Text><FaListUl /> Sınıflarım ({classAmount}) </Text>
        <Text><Tippy content={<Tooltip texts={tooltipText} clickHandlers={[showCreateClassModal, showJoinClassModal]} />} interactive><span><FaRegPlusSquare /></span></Tippy></Text>
      </Flex>
      {classRows}
    </Card>
  )
}

export default ClassCard