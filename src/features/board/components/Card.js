import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled, { css } from "styled-components/macro"
import {
  flipCard,
  flipBack,
  selectFlipped,
  selectSolved,
  setStatus,
} from "../boardSlice"

export function Card({ id, content, codepoint }) {
  const solved = useSelector(selectSolved)
  const flipped = useSelector(selectFlipped)
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(flipCard({ content, codepoint, id }))
  }

  const isFlipped = flipped.findIndex(f => f.id === id)

  useEffect(() => {
    if (flipped.length - solved.length >= 2) {
      let fbTimer = setTimeout(() => {
        dispatch(flipBack())
      }, 1000)
      return () => clearTimeout(fbTimer)
    }
  }, [flipped, solved, dispatch])

  useEffect(() => {
    if (solved.length === 35) {
      dispatch(setStatus("victory"))
    }
  })

  return (
    <CardContainer onClick={handleClick} $flipped={isFlipped !== -1}>
      <Front></Front>
      <Back>
        <p>{content}</p>
      </Back>
    </CardContainer>
  )
}

const facesStyles = css`
  margin: 0;
  display: block;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: transform 400ms cubic-bezier(0, 0.69, 0.35, 1.5);
  perspective-origin: center;
  perspective: 100rem;
  box-shadow: 0px 6px 21px -8px rgba(0, 0, 0, 0.81);
  border-radius: 0.5em;
`

const Front = styled.div`
  ${facesStyles};
  transform: rotateY(0deg);
  background: rgba(0, 0, 0, 0.35);
`

const Back = styled.div`
  background: rgba(255, 255, 255, 0.35);
  transform: rotateY(180deg);
  user-select: none;
  pointer-events: none;
  p {
    user-select: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    font-weight: bold;
    height: 100%;
    font-size: clamp(34px, 4vw, 2.8rem);
    line-height: 1;
  }
  ${facesStyles};
`

const CardContainer = styled.div`
  aspect-ratio: 1 / 1;
  background: transparent;
  perspective-origin: center;
  perspective: 100rem;
  transform-style: preserve-3d;
  min-width: 100%;
  min-height: 100%;
  display: block;
  position: relative;
  transition: all 300ms ease-out;
  border-radius: 0.5em;
  &:hover {
    transform: scale3d(1.05, 1.05, 1);
  }
  ${props =>
    props.$flipped &&
    css`
      transform: scale3d(1.05, 1.05, 1.05);
      pointer-events: none;
      ${Back} {
        transform: rotateY(0deg);
        box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.3);
      }
      ${Front} {
        transform: rotateY(-180deg);
        box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.3);
      }
    `}
`
