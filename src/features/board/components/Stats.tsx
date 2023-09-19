import { useSelector } from "react-redux"
import styled from "styled-components"

import { useStopWatch } from "hooks"
import { selectMoves, selectStatus } from "../boardSlice"

const StatContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: minmax(120px, 12vmin);
  place-items: center;

  width: 100%;
  background-color: inherit;
  color: #ccc;
  transition: all 0.2s ease-out;
  font-size: clamp(1.3rem, 3vw, 1.7rem);

  h2 {
    padding: 0;
    margin: 0;
    font-size: inherit;
    text-transform: uppercase;
    font-weight: 300;
    letter-spacing: 0.031em;
    font-style: normal;
    line-height: 1;
  }
`

const StopWatch = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-template-rows: auto;
  font-size: inherit;
  place-items: center;
  padding: 0;
  line-height: 1;

  & > span {
    text-align: center;
    width: 3ch;
    vertical-align: middle;
  }

  & > .centiseconds {
    width: 2ch;
  }
`

export default function Stats() {
  const status = useSelector(selectStatus)
  const { hours, minutes, seconds, centiseconds } = useStopWatch(status)
  const moves = useSelector(selectMoves)

  return (
    <StatContainer>
      <h2 className='moves'>
        moves: <span>{moves}</span>
      </h2>
      <StopWatch>
        <span className='hours'>{hours}:</span>
        <span className='minutes'>{minutes}:</span>
        <span className='seconds'>{seconds}:</span>
        <span className='centiseconds'>{centiseconds}</span>
      </StopWatch>
    </StatContainer>
  )
}
