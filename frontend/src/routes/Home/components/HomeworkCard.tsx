import { Card, Flex, Link, Text } from 'components'
import React from 'react'
import { FaPencilRuler, FaRegClock, FaRegPlusSquare } from 'react-icons/fa'
import { Class } from 'state/types'
import styled from 'styled-components'

interface Props {
  classes: Class[]
}

const HomeworkCard: React.FC<Props> = ({ classes }) => {

  const homeworkCards = classes.map((classData) => {
    const cards = classData.posts.map((postData) => {
      const homework = postData.homework
      if (!homework) return

      const deadlineEpochMs = new Date(homework.deadline).getTime()
      const timeLeft = deadlineEpochMs - Date.now()
      const deadlineFormatted = new Date(homework.deadline).toLocaleDateString('tr-TR', { day: '2-digit', weekday: 'short', month: 'short', hour: '2-digit', minute: '2-digit' })

      if (timeLeft > 0) {
        return (
          <Homework key={homework.id} className={classData.name} homeworkName={homework.name} id={homework.id} deadline={deadlineFormatted} />
        )
      }
    })
    return cards
  })

  return (
    <Card size='sm' style={{ padding: '0', gap: '0' }} pinColor="rgba(0, 194, 255, 1)">
      <Flex justifyContent='space-between' width={1} style={{ borderBottom: '2px solid #0000005a', padding: '1.6rem' }}>
        <Text><FaPencilRuler /> Ödevlerim </Text>
      </Flex>
      {homeworkCards}
    </Card>
  )
}

const ClassProfile = styled.div<{ index: number }>`
  background: ${p => p.theme.gradients.classGradients[p.index]};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: ${p => p.theme.fontSizes.l}rem;
  font-weight: bold;
  color: ${p => p.theme.colors.white};
  width: 48px;
  height: 48px;
  transition: all 300ms;
`

const StyledHomework = styled(Flex)`
  &:hover {
    & > a > div:nth-of-type(1) {
      transform: translateY(-8px);
    }
  }
`

const Homework = ({ className, homeworkName, id, deadline }) => {
  const classInitials = className.split(" ").map((str) => str.charAt(0)).slice(0, 2)
  const classNameShort = className.slice(0, 9)

  const random = Math.floor(Math.random() * 4)
  return (
    <StyledHomework width={1} style={{ padding: '1.6rem' }} alignItems='center' gap={1}>
      <Link to={`/homework/${id}`}>
        <ClassProfile index={random}>{classInitials}</ClassProfile>
        <Flex flexDirection="column" gap={0.5}>
          <Text bold>{homeworkName}</Text>
          <Text fontSize="s" ><FaRegClock /> {deadline}, {classNameShort}...</Text>
        </Flex>
      </Link>
    </StyledHomework>
  )
}

export default HomeworkCard