import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"

import { resetBoard } from "./boardSlice"
import { setupCards } from "./setupCards"
import Card from "./components/Card"
import Stats from "./components/Stats"

import type { Cards } from "./types"
import { motion } from "framer-motion"

export function Board() {
  const [cards, setCards] = useState<Cards>([])
  const dispatch = useDispatch()

  useEffect(() => {
    setCards(setupCards())
  }, [])

  const handleReset = () => {
    dispatch(resetBoard())
    setCards(setupCards())
  }

  return (
    <>
      <GameGrid layout>
        {cards.map(item => (
          <Card
            key={item.id}
            id={item.id}
            content={item.content}
            codepoint={item.codepoint}
          />
        ))}
      </GameGrid>

      <StatContainer>
        <Reset onClick={handleReset}>Reset</Reset>
        <Stats />
      </StatContainer>
    </>
  )
}

const Reset = styled.button`
  border: none;
  flex: 1 0 15%;
  font-family: inherit;
  font-size: clamp(1.3rem, 3vw, 1.7rem);
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.031em;
  font-style: normal;
  line-height: 1;
  padding: 0 0.5em;
  transition: background 200ms ease-in;
  background-color: inherit;
  color: #ccc;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.35);
  }
`

const GameGrid = styled(motion.main)`
  display: grid;
  justify-content: center;
  place-items: center;
  grid-template-columns: repeat(6, 10vmin);
  grid-template-rows: repeat(6, 10vmin);
  grid-gap: 2.5vmin;
`

const StatContainer = styled.footer`
  display: flex;
  width: 100%;
  align-items: stretch;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.125);
`
