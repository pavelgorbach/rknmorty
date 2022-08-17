export declare namespace DTO {
  type Character = {
    id: number & { __idFor: 'DTO.Character' }
    name: string
    status: 'Alive' | 'Dead' | 'unknown'
    species: string
    type: string // The type or subspecies of the character, i.g Human
    gender: 'male' | 'female' | 'genderless' | 'unknown'
    image: string

    origin: { // Name and link to the character's origin location.
      name: string
      url: string
    }

    location: { // Name and link to the character's last known location endpoint.
      name: string
      url: string
    }
    episode: string[] // URLs - List of episodes in which this character appeared.
    url: string
    created: string // dTime at which the character was created in the database: "2017-11-04T18:50:21.651Z"
  }

  type CharacterId = Character['id']

  type FetchCharacters = {
    info: {
      count: number
      pages: number
      next: string
      prev: string
    }
    results: Character[]
  }
}

export type FilterParams = Pick<DTO.Character, 'name' | 'type' | 'species'> & {
  status: DTO.Character['status'] | '' // empty string means "all" or no filter
  gender: DTO.Character['gender'] | '' // empty string means "all" or no filter
}