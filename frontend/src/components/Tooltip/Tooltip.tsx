import styled from "styled-components"


const StyledTooltip = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px;

  span {
    cursor: pointer;
  }
`

interface Props {
  texts: string[]
  clickHandlers: Array<() => any>
}

const Tooltip: React.FC<Props> = ({ texts, clickHandlers }) => {

  const tooltipTexts = texts.map((text, i) => {
    return (
      <span key={text} onClick={clickHandlers[i]}>{text}</span>
    )
  })

  return (
    <StyledTooltip>
      {tooltipTexts}
    </StyledTooltip>
  )
}

export default Tooltip