import { Character, Info } from "./types"

export type State = Readonly<{
  filter: Partial<FilterParams> | null
  characters: Characters | null 
  loading: boolean
  selectedCharacter: string | null
}>

export type FilterParams = Pick<Character, 'name' | 'status' | 'species' | 'type' | 'gender'>

export type Characters = {
  info: Info
  items: {
    [id: string]: Character
  },
  ids: string[]
}

export type Actions =
  | { type: 'SET_FILTER', payload: State["filter"] | null }
  | { type: 'SET_CHARACTERS', payload: Characters | null }
  | { type: 'PATCH_CHARACTERS', payload: Characters }
  | { type: 'SET_LOADING', payload: boolean }
  | { type: 'SELECT_CHARACTER', payload: string | null }

export const INITIAL_STATE: State = {
  filter: null, 
  characters: null,
  loading: false,
  selectedCharacter: null
}

export default function appReducer(state: State = INITIAL_STATE, action: Actions): State {
  switch(action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload == null ? null : { ...state.filter, ...action.payload }
      }
    case 'SET_CHARACTERS':
      return {
        ...state,
        characters: action.payload
      }
    case 'PATCH_CHARACTERS':
      return {
        ...state,
        characters: {
          info: action.payload.info,
          items: {
            ...state.characters?.items,
            ...action.payload.items
          },
          ids: [
            ...(state.characters?.ids || []),
            ...action.payload.ids.filter(id => !state.characters?.items?.[id])
          ]
        }
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
