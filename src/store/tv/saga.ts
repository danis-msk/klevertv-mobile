import { takeEvery, put, call } from 'redux-saga/effects'
import { requestGetFavorites, requestSetFavorites } from '../../api/request'
import { initialTvState } from './state'
import { requestEpg, requestPlaylists } from '../../api/request'
import { setUserData } from '../user/action'
import { setEpg, setFavoritesInState, setTvData, setTvLoaded, TvActions } from './action'

const URL_CATEGORY_ICON = 'http://go.commpass.tv/mobile-icons/groups/'
const URL_CHANNEL_LOGO = 'https://go.klever.tv/icons/channels/'

function* getPlaylists(): any {
  yield put(setTvLoaded(false))
  const data = yield call(requestPlaylists)
  const channelsArr = data.medialist
  const state = {
    ...initialTvState,
    categoriesArr: data.playlists,
    favorites: data.favorites,
    currentTs: data.current_ts,
    updated: data.updated,
  }
  state.categoriesArr.forEach((cat: any) => {
    delete cat.logo
    cat.icon = createUrlCategoryIcon(cat.playlist)
    state.categories[cat.playlist] = cat
  })
  channelsArr.forEach((chan: any) => {
    chan.logo = createUrlChannelLogo(chan.id)
    chan.epg = []
    state.channels[chan.id] = chan
  })

  const features = data.account_features
  yield put(setTvData(state))
  yield put(setUserData(features))
  yield put(setTvLoaded(true))
}

function* getEpg(action: TvActions): any {
  const channelId = action.payload
  const data = yield call(requestEpg, channelId)
  const epg = data.programs
  yield put(setEpg({ channelId, epg }))
}

function* setFavorites(action: TvActions): any {
  const favorites = action.payload
  yield call(requestSetFavorites, favorites)
  const data = yield call(requestGetFavorites)
  yield put(setFavoritesInState(data.favorites))
}

export function* watchGetPlaylists() {
  yield takeEvery('get-playlists', getPlaylists)
}

export function* watchGetEpg() {
  yield takeEvery('get-epg', getEpg)
}

export function* watchSetFavorites() {
  yield takeEvery('set-favorites', setFavorites)
}

const createUrlCategoryIcon = (icon: string) => {
  return URL_CATEGORY_ICON + icon + '.png'
}

const createUrlChannelLogo = (id: number) => {
  return URL_CHANNEL_LOGO + id + '.png'
}

