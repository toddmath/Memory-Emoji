import { useState, useCallback, useMemo, useEffect } from "react"
import useInterval from "./useInterval"
import { GameStatus } from "../features/board/types"

export function now(): number {
  if (typeof window === "undefined" || !("performance" in window)) {
    return Date.now()
  }
  return performance.now()
}

export default function useStopWatch(status: GameStatus) {
  const [timerStart, setTimerStart] = useState(now())
  const [stopWatch, setStopWatch] = useState(now() - timerStart)

  const handleStopWatch = useCallback(() => {
    if (timerStart === 0) setTimerStart(now())
    setStopWatch(now() - timerStart)
  }, [timerStart])

  useInterval(
    () => {
      if (status === "running") {
        handleStopWatch()
      }
    },
    25,
    [status, handleStopWatch]
  ) // ? maybe set to higher delay

  useEffect(() => {
    if (status === "stopped") {
      setTimerStart(0)
      setStopWatch(0)
    }
  }, [status])

  const doubleTail = useCallback((str: string) => str.slice(-2), [])
  const formatTime = useCallback((n: number) => doubleTail(`0${String(n)}`), [
    doubleTail,
  ])

  return useMemo(
    () =>
      ({
        hours: formatTime(~~(stopWatch / 3600000)),
        minutes: formatTime(~~((stopWatch / 60000) % 60)),
        seconds: formatTime(~~((stopWatch / 1000) % 60)),
        centiseconds: formatTime(~~((stopWatch / 10) % 100)),
        lapse: stopWatch,
      } as const),
    [stopWatch, formatTime]
  )
}
