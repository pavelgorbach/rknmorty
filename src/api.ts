import { encodeQueryParams } from './utils'
import { FilterParams, DTO } from './types'

// @DOC: https://rickandmortyapi.com/documentation/#get-all-characters
export const fetchCharacters = async (
  params?: Partial<FilterParams> & { page?: number }
): Promise<DTO.FetchCharacters> => {
  const queryParams = encodeQueryParams(params || {})

  const response = await fetch('https://rickandmortyapi.com/api/character' + queryParams)
  return await (
    response.ok
      ? response.json()
      : Promise.reject(response.status)
  )
}
