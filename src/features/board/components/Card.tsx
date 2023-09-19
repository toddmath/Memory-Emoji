import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled, { css } from "styled-components"
import { AnimatePresence, motion, Variants } from "framer-motion"

import {
  flipCard,
  flipBack,
  checkGame,
  selectFlipped,
  selectSolved,
} from "../boardSlice"

import type { Card as ICard } from "../types"

const frontVariants: Variants = {
  initial: {
    rotateY: 0,
    boxShadow: "0px 6px 21px -8px rgba(0, 0, 0, 0.81)",
  },
  flipped: {
    rotateY: -180,
    boxShadow: "0px 0px 12px 3px rgba(0, 0, 0, 0.3)",
  },
}

const backVariants: Variants = {
  initial: {
    rotateY: 180,
    boxShadow: "0px 6px 21px -8px rgba(0, 0, 0, 0.81)",
  },
  flipped: {
    rotateY: 0,
    boxShadow: "0px 0px 12px 3px rgba(0, 0, 0, 0.3)",
  },
}

const parentVariants: Variants = {
  initial: { scale: 1, opacity: 1 },
  hover: { scale: 1.1, opacity: 1 },
  flipped: { scale: 1, opacity: 1 },
}

function Card({ id, content, codepoint }: ICard) {
  const solved = useSelector(selectSolved)
  const flipped = useSelector(selectFlipped)
  const dispatch = useDispatch()

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

      return () => {
        clearTimeout(fbTimer)
      }
    }
  }, [flipped, solved, dispatch])

  return (
    <AnimatePresence>
      <CardContainer
        layoutId={id}
        key={content}
        variants={parentVariants}
        initial='initial'
        animate={isFlipped !== -1 ? "flipped" : "initial"}
        exit='initial'
        whileHover='hover'
        onClick={handleClick}
        $flipped={isFlipped !== -1}
      >
        <CardFront variants={frontVariants} />
        <CardBack variants={backVariants}>
          <p>{content}</p>
        </CardBack>
      </CardContainer>
    </AnimatePresence>
  )
}

const facesStyles = css`
  position: absolute;
  inset: 0;
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

const CardFront = styled(motion.div)`
  display: block;
  ${facesStyles};
  background: rgba(0, 0, 0, 0.4);
`

const CardBack = styled(motion.div)`
  background: rgba(255, 255, 255, 0.6);
  user-select: none;
  display: grid;
  place-items: center;

  & > p {
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
  isolation: isolate;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  background: transparent;
  min-width: 100%;
  min-height: 100%;
  display: block;
  position: relative;
  border-radius: 0.5em;
  cursor: pointer;
  pointer-events: ${({ $flipped }) => ($flipped ? "none" : "auto")};
`

export default Card
