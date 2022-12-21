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
  const [postData, setPostData] = useState<Post | null>(null)

  useEffect(() => {
    user.classes.forEach((c) => c.posts.find((p) => {
      if (p.homework?.id === homeworkId) {
        setPostData(p)
      }
    }))
  }, [user.classes, homeworkId, setPostData])

  const isAuthor = user.id === postData?.author.id
  console.log(postData)

  return (
    <Layout>
      <Flex flex={2}>
        <HomeworkGiverCard {...postData} />
      </Flex>
      <Flex flex={1}>
        <HomeworkReceiverCard post={postData!} isAuthor={isAuthor} />
      </Flex>
    </Layout>
  )
}

export default Homework