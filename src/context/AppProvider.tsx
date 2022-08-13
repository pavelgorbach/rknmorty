import { useReducer, createContext, Dispatch, ReactNode } from 'react';
import { State } from './types';
import appReducer, { INITIAL_STATE, Actions} from './reducer';

type IAppContext = {
  state: State 
  dispatch: Dispatch<Actions>
} 

const AppContext = createContext<IAppContext>({
  state: INITIAL_STATE,
  dispatch: () => null
})

function AppProvider(props: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
}


export { AppProvider, AppContext }
