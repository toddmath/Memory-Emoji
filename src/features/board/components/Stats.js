import React, { memo } from "react"
import { useStopWatch } from "hooks"
import styled from "styled-components/macro"

const StatContainer = styled.div`
  /* position: fixed; */
  /* bottom: 0; */
  /* left: 0; */
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  /* background-color: rgba(0, 0, 0, 0.2); */
  background-color: inherit;
  color: #ccc;
  transition: all 0.2s ease-out;
  h2 {
    padding: 5px;
    border-radius: 5px;
    font-size: clamp(1.3rem, 3vw, 1.7rem);
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
  column-gap: 5px;
  /* width: 30%; */
  font-size: clamp(1.3rem, 3vw, 1.7rem);
  padding: 5px;
  line-height: 1;
`

function Stats({ status, moves }) {
  const { hours, minutes, seconds, centiseconds } = useStopWatch(
    status === "running"
  )

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

export default memo(Stats)

/*
<h2 className='seconds'>
  seconds: <span>{time}</span>
</h2>
*/
