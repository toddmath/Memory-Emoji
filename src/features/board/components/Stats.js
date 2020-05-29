import React, { useState } from "react"
import { useInterval } from "hooks"
import styled from "styled-components/macro"

const StatContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgba(0, 0, 0, 0.2);
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
  }
`

export function Stats({ status, moves }) {
  const [seconds, setSeconds] = useState(0)

  useInterval(() => {
    if (status === "victory") return
    if (status === "stopped") setSeconds(0)
    else if (status === "running") setSeconds(seconds + 1)
  }, 1000)

  return (
    <StatContainer>
      <h2 className='moves'>
        moves: <span>{moves}</span>
      </h2>
      <h2 className='seconds'>
        seconds: <span>{seconds}</span>
      </h2>
    </StatContainer>
  )
}
