import { TvState } from './state'

// получить список тв
export const getPlaylists = () => ({
  type: 'get-playlists',
})

// закинуть данные тв в state
export const setTvData = (data: Partial<TvState>) => ({
  type: 'set-tv-data',
  payload: data,
} as const)

// данные уже загрузились или нет
export const setTvLoaded = (isLoaded: boolean) => ({
  type: 'set-tv-loaded',
  payload: isLoaded,
} as const)

export const getEpg = (channelId: number) => ({
  type: 'get-epg',
  payload: channelId,
})

export const setEpg = (epg: any) => ({
  type: 'set-epg',
  payload: epg,
})

export const setFavorites = (favorites: any) => ({
  type: 'set-favorites',
  payload: favorites,
})

export const getFavorites = () => ({
  type: 'get-favorites',
})

export const setFavoritesInState = (favorites: any) => ({
  type: 'set-favorites-in-state',
  payload: favorites,
})

export const setIdChannelPlayingNow = (id: number | false) => ({
  type: 'set-id-channel-playing-now',
  payload: id,
})


export interface TvActions {
  type: string,
  payload?: any
}