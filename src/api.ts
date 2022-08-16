import { FilterParams, Characters, Character, Info, Status, CharacterResponse, CharacterResponseError } from "./types"

const baseURL = 'https://rickandmortyapi.com/api'

function transformResponse(data: CharacterResponse) {
  const items = data.results.reduce((acc, item) => {
    acc[item.id] = { ...item, status: item.status.toLowerCase() as Status }
    return acc
  }, {} as {[id: string]: Character })

  return { info: data.info, items, ids: Object.keys(items) }
}

type Request = {
  params?: Partial<FilterParams>,
  next?: Info['next']
}

export async function getCharacters(p: Request ): Promise<Characters> {
  const searchParams = new URLSearchParams(p.params || {}).toString() 
  const url = p.next ? p.next : `${baseURL}/character?${searchParams}`

  const resp = await fetch(url)
  const result = await resp.json()

  if(resp.status === 404 || resp.ok === false) {
    return Promise.reject(result as CharacterResponseError)
  }

  return transformResponse(result as CharacterResponse)
}
