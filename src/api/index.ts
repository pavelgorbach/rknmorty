import { Character, FilterParams, Info, Status } from "../context/types"

const baseURL = 'https://rickandmortyapi.com/api'

type Characters = { info: Info, results: Character[]}
type Error = { error: string }

const fromServer = (data: Characters) => {
  const items = data.results.reduce((acc, item) => {
    acc[item.id] = { ...item, status: item.status.toLocaleLowerCase() as Status }
    return acc
  }, {} as {[id: string]: Character})

  return { info: data.info, items }
}

export const getCharacters = async (params: FilterParams, next?: string | null) => {
  const searchParams = new URLSearchParams(params).toString()

  const url = next
    ? `${next}&${searchParams || ''}`
    : `${baseURL}/character${searchParams ? '?' + searchParams : ''}`

  const resp = await fetch(url)

  if(resp.status === 404 || resp.ok === false) {
    const result = await resp.json() as Error 
    throw new Error(result.error)
  }

  const data = await resp.json() as Characters 

  return fromServer(data)
}
