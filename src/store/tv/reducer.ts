import { initialTvState, TvState } from './state'
import { TvActions } from './action'

export const tvReducer = (state = initialTvState, action: TvActions): TvState => {
  switch (action.type) {
    case 'set-tv-data':
      return { ...state, ...action.payload }
    case 'set-tv-loaded':
      return { ...state, loaded: action.payload }
    case 'set-epg':
      return {
        ...state,
        channels: {
          ...state.channels,
          [action.payload.channelId]: {
            ...state.channels[action.payload.channelId],
            epg: action.payload.epg,
          },
        },
      }
    case 'set-favorites-in-state':
      return {
        ...state,
        favorites: action.payload
      }
    case 'set-id-channel-playing-now':
      return {
        ...state,
        idChannelPlayingNow: action.payload
      }
    default:
      return state
  }
}
