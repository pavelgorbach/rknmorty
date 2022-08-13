export type Status = 'alive' | 'dead' | 'unknown' | '' 

type Gender = 'female' | 'male' | 'genderless' | 'unknown' | ''

type Origin = {
  name: string 
  link: string 
}

export type Character = Readonly<{
  id: string
  name: string 
  status: Status 
  species: string 
  type: string
  gender: Gender
  origin: Origin
  location: Origin
  image: string 
  episode: string[] 
  url: string 
  created: string 
}>

export type FilterParams = Readonly<Pick<Character, 'name' | 'status' | 'species' | 'type' | 'gender'>>

export type Info = {
  count: number
  pages: number
  next: string | null 
  prev: string | null
}

export type Characters = {
  info: Info
  items: {
    [id: string]: Character
  },
  ids: string[]
}
