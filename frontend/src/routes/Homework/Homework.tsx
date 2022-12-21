import { Card, Flex, Layout } from 'components'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from 'state/hooks'
import { Post } from 'state/types'
import HomeworkGiverCard from './components/HomeworkGiverCard'
import HomeworkReceiverCard from './components/HomeworkReceiverCard'

const Homework = () => {
  const { homeworkId } = useParams()
  const user = useUser()
  const [homeworkData, setHomeworkData] = useState<Post | null>(null)

  useEffect(() => {
    user.classes.forEach((c) => c.posts.find((p) => {
      if (p.homework?.id === homeworkId) {
        setHomeworkData(p)
      }
    }))
  }, [user.classes, homeworkId, setHomeworkData])

  console.log(homeworkData)
  return (
    <Layout>
      <Flex flex={2}>
        <HomeworkGiverCard {...homeworkData} />
      </Flex>
      <Flex flex={1}>
        <HomeworkReceiverCard />
      </Flex>
    </Layout>
  )
}

export default Homework