import { InfoIcon } from 'components/Svg/icons'
import React, { PropsWithChildren, useState } from 'react'
import styled from 'styled-components'
import Tippy from '@tippyjs/react'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div<{ open: boolean }>`
  font-size: ${p => p.theme.fontSizes.s}rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  & > div {
    transform: ${p => p.open ? 'rotate(180deg)' : 'none'};
    transition: 300ms;
  }
`

const Body = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  max-height: ${p => p.open ? '350px' : '0'};
  transition: all 300ms ease-in-out;
  overflow: hidden;
  margin: 20px 4px 4px 4px;
  padding: ${p => p.open ? '12px' : '0'};
  gap: 3.6rem;
`

interface AccordionProps {
  header: string;
  tooltip?: string;
}

const Accordion: React.FC<PropsWithChildren<AccordionProps>> = ({ header, tooltip, children }) => {
  const [open, setOpen] = useState(false)
  return (
    <Wrapper>
      <Header onClick={() => setOpen(prev => !prev)} open={open}>{header} <div>&#9662;</div>{tooltip && <Tippy content={tooltip}><span><InfoIcon width={24} /></span></Tippy>}</Header>
      <Body open={open}>
        {children}
      </Body>
    </Wrapper>
  )
}

export default Accordion