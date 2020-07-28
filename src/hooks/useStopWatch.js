import { useState, useCallback } from "react"
import useInterval from "./useInterval"

export default function useStopWatch(isRunning = false) {
  const [timerStart] = useState(Date.now())
  const [stopWatch, setStopWatch] = useState(Date.now() - timerStart)

  const handleStopWatch = useCallback(() => {
    setStopWatch(Date.now() - timerStart)
  }, [timerStart])

  useInterval(
    () => {
      if (isRunning) {
        handleStopWatch()
      }
    },
    10,
    [isRunning, handleStopWatch]
  ) // ? maybe set to higher delay

  const doubleTail = str => str.slice(-2)
  const formatTime = n => doubleTail(`0${String(n)}`)

  return {
    hours: formatTime(~~(stopWatch / 3600000)),
    minutes: formatTime(~~((stopWatch / 60000) % 60)),
    seconds: formatTime(~~((stopWatch / 1000) % 60)),
    centiseconds: formatTime(~~((stopWatch / 10) % 100)),
  }
}
