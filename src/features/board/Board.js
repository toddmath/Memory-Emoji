import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components/macro"
import { selectStatus, selectMoves, resetBoard } from "./boardSlice"
import { setupCards } from "./setupCards"
import Card from "./components/Card"
import { Header } from "./components/Header"
import Stats from "./components/Stats"

export function Board() {
  const [cards, setCards] = useState([])
  const status = useSelector(selectStatus)
  const moves = useSelector(selectMoves)
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
      <Header />
      <GameGrid>
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
        <Reset onClick={handleReset}>Reset Game</Reset>
        <Stats moves={moves} status={status} />
      </StatContainer>
    </>
  )
}

const Reset = styled.button`
  background-color: rgba(255, 255, 255, 0.35);
  border: none;
  flex: 1 0 15%;
  font-size: 1.1rem;
  padding: 0 0.5em;
  transition: background 200ms ease-in;
  &:hover {
    background-color: inherit;
    border: 2px solid rgba(255, 255, 255, 0.35);
  }
`

const GameGrid = styled.main`
  display: grid;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(6, 10vmin);
  grid-template-rows: repeat(6, 10vmin);
  gap: 2.5vmin;
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
