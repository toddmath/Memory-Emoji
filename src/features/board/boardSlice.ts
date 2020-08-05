import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createSelector } from "reselect"

import type { Cards, Card, GameStatus } from "./types"
import type { RootState } from "app/store"

const initialState: InitialState = {
  moves: 0,
  flipped: [],
  solved: [],
  cards: [],
  status: "stopped",
}

interface InitialState {
  moves: number
  flipped: Cards
  solved: Cards
  cards: Cards
  status: GameStatus
}

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<GameStatus>) => {
      state.status = action.payload
      // return state
    },
    setCards: (state, action: PayloadAction<Cards>) => {
      state.cards = action.payload
      // return state
    },
    flipCard: (state, action: PayloadAction<Card>) => {
      state.status = "running"
      const { content, codepoint, id } = action.payload

      if (state.flipped.length - state.solved.length < 2) {
        state.flipped.push({ id, content, codepoint })
        state.moves += 1
        const isMatch = state.flipped.findIndex(
          f => f.codepoint === codepoint && f.id !== id
        )

        if (isMatch !== -1) {
          state.solved.push({ id, content, codepoint })
          state.solved.push(state.flipped[isMatch])

          if (state.solved.length >= 35) {
            state.status = "victory"
          }
        }
      }
    },
    flipCardBack: (state, action: PayloadAction<Card>) => {
      if (state.solved.includes(action.payload)) return
      state.flipped.filter(c => c !== action.payload)
      return state
    },
    checkGame: state => {
      if (state.solved.length >= 35) {
        state.status = "victory"
      }
      // return state
    },
    flipBack: state => {
      state.flipped = state.solved
      // return state
    },
    resetBoard: state => {
      state.moves = 0
      state.flipped = []
      state.solved = []
      state.cards = []
      state.status = "stopped"
      // return state
    },
  },
})

export const {
  setStatus,
  setCards,
  flipCard,
  checkGame,
  flipCardBack,
  flipBack,
  resetBoard,
} = boardSlice.actions

// function flipCardsBack() {
//   return dispatch => {
//     if ()
//     setTimeout(dispatch(flipBack), 1000)
//   }
// }

export const selectBoard = (state: RootState) => state
export const selectStatus = createSelector([selectBoard], board => board.status)
export const selectFlipped = createSelector([selectBoard], board => board.flipped)
export const selectCards = createSelector([selectBoard], board => board.cards)
export const selectSolved = createSelector([selectBoard], board => board.solved)
export const selectMoves = createSelector([selectBoard], board => board.moves)

export default boardSlice.reducer
