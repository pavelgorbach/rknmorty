import { Dispatch } from "react"

import { FilterParams, Characters, Info } from "../types"
import { getCharacters } from "../api"

export type State = Readonly<{
  filterParams?: FilterParams
  characters?: Characters
  loading: boolean
  selectedCharacter?: string
}>

export const INITIAL_STATE: State = {
  loading: false
}

export const INITIAL_FILTER_PARAMS: FilterParams = {
  name: '',
  species: '',
  status: '',
  type: '',
  gender: '',
}

export const setFilter = (payload: Partial<State['filterParams']>) => {
  return { type: 'SET_FILTER' as const, payload }
}

export const setCharacters = (payload: State['characters']) => {
  return { type: 'SET_CHARACTERS' as const, payload}
}

export const setLoading = (payload: State['loading']) => {
  return { type: 'SET_LOADING' as const, payload }
}

export const selectCharacter = (payload?: State['selectedCharacter']) => {
  return { type: 'SELECT_CHARACTER' as const, payload }
}

export async function getCharactersAsync(p: {
  dispatch: Dispatch<Actions>
  filterParams: State['filterParams']
  characters?: State['characters']
  next?: Info['next'] 
}) {
  p.dispatch(setLoading(true))
  try {
    const data = await getCharacters({ params: p.filterParams, next: p.next })
    
    const updatedCharacters: Characters = {
      info: data.info,
      items: {
        ...p.characters?.items || {},
        ...data.items
      },
      ids: [
        ...p.characters?.ids || [],
        ...data.ids
      ]
    }
    
    p.dispatch(setCharacters(updatedCharacters))
    p.dispatch(setLoading(false))
  } catch(e) {
    console.info(e)
    p.dispatch(setCharacters(undefined))
    p.dispatch(setLoading(false))
  }
}

export type Actions =
  | ReturnType<typeof setFilter>
  | ReturnType<typeof setCharacters>
  | ReturnType<typeof setLoading>
  | ReturnType<typeof selectCharacter>

export default function appReducer(state: State = INITIAL_STATE, action: Actions): State {
  switch(action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        filterParams: {
          ...state.filterParams || INITIAL_FILTER_PARAMS,
          ...action.payload
        }
      }
    case 'SET_CHARACTERS':
      return {
        ...state,
        characters: action.payload
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'SELECT_CHARACTER':
      return {
        ...state,
        selectedCharacter: action.payload,
      }
    default:
      return state 
  }
}
