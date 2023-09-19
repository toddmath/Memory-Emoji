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
      if (status === "running") handleStopWatch()
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

  // const doubleTail = useCallback((str: string) => str.slice(-2), [])
  // const formatTime = useCallback((n: number) => `0${String(n)}`.slice(-2), [])

  return useMemo(
    () =>
      ({
        hours: `0${~~(stopWatch / 3600000)}`.slice(-2),
        minutes: `0${~~((stopWatch / 60000) % 60)}`.slice(-2),
        seconds: `0${~~((stopWatch / 1000) % 60)}`.slice(-2),
        centiseconds: `0${~~((stopWatch / 10) % 100)}`.slice(-2),
        lapse: stopWatch,
      } as const),
    [stopWatch]
  )
}
