import { useEffect, useState } from "react"

const useDebouncedValue = <T>(value: T, timeout = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, timeout) 

    return () => {
      clearTimeout(timer)
    }
  }, [value, timeout])

  return debouncedValue
}

export default useDebouncedValue