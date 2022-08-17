import { useEffect, useCallback, useRef, useReducer } from 'react'

import { DTO, FilterParams } from '../types'
import { debounce } from '../utils'
import * as API from '../api'
import galleryReducer, {
  ICharactersGallery, setCharacterModal, setData, setLoadMore, State
} from '../reducers/galleryReducer'

type PagingContext = {
  lastPage: number
  currentPage: number
  charactersCache: DTO.Character[]
  filterParams: Partial<FilterParams>
}

const INITIAL_STATE: State = {
  characterModal: null,
  data: { status: 'loading'},
  loadMore: { status: 'cannot-load-more'} 
}

const REQUEST_DEBOUNCE_TIMEOUT = 500

export default function useCharactersGallery(): {
  data: ICharactersGallery.Data
  loadMore: ICharactersGallery.LoadMore
  characterModal: {
    data: DTO.Character | null
    show: (characterId: DTO.CharacterId) => void
    hide: () => void
    showNext: (currentCharacterId: DTO.CharacterId) => void
  }
  onFilterChange: (params: FilterParams) => void
} {
  const pagingContextRef = useRef<PagingContext | null>(null)
  const [state, dispatch] = useReducer(galleryReducer, INITIAL_STATE)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCharactersFetchRequest = useCallback(
    debounce(
      async (filterParams: Partial<FilterParams> & { page: number }, charactersCache?: DTO.Character[]) => {
        try {
          const response = await API.fetchCharacters(filterParams)

          const updatedCharacters: DTO.Character[] = [...(charactersCache || []), ...response.results]
          const updatedPagingContext: PagingContext = {
            filterParams,
            lastPage: response.info.pages,
            currentPage: pagingContextRef.current?.currentPage ? pagingContextRef.current.currentPage + 1 : 1,
            charactersCache: updatedCharacters,
          }

          pagingContextRef.current = updatedPagingContext

          const canLoadMore = updatedPagingContext.currentPage !== updatedPagingContext.lastPage

          if (canLoadMore) {
            dispatch(setLoadMore({
              status: 'can-load-more',
              loadMore: () => {
                dispatch(setLoadMore({ status: 'loading-more' }))
                debouncedCharactersFetchRequest(
                  { ...updatedPagingContext.filterParams, page: updatedPagingContext.currentPage + 1 },
                  updatedPagingContext.charactersCache
                )
              },
            }))
          } else {
            dispatch(setLoadMore({ status: 'cannot-load-more' }))
          }

          dispatch(setData({ status: 'success', characters: updatedCharacters }))
        } catch (responseStatusCode) {
          pagingContextRef.current = null
          dispatch(setLoadMore({ status: 'cannot-load-more' }))

          if (responseStatusCode === 404) {
            dispatch(setData({ status: 'no-data' }))
            return
          }

          dispatch(setData({ status: 'error', errorMessage: 'Unexpected server error' }))
        }
      },
      REQUEST_DEBOUNCE_TIMEOUT
    ),
    []
  )

  useEffect(() => {
    debouncedCharactersFetchRequest({ page: 1 })
  }, [debouncedCharactersFetchRequest])

  const onFilterChange = useCallback(
    (p: FilterParams) => {
      pagingContextRef.current = null

      if (state.data.status !== 'loading') dispatch(setData({ status: 'loading' }))
      debouncedCharactersFetchRequest({ ...p, page: 1 })
    },
    [state.data.status, debouncedCharactersFetchRequest]
  )

  useEffect(() => {

  }, [])

  const showCharacterModal = useCallback(
    (characterId: DTO.CharacterId) => {
      if (state.data.status !== 'success') throw Error('Attempt to access "DTO.Character" before data loading')
      const character = state.data.characters.find((x) => x.id === characterId)

      if (!character) throw Error(`Could not find "Character" with id: ${characterId}`)

      dispatch(setCharacterModal(character))
    },
    [state.data]
  )

  const showNextCharacterModal = useCallback(
   (currentCharacterId: DTO.CharacterId) => {
    if(state.data.status !== 'success') return

    const currentIdx = state.data.characters.findIndex((x) => x.id === currentCharacterId)
    const nextCharacter = state.data.characters[currentIdx + 1]
    dispatch(setCharacterModal(nextCharacter || null))
   },
   [state.data]
  )

  const hideCharacterModal = useCallback(() => dispatch(setCharacterModal(null)), [])

  return {
    data: state.data,
    loadMore: state.loadMore,
    onFilterChange,
    characterModal: {
      data: state.characterModal,
      show: showCharacterModal,
      hide: hideCharacterModal,
      showNext: showNextCharacterModal
    }
  }
}
