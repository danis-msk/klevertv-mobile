import { getDeviceId, getDeviceMAC } from './device'
import { storage } from './storage'

const URL_REQUEST = 'https://go.klever.tv/jsonrpc-v2'

const getMAC = (): string => {
  let mac = storage.getItem('mac')
  if (!mac) {
    mac = getDeviceMAC()
    storage.setItem('mac', mac)
  }
  return mac || ''
}

const post = async (method: string, params?: object) => {
  try {
    const paramsFetch = sessionId ? { 'SESSION_ID': sessionId, ...params } : params
    const response = await fetch(URL_REQUEST, {
      method: 'POST',
      body: JSON.stringify({
        'jsonrpc': '2.0',
        'method': method,
        'params': paramsFetch,
      })
    })
    if (response.status === 200) {
      return response.json()
    }
  } catch (e) {
    console.log(e)
  }
}

export const requestSendPassword = async (phone: string) => {
  const params = {
    phone: phone,
  }
  const response = await post('send_password', params)
  return response.result
}

export const requestLoginUser = async (phone: string, password: string) => {
  const params = {
    phone: phone,
    password: password,
    macaddr: getMAC(),
    serial_number: getDeviceId(),
  }
  const response = await post('register_terminal', params)
  return response.result
}

export const requestLogoutUser = async () => {
  const params = {
    macaddr: getMAC(),
    serial_number: getDeviceId(),
  }
  await post('unregister_terminal', params)
  sessionId = null
}

export const requestUserData = async () => {
  const response = await post('login', { 'macaddr': getMAC() }) || {}
  if (!response.result) return
  sessionId = response.result.session_id
  return response.result.account_features
}

export const requestPlaylists = async () => {
  const response = await post('get_playlists')
  return response.result
}

export const requestEpg = async (mediaId: number) => {
  const params = {
    media_id: +mediaId,
    start_ts: Math.round(Date.now() / 1000) - 24 * 3600,
    stop_ts: Math.round(Date.now() / 1000) + 12 * 3600,
  }
  const response = await post('get_epg', params)
  return response ? response.result : {programs: []}
}

export const requestGetFavorites = async () => {
  const response = await post('get_favorites')
  return response.result
}

export const requestSetFavorites = async (favorites: any) => {
  const params = {
    favorites: favorites,
  }
  const response = await post('save_favorites', params)
  return response.result
}

export let sessionId: string | null = null