import axios from "axios"

const fetchUser = async (id: string, jwtToken?: string) => {
  try {
    const result = await axios.post('/api/user/getUserData', { id })
    console.log(result)
    const { classes, email, firstName, lastName, classAmount, profileImgPath, completedUsers } = result.data

    return {
      id,
      jwtToken,
      firstName,
      lastName,
      email,
      classes,
      classAmount,
      profileImgPath,
      isLoggedIn: true
    }

  } catch (e) {
    console.log('An error occured while fetching user data: ', e)
  }
}

export default fetchUser