export const debounce = <T extends (...args: any) => void>(func: T, wait: number = 500): T => {
  let timer: NodeJS.Timeout

  const debouncedFn = (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => { func(...args) }, wait)
  }

  return debouncedFn as any
}

export const shallowObjEqual = <T extends { [k: string]: unknown }>(a: T, b: T): boolean => {
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)

  if (aKeys.length !== bKeys.length) return false

  for (const k of aKeys) {
    if (a[k] !== b[k]) return false
  }

  return true
}