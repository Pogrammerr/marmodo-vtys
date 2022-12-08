import React from 'react'
import { Flex, Layout, Card, Text } from 'components'
import UserImg from 'assets/user.png'
import { FaGraduationCap, FaListUl } from 'react-icons/fa'
import ProfileCard from './components/ProfileCard'
import ClassCard from './components/ClassCard'
import NewPostCard from './components/NewPostCard'
import PostCard from './components/PostCard'
import HomeworkCard from './components/HomeworkCard'

const Home = () => {

  return (
    <Layout>
      <Flex flexDirection='column' flex={1}>
        <ProfileCard />
        <ClassCard />
      </Flex>
      <Flex flexDirection='column' flex={2}>
        <NewPostCard />
        <PostCard />
        <PostCard />
      </Flex>
      <Flex flexDirection='column' flex={1}>
        <HomeworkCard />
      </Flex>
    </Layout>
  )
}

export default Home