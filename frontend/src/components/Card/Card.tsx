import { FlexProps } from 'components/Flex/types'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { flexbox, space, maxWidth } from 'styled-system'

const cardSizes = {
  sm: {
    maxWidth: '25%',
    width: '38.6rem',
    padding: '1.6rem',
  },
  md: {
    maxWidth: '33%',
    width: '50.6rem',
    padding: '2rem',
  },
  lg: {
    maxWidth: '47%',
    width: '62.6rem',
    padding: '2.4rem',
  }
}

interface CardProps extends FlexProps {
  size?: 'sm' | 'md' | 'lg'
  pinColor?: string; // # should not
}

const StyledCard = styled.div<CardProps>`
  display: flex;
  flex-direction: ${p => p.flexDirection || 'column'};
  width: ${p => cardSizes[p.size || 'sm'].width};
  max-width: 95%;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: relative;
  gap: ${p => p.gap || '1.6'}rem;
  padding: ${p => cardSizes[p.size || 'sm'].padding};

  ${p => p.theme.mediaQueries.m} {
    max-width: 90%;
  }

  &::after {
    position: absolute;
    content: url('data:image/svg+xml; utf8, <svg width="32px" height="32px" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27.7177 30.3301L27.3597 30.7706L27.5545 31.3037C29.1879 35.7759 28.9521 40.4865 25.9464 43.4923C25.4583 43.9804 24.6668 43.9804 24.1787 43.4923L15.1631 34.4767L14.456 33.7696L13.7489 34.4767L6.89587 41.3297L2.65314 42.7439L4.06738 38.5012L10.9204 31.6482L11.6275 30.9411L10.9204 30.234L1.90476 21.2184C1.4166 20.7302 1.4166 19.9388 1.90476 19.4506C4.88351 16.4719 9.57549 16.1924 14.0933 17.8425L14.6264 18.0372L15.0669 17.6793L23.7181 10.6503L24.5786 9.95114L23.7946 9.16711L20.9966 6.36915C20.5085 5.88099 20.5085 5.08956 20.9966 4.60139L24.1786 1.41941C24.6668 0.931248 25.4582 0.931248 25.9464 1.41941L43.9776 19.4506C44.4657 19.9388 44.4657 20.7302 43.9776 21.2184L40.7956 24.4004C40.3074 24.8885 39.516 24.8885 39.0278 24.4004L36.2299 21.6024L35.4458 20.8184L34.7466 21.6789L27.7177 30.3301Z" fill="${p => p.pinColor || "red"}" stroke="black" stroke-width="2"/></svg>') ;
    top: -2rem;
    right: -0.8rem;
    width: 2rem;
    height: 2rem;
    display: ${p => !p.pinColor && 'none'};
  }

  ${flexbox}
  ${space}
  ${maxWidth}
`

export default StyledCard