import React from "react"
import styled from "styled-components/macro"

interface Props {
  tick: number
  circle?: boolean
}

/* <circle className='circle' cx='125' cy='125' r='120' /> */

const Clock = ({ tick, circle = true }: Props) => {
  // const degrees = (tick / 1000 / 60) * 360
  // const degrees = tick * 360
  // const degrees = ~~((tick / 10) / 100) / 360
  // const degrees = (tick / 100 / 60) * 360
  const degrees = (tick / 1000) * 360

  return (
    <Svg viewBox='0 0 100 100'>
      {circle === true ? (
        <circle className='circle' cx='50%' cy='20' r='15' />
      ) : (
        <React.Fragment>
          <ellipse
            cx='50'
            cy='50'
            rx='48'
            ry='48'
            fill='none'
            stroke='black'
            strokeWidth='1'
          />
          <Line
            style={{
              transform: `rotate(${degrees}deg)`,
            }}
            y1='50'
            y2='4'
            x1='50'
            x2='50'
            stroke='red'
            strokeWidth='1'
          />
        </React.Fragment>
      )}
    </Svg>
  )
}

const Svg = styled.svg`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  & > circle {
    stroke: #ff88fb;
    stroke-width: 8;
    fill: none;
    stroke-linecap: round;
    opacity: 0.3;
  }
`

const Line = styled.line`
  transition: transform 200ms ease;
  transform-origin: 50px 50px;
`

export default Clock
