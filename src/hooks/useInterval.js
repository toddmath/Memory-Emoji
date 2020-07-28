import { useEffect, useRef } from "react"

export default function useInterval(callback, delay, dependencies = []) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  const deps = dependencies.length ? [...dependencies, delay] : [delay]

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, deps)
}
