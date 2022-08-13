import { AppProvider } from './context/AppProvider'
import Filter from './components/Filter'
import Gallery from './components/Gallery'
import Container from './components/Container'

function App() {
  return (
    <AppProvider>
      <Container>
        <Filter />
        <Gallery />
      </Container>
    </AppProvider>
  );
}

export default App
