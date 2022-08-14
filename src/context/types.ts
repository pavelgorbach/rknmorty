export type Character = {
  id: string
  name: string 
  status: Status 
  species: string 
  type: string
  gender: 'female' | 'male' | 'genderless' | 'unknown' | ''
  origin: Origin
  location: Origin
  image: string 
  episode: string[] 
  url: string 
  created: string 
}

export type Status = 'alive' | 'dead' | 'unknown' | '' 

type Origin = {
  name: string 
  link: string 
}

export type Info = {
  count: number
  pages: number
  next: string | null 
  prev: string | null
}
