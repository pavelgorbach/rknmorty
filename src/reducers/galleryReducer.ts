import { DTO } from '../types'

export declare namespace ICharactersGallery {
  type Data =
    | { status: 'loading' }
    | { status: 'no-data' }
    | { status: 'success'; characters: DTO.Character[] }
    | { status: 'error'; errorMessage: string }

  type LoadMore =
    | { status: 'cannot-load-more' }
    | { status: 'can-load-more'; loadMore: () => void }
    | { status: 'loading-more' }
}

export type State = Readonly<{
  data: ICharactersGallery.Data
  loadMore: ICharactersGallery.LoadMore
  characterModal: DTO.Character | null
}>

type Actions = 
  | ReturnType<typeof setData> 
  | ReturnType<typeof setLoadMore> 
  | ReturnType<typeof setCharacterModal> 

export function setData(payload: State['data']) {
  return { type: 'SET_DATA' as const, payload }
} 

export function setLoadMore(payload: State['loadMore']) {
  return { type: 'SET_LOAD_MORE' as const, payload }
} 

export function setCharacterModal(payload: State['characterModal']) {
  return { type: 'SET_CHARACTER_MODAL' as const, payload }
} 

export default function galleryReducer(state: State, action: Actions): State {
  switch (action.type) {
    case 'SET_CHARACTER_MODAL':
      return {
        ...state,
        characterModal: action.payload
      }  
    case 'SET_DATA':
      return {
        ...state,
        data: action.payload
      }
    case 'SET_LOAD_MORE':
      return {
        ...state,
        loadMore: action.payload
      }
    default: 
     return state 
  }
}