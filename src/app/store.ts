import { configureStore } from "@reduxjs/toolkit"
import boardReducer from "../features/board/boardSlice"

const store = configureStore({
  reducer: boardReducer,
})

export type RootState = ReturnType<typeof store.getState>

export default store
