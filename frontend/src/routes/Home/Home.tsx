import React, { useEffect } from 'react'
import { Flex, Layout, Card, Text } from 'components'
import UserImg from 'assets/user.png'
import ProfileCard from './components/ProfileCard'
import ClassCard from './components/ClassCard'
import NewPostCard from './components/NewPostCard'
import PostCard from './components/PostCard'
import HomeworkCard from './components/HomeworkCard'
import { useUser } from 'state/hooks'
import { useNavigate } from 'react-router-dom'
import toISOLocal from 'utils/toLocalIso'

const Home = () => {
  const user = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      if (!user.email) {
        navigate('/')
      }
    }, 1000)
  }, [user.email])

  console.log('userData: ', user)

  const allUserPosts = [...user.classes.map((c) => c.posts)].flat(1).sort()
  allUserPosts.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const postCards = allUserPosts.map((postData, index) => {
    const className = user.classes.find((c) => c.posts.find((p) => p.id === postData.id))!.name
    return (
      <PostCard key={postData.id} post={postData} className={className} index={index} />
    )
  })

  return (
    <Layout>
      <Flex flexDirection='column' flex={1} gap={3}>
        <ProfileCard />
        <ClassCard classes={user.classes} classAmount={user.classAmount} />
      </Flex>
      <Flex flexDirection='column' flex={2} gap={3}>
        <NewPostCard classes={user.classes} userId={user.id} />
        {postCards}
      </Flex>
      <Flex flexDirection='column' flex={1}>
        <HomeworkCard classes={user.classes} />
      </Flex>
    </Layout>
  )
}

export default Home