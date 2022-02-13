import { UserState } from './state'

// загрузить данные пользователя
export const loadUserData = () => ({
  type: 'load-user-data',
})

// данные пользователя уже загрузились или нет
export const setUserLoaded = (isLoading: boolean) => ({
  type: 'set-user-loaded',
  payload: isLoading,
} as const)

// закинуть данные пользователя в стейт
export const setUserData = (data: Partial<UserState>) => ({
  type: 'set-user-data',
  payload: data,
} as const)

// установить авторизован или нет
export const setIsLoggedIn = (loggedIn: boolean) => ({
  type: 'set-is-logged-in',
  payload: loggedIn,
})

export interface UserActions {
  type: string,
  payload?: any
}