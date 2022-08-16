import { AppProvider } from './context/context'

import Container from './components/Container'
import Filter from './components/Filter'
import Gallery from './components/Gallery'
import CharacterCard from './components/CharacterCard'

function App() {
  return (
    <Container>
      <AppProvider>
        <Filter />
        <Gallery />
        <CharacterCard />
      </AppProvider>
    </Container>
  )
}

export default App 
