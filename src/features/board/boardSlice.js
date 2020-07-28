import { createSlice } from "@reduxjs/toolkit"
import { createSelector } from "reselect"

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    moves: 0,
    flipped: [],
    solved: [],
    cards: [],
    status: "stopped",
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
      // return state
    },
    setCards: (state, action) => {
      state.cards = action.payload
      // return state
    },
    flipCard: (state, action) => {
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
          if (
            state.solved.length === 35 ||
            state.flipped.length === state.solved.length
          ) {
            state.status = "victory"
          }
        }
      }
    },
    flipCardBack: (state, action) => {
      if (state.solved.includes(action.payload)) return
      state.flipped.filter(c => c !== action.payload)
    },
    checkGame: state => {
      if (
        state.solved.length === 35 ||
        state.solved.length === state.flipped.length
      ) {
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

export const selectBoard = state => state
export const selectStatus = createSelector([selectBoard], board => board.status)
export const selectFlipped = createSelector([selectBoard], board => board.flipped)
export const selectCards = createSelector([selectBoard], board => board.cards)
export const selectSolved = createSelector([selectBoard], board => board.solved)
export const selectMoves = createSelector([selectBoard], board => board.moves)

export default boardSlice.reducer
