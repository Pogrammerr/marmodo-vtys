import { Button, Card, Flex, Link, Text } from 'components'
import React from 'react'
import { FaPencilRuler, FaRegClock } from 'react-icons/fa'
import { DateTime } from 'luxon'
import { Class, Homework, Post } from 'state/types'
import styled, { keyframes } from 'styled-components'

interface Props {
  post: Post
  className: string
  index: number
}

const PostCard: React.FC<Props> = ({ post, className, index }) => {
  const createdAt = DateTime.fromISO(post.createdAt)
  const { years, months, days, hours, minutes, seconds } = DateTime.now().diff(createdAt, ["years", "months", "days", "hours", "minutes", "seconds"])
  const publishTimeFormatted = years ? `${years} yıl` : months ? `${months} ay` : days ? `${days} gün` : hours ? `${hours} saat` : minutes ? `${minutes} dakika` : seconds < 10 ? `Yeni!` : seconds ? `${Math.floor(seconds)} saniye` : '???'
  const isNew = !years && !months && !days && !hours && !minutes && seconds < 10
  const isHomework = !!post.homework
  const userImage = `http://127.0.0.1:5000/${post.author.profileImgPath || "images/unknownUser.png"}`

  return (
    <StyledPostCard size='lg' index={index} pinColor={isHomework ? "rgba(255, 0, 0, 1)" : "rgba(0, 255, 224, 1)"}>
      <Flex gap={2}>
        <img src={userImage} alt="Teacher Picture" width={64} height={64} style={{ borderRadius: '50%' }} />
        <Flex flexDirection='column' gap={0.5}>
          <h1>{post.author.firstName} {post.author.lastName}, {className} <span>sınfında bir gönderi paylaştı</span> </h1>
          <Text color={isNew ? "success" : "gray"}><FaRegClock /> {publishTimeFormatted} {!isNew && 'önce'} </Text>
        </Flex>
      </Flex>

      <Text>{post.details}</Text>

      {post.homework && <HomeworkCard homework={post.homework} />}

      {/*       <Flex>
        <Flex flex={1} justifyContent='center' alignItems='center'>
          <Text><FaRegHeart />{' '}Beğen (2)</Text>
        </Flex>
        <Flex flex={1}>
          <Text><FaRegCommentDots />{' '}Yorum (0)</Text>
        </Flex>
      </Flex> */}
    </StyledPostCard>
  )
}

interface PropsHwCard {
  homework: Homework
}

const HomeworkCard: React.FC<PropsHwCard> = ({ homework }) => {
  const deadlineFormatted = new Date(homework.deadline).toLocaleDateString('tr-TR', { day: '2-digit', weekday: 'short', month: 'short', hour: '2-digit', minute: '2-digit' })

  return (
    <Card size='sm' flexDirection='row' alignSelf='center' style={{ backgroundColor: '#E2EEF1' }}>
      <Flex flexDirection='column'>
        <Text bold><FaPencilRuler /> {homework.name}</Text>
        <Text><FaRegClock /> {deadlineFormatted} </Text>
      </Flex>
      <Link to={`/homework/${homework.id}`}>
        <Button>İncele</Button>
      </Link>
    </Card>
  )
}

const fadeInFromLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
`

const StyledPostCard = styled(Card) <{ index: number }>`
  opacity: 0;
  animation: ${fadeInFromLeft} .5s linear ${p => p.index / 4}s forwards;
`

export default PostCard