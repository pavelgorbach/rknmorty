export const debounce = <T extends (...args: any) => void>(func: T, wait: number): T => {
  let timer: NodeJS.Timeout

  const debouncedFn = (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), wait)
  }

  return debouncedFn as any
}