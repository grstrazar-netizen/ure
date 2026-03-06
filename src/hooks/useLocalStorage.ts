import { useEffect, useState } from 'react'

export function useLocalStorage<T>(load: () => T, save: (data: T) => void) {
  const [state, setState] = useState<T>(() => load())

  useEffect(() => {
    save(state)
  }, [state, save])

  return [state, setState] as const
}
