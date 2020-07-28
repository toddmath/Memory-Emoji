import React, { memo } from "react"
import { Board } from "./features/board/Board"

function App() {
  return <Board />
}

App.displayName = App

export default memo(App)
