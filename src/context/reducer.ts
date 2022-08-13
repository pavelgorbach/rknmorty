import { FilterParams, Characters } from "./types"

export type State = {
  filter: Partial<FilterParams> | null
  characters: Characters | null 
  loading: boolean
}

export type Actions =
  | { type: 'SET_FILTER', payload: State["filter"] | null }
  | { type: 'SET_CHARACTERS', payload: Characters | null }
  | { type: 'PATCH_CHARACTERS', payload: Characters }
  | { type: 'SET_LOADING', payload: boolean }

export const INITIAL_STATE: State = {
  filter: null, 
  characters: null,
  loading: false
}

const appReducer = (state: State = INITIAL_STATE, action: Actions): State => {
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
            ...action.payload.ids
          ]
        }
      }
    default:
      return state 
  }
}

export default appReducer