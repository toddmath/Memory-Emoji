import { useEffect, useRef } from "react"

type Noop = () => void

export default function useInterval(
  callback: Noop,
  delay: number | null,
  dependencies: any[] = []
) {
  const savedCallback = useRef<Noop | null>(null)

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  const deps = dependencies.length ? [...dependencies, delay] : [delay]

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
