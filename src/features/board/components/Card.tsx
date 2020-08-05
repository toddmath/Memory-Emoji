import React, { useEffect, memo } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled, { css } from "styled-components/macro"
import { motion, Variants } from "framer-motion"

import {
  flipCard,
  flipBack,
  checkGame,
  selectFlipped,
  selectSolved,
} from "../boardSlice"
// import { useStopWatch } from "context/stopwatch.context"
import type { Card as ICard } from "../types"

const springBack = {
  type: "spring",
  mass: 1,
  stiffness: 250,
  damping: 12,
}

const springForward = {
  type: "spring",
  mass: 1,
  stiffness: 300,
  damping: 20,
}

const frontVariants: Variants = {
  initial: {
    rotateY: 0,
    boxShadow: "0px 6px 21px -8px rgba(0, 0, 0, 0.81)",
    transition: {
      ...springBack,
    },
  },
  flipped: {
    rotateY: -180,
    boxShadow: "0px 0px 12px 3px rgba(0, 0, 0, 0.3)",
    transition: {
      ...springForward,
    },
  },
}

const backVariants: Variants = {
  initial: {
    rotateY: 180,
    boxShadow: "0px 6px 21px -8px rgba(0, 0, 0, 0.81)",
    transition: {
      ...springBack,
    },
  },
  flipped: {
    rotateY: 0,
    boxShadow: "0px 0px 12px 3px rgba(0, 0, 0, 0.3)",
    transition: {
      ...springForward,
    },
  },
}

const parentVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  flipped: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
}

const Card = memo(function Card({ id, content, codepoint }: ICard) {
  const solved = useSelector(selectSolved)
  const flipped = useSelector(selectFlipped)
  const dispatch = useDispatch()
  // const { isRunning, startWatch } = useStopWatch()

  const handleClick = () => {
    dispatch(flipCard({ content, codepoint, id }))
    dispatch(checkGame())
  }

  const isFlipped = flipped.findIndex(f => f.id === id)

  useEffect(() => {
    if (flipped.length - solved.length >= 2) {
      let fbTimer = setTimeout(() => {
        dispatch(flipBack())
        dispatch(checkGame())
      }, 1000)

      return () => clearTimeout(fbTimer)
    }
  }, [flipped, solved, dispatch])

  return (
    <CardContainer
      variants={parentVariants}
      initial='initial'
      animate={isFlipped !== -1 ? "flipped" : "initial"}
      whileHover='hover'
      onClick={handleClick}
      $flipped={isFlipped !== -1}
    >
      <Front variants={frontVariants} initial='initial' />
      <Back variants={backVariants} initial='initial'>
        <p>{content}</p>
      </Back>
    </CardContainer>
  )
})

const facesStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  overflow: hidden;
  pointer-events: none;
  transform-style: preserve-3d;
  perspective: 100rem;
  perspective-origin: center;
  border-radius: 0.5em;
`

const Front = styled(motion.div)`
  display: block;
  ${facesStyles};
  background: rgba(0, 0, 0, 0.35);
`

const Back = styled(motion.div)`
  background: rgba(255, 255, 255, 0.35);
  user-select: none;
  display: grid;
  place-items: center;

  p {
    user-select: none;
    margin: 0;
    padding: 0;
    text-align: center;
    font-size: clamp(34px, 4vw, 2.8rem);
    line-height: 1;
  }

  ${facesStyles};
`

const CardContainer = styled(motion.div)<{ $flipped: boolean }>`
  aspect-ratio: 1 / 1;
  background: transparent;
  min-width: 100%;
  min-height: 100%;
  display: block;
  position: relative;
  border-radius: 0.5em;
  cursor: pointer;
  pointer-events: ${props => (props.$flipped === true ? "none" : "auto")};
`

export default Card
