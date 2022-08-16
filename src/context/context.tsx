import { useReducer, createContext, Dispatch, ReactNode, useContext } from 'react'

import appReducer, { INITIAL_STATE, State, Actions } from './reducer'

const AppContext = createContext<{ state: State; dispatch: Dispatch<Actions>}>({
  state: INITIAL_STATE,
  dispatch: () => null
})

function AppProvider(props: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  )
}

function useAppContext() {
  const context = useContext(AppContext)

  if(context === undefined) {
    throw new Error('useApp hook must be inside AppProvider')
  }

  return context 
}

export { AppProvider, useAppContext }
