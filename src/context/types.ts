export type URL = string
type Name = string
type Status = 'alive' | 'dead' | 'unknown' | '' 
type Gender = 'female' | 'male' | 'genderless' | 'unknown' | ''
type Origin = {
  name: Name 
  link: URL 
}

export type Character = Readonly<{
  id: string
  name: Name 
  status: Status 
  species: string 
  type: string
  gender: Gender
  origin: Origin
  location: Origin
  image: URL
  episode: URL[] 
  url: URL
  created: string 
}>

export type FilterParams = Readonly<Pick<Character, 'name' | 'status' | 'species' | 'type' | 'gender'>>

export type Info = {
  count: number
  pages: number
  next: URL | null 
  prev: URL | null
}

export type Characters = {
  info: Info
  items: {
    [id: string]: Character
  }
}

export type State = {
  filter: FilterParams
  characters: Characters 
  loading: boolean
}