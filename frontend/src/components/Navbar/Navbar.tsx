import React, { useState } from 'react'
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaHome, FaEnvelope, FaUsers, FaBell, FaGraduationCap, FaRegArrowAltCircleRight } from 'react-icons/fa'
import { Link } from 'components/Link'
import { MenuIcon } from 'components/Svg/icons'
import useBreakpoints from 'components/hooks/useBreakpoints'
import LogoImage from 'assets/logos/Logo.png'
import LogoShortImage from 'assets/logos/Logo_Short.png'
import { useUser } from 'state/hooks'
import useModal from 'components/Modal/useModal'
import ImageModal from 'components/Modal/ImageModal'
import { useDispatch } from 'react-redux'
import { resetUserData } from 'state/user'

const HeaderWrapper = styled.header`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem 10rem;
  background-color: ${p => p.theme.colors.primary};

  & > div {
    flex: 1;
  }
`

const Menu = styled.nav<{ isOpen: boolean }>`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4rem;
  background-color: ${p => p.theme.colors.primary};
  font-size: ${p => p.theme.fontSizes.xl}rem;
  font-family: "Jua", sans-serif;

  ${p => p.theme.mediaQueries.m} {
    flex-direction: column;
    width: ${p => p.isOpen ? '180px' : '0px'};
    height: 100vh;
    max-width: ${p => p.isOpen ? '50vw' : '0px'};
    position: fixed;
    right: 0;
    top: 11rem;
    transition: 300ms;
    padding: ${p => p.isOpen ? "32px 0 0 32px" : "32px 0 0 0"};
    font-size: ${p => p.theme.fontSizes.xl}rem;
    overflow: hidden;
    background-color: ${p => p.theme.colors.primary};
  }
`

const Logo = styled.div<{ loggedIn: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${p => p.loggedIn ? 'flex-start' : 'center'};
  gap: 2rem;
`

const Profile = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;

  ${p => p.theme.mediaQueries.m} {
    flex-direction: column;
  }

  & > img {
    border-radius: 50%;
    cursor: pointer;
    transition: 200ms;
    max-height: 100%;

    &:hover {
      scale: 1.1;
    }
  }

  & > svg {
    height: 3rem;
    width: 3rem;
  }

  & > a {
    font-family: sans-serif;
  }

`

const Navbar: React.FC = () => {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const { isM } = useBreakpoints()
  const navigate = useNavigate()
  const dispatch = useDispatch<any>()
  const user = useUser()

  const userImage = `http://127.0.0.1:5000/${user.profileImgPath || "images/unknownUser.png"}`

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiration')
    dispatch(resetUserData())
    navigate('/')
  }

  const handleUploadImage = (file: File) => {
    console.log(file)
  }

  const [onPresentImageModal] = useModal(<ImageModal clickHandler={handleUploadImage} />)

  return (
    <HeaderWrapper>
      <Logo loggedIn={user.isLoggedIn}>
        <Link to="/">
          <img src={isM ? LogoShortImage : LogoImage} alt="Marmodo Logo" style={{ height: '8rem' }} />
        </Link>
      </Logo>
      {user.isLoggedIn && <Menu isOpen={menuOpen}>
        <Link to="/home" isActive={pathname === '/home'}>
          <FaHome /> Home
        </Link>
        <Link to="/messages" isActive={pathname === '/messages'}>
          <FaEnvelope /> Messages
        </Link>
        <Link to="/classes" isActive={pathname === '/classes'}>
          <FaUsers /> Classes
        </Link>
        {isM && <Profile><img src={userImage} alt="User Picture" /><Link to="/">Can Özfuttu <FaGraduationCap /></Link></Profile>}
      </Menu>}
      {user.isLoggedIn ? isM
        ? <MenuIcon isOpen={menuOpen} onClick={() => setMenuOpen((prev) => !prev)} />
        : <Profile><FaBell /> <img src={userImage} alt="User Picture" width={64} onClick={onPresentImageModal} /><FaRegArrowAltCircleRight onClick={handleLogout} cursor="pointer" /></Profile>
        : <></>
      }
    </HeaderWrapper>
  )
}

export default Navbar