import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components/macro"
import { selectStatus, selectMoves } from "./boardSlice"
import { setupCards } from "./setupCards"
import { Card } from "./components/Card"
import { Header } from "./components/Header"
import { Stats } from "./components/Stats"

export function Board() {
  const [cards, setCards] = useState([])
  const status = useSelector(selectStatus)
  const moves = useSelector(selectMoves)

  useEffect(() => {
    setCards(setupCards())
  }, [])

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
        <Stats moves={moves} status={status} />
      </StatContainer>
    </>
  )
}

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
  align-items: center;
  justify-content: center;
`
