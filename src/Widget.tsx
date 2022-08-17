import useGallery from './hooks/useGallery'
import WidgetContainer from './components/Container'
import Filter from './components/Filter'
import Gallery from './components/Gallery'
import CharacterModal from './components/CharacterModal'

function Widget() {
  const gallery = useGallery()

  return (
    <WidgetContainer>
      <Filter onChange={gallery.onFilterChange} />

      <Gallery
        data={gallery.data}
        loadMore={gallery.loadMore}
        onItemClick={gallery.characterModal.show}
      />

      {gallery.characterModal.data && (
        <CharacterModal
          id={gallery.characterModal.data.id}
          name={gallery.characterModal.data.name}
          status={gallery.characterModal.data.status}
          species={gallery.characterModal.data.species}
          type={gallery.characterModal.data.type}
          gender={gallery.characterModal.data.gender}
          origin={gallery.characterModal.data.origin.name}
          location={gallery.characterModal.data.location.name}
          img={gallery.characterModal.data.image}
          close={gallery.characterModal.hide}
          onClick={gallery.characterModal.showNext}
        />
      )} 
    </WidgetContainer>
  )
}

export default Widget 
