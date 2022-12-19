import React, { useEffect } from 'react'
import { Flex, Layout, Card, Text } from 'components'
import UserImg from 'assets/user.png'
import { FaGraduationCap, FaListUl } from 'react-icons/fa'
import ProfileCard from './components/ProfileCard'
import ClassCard from './components/ClassCard'
import NewPostCard from './components/NewPostCard'
import PostCard from './components/PostCard'
import HomeworkCard from './components/HomeworkCard'
import { useUser } from 'state/hooks'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const user = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.email) setTimeout(() => navigate('/'), 100)
  }, [user])

  console.log('userData: ', user)

  return (
    <Layout>
      <Flex flexDirection='column' flex={1} gap={3}>
        <ProfileCard />
        <ClassCard classes={user.classes} />
      </Flex>
      <Flex flexDirection='column' flex={2}>
        <NewPostCard classes={user.classes} userId={user.id} />
      </Flex>
      <Flex flexDirection='column' flex={1}>
        <HomeworkCard classes={user.classes} />
      </Flex>
    </Layout>
  )
}

export default Home