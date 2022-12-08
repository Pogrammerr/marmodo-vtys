import { Button, Card, Flex, Link, Text } from 'components'
import React from 'react'
import TeacherImg from 'assets/teacher.png'
import { FaRegClock, FaRegCommentDots, FaRegHeart } from 'react-icons/fa'
import { HomeworkIcon } from 'components/Svg/icons'
import { Homework } from 'state/types'

interface Props {
  homework: Homework
}

const PostCard: React.FC<Props> = ({ homework }) => {
  return (
    <Card size='lg'>
      <Flex>
        <img src={TeacherImg} alt="Teacher Picture" width={64} />
        <Flex flexDirection='column'>
          <Text bold>Buket Doğan, Veri Tabanı Yönetim Sistemleri <span>sınfında bir gönderi paylaştı</span> </Text>
          <Text color="gray"><FaRegClock /> 55 dakika önce</Text>
        </Flex>
      </Flex>

      <Text>Bugünkü işlenen dersin ödevi aşağıda verilmiştir. Herkese kolay gelsin.</Text>

      {homework && <HomeworkCard {...homework} />}

      <Flex>
        <Flex flex={1} justifyContent='center' alignItems='center'>
          <Text><FaRegHeart />{' '}Beğen (2)</Text>
        </Flex>
        <Flex flex={1}>
          <Text><FaRegCommentDots />{' '}Yorum (0)</Text>
        </Flex>
      </Flex>
    </Card>
  )
}

const HomeworkCard = ({ label, deadline, url }) => {
  return (
    <Card flexDirection='row' style={{ backgroundColor: 'E2EEF1' }}>
      <HomeworkIcon />
      <Flex flexDirection='column'>
        <Text bold>{label}</Text>
        <Text><FaRegClock />{deadline} </Text>
      </Flex>
      <Link to={url}>
        <Button>İncele</Button>
      </Link>
    </Card>
  )
}

export default PostCard