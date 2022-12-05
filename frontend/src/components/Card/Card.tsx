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
}

const StyledCard = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  width: ${p => cardSizes[p.size || 'sm'].width};
  max-width: ${p => cardSizes[p.size || 'sm'].maxWidth};
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: relative;
  gap: 1.6rem;
  padding: ${p => cardSizes[p.size || 'sm'].padding};

  ${p => p.theme.mediaQueries.m} {
    max-width: 90%;
  }

  ${flexbox}
  ${space}
  ${maxWidth}
`

const Card: React.FC<CardProps & PropsWithChildren> = ({ children, ...props }) => {
  return (
    <StyledCard {...props}>
      {children}
    </StyledCard>
  )
}

export default Card