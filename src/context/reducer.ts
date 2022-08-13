import { State, FilterParams, Characters } from "./types"

export type Actions =
  | { type: 'SET_FILTER', payload: Partial<FilterParams> }
  | { type: 'RESET_FILTER' }
  | { type: 'SET_CHARACTERS', payload: Characters }
  | { type: 'PATCH_CHARACTERS', payload: Characters }
  | { type: 'RESET_CHARACTERS' }

export const INITIAL_FILTER: FilterParams = {
  name: '',
  status: '',
  species: '',
  type: '',
  gender: ''
}
 
export const INITIAL_CHARACTERS: Characters = {
  info: {
    count: 0,
    pages: 0,
    next: null,
    prev: null 
  },
  items: {}
}

export const INITIAL_STATE: State = {
  filter: INITIAL_FILTER,
  characters: INITIAL_CHARACTERS,
  loading: false,
  filtered: false
}

const appReducer = (state: State = INITIAL_STATE, action: Actions): State => {
  switch(action.type) {
    case 'RESET_FILTER':
      return {
        ...state,
        filter: INITIAL_STATE.filter,
        filtered: false,
        loading: true
      }
    case 'SET_FILTER':
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload,
        },
        loading: true,
        filtered: true
      }
    case 'SET_CHARACTERS':
      return {
        ...state,
        characters: action.payload,
        loading: false
      }
    case 'PATCH_CHARACTERS':
      return {
        ...state,
        characters: {
          info: action.payload.info,
          items: {
            ...state.characters.items,
            ...action.payload.items
          }
        },
        loading: false
      }
    case 'RESET_CHARACTERS':
      return {
        ...state,
        characters: INITIAL_CHARACTERS,
        loading: false
      }
    default:
      return state 
  }
}

export default appReducer