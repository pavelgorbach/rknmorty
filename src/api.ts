import { Character, Info, Status } from "./context/types"
import { FilterParams, Characters } from "./context/reducer"

const baseURL = 'https://rickandmortyapi.com/api'

type Response = { info: Info, results: Character[]}
type Error = { error: string }

function fromServer(data: Response) {
  const items = data.results.reduce((acc, item) => {
    acc[item.id] = { ...item, status: item.status.toLowerCase() as Status }
    return acc
  }, {} as {[id: string]: Character })

  return { info: data.info, items, ids: Object.keys(items) }
}

export async function getCharacters(params: Partial<FilterParams> | null, next?: string | null): Promise<Characters> {
  const searchParams = new URLSearchParams(params || {}).toString() 
  const url = next ? next : `${baseURL}/character?${searchParams}`

  const resp = await fetch(url)

  if(resp.status === 404 || resp.ok === false) {
    const result = await resp.json() as Error 
    Promise.reject(result.error)
  }

  const data = await resp.json() as Response 

  return Promise.resolve(fromServer(data))
}