export interface Category {
  id: number
  playlist: string
  name: string
  icon: string
  items: number[]
}

interface Channel {
  id: number | null
  channel_id: number | null
  age_limit: number | null
  name: string | null
  mrl: string | null
  is_blocked: boolean | null
  is_subscribed: boolean | null
  mime_type: string | null
  timeshift_archive_length: string | null
  timeshift_url: string | null
  logo: string | null
  epg: object[]
}

interface Favorites {
  type: string
  media_id: number
  title: string
  categories?: string[]
  desctiption?: string
  genres?: string[]
  production?: string[]
  year?: string
}

export interface TvState {
  title: string
  url: string
  categoryArr: Category[]
  categories: {[key: string]: Category}
  channels: {[key: string]: Channel}
  favorites: Favorites[]
  currentTs: number
  updated: number
  loaded: boolean
  idChannelPlayingNow: false | number
}

export const initialTvState: TvState = {
  title: 'Телеканалы',
  url: 'tv-channels',
  categoryArr: [
    {
      id: 0,
      playlist: '',
      name: '',
      icon: '',
      items: [],
    },
  ],
  categories: {},
  channels: {
    '': {
      id: null,
      channel_id: null,
      age_limit: 0,
      name: null,
      mrl: null,
      is_blocked: null,
      is_subscribed: null,
      mime_type: null,
      timeshift_archive_length: null,
      timeshift_url: null,
      logo: null,
      epg: [],
    }
  },
  favorites: [
    {
      type: '',
      media_id: 0,
      title: '',
      categories: [],
      desctiption: '',
      genres: [],
      production: [],
      year: '',
    },
  ],
  currentTs: 0,
  updated: 0,
  loaded: false,
  idChannelPlayingNow: false,
}