import styled from "styled-components"

interface Props {
  tick: number
  circle?: boolean
}

const Clock = ({ tick, circle = true }: Props) => (
  <Svg viewBox='0 0 100 100'>
    {circle === true ? (
      <circle className='circle' cx='50%' cy='20' r='15' />
    ) : (
      <>
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
          $rotate={(tick / 1000) * 360}
          y1='50'
          y2='4'
          x1='50'
          x2='50'
          stroke='red'
          strokeWidth='1'
        />
      </>
    )}
  </Svg>
)

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

const Line = styled.line<{ $rotate: number }>`
  transition: transform 200ms ease;
  transform-origin: 50px 50px;
  transform: rotate(${({ $rotate }) => $rotate}) deg;
`

export default Clock
