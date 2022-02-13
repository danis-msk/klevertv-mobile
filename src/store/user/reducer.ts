import { UserState, initialUserState } from './state'
import { UserActions } from './action'

export function userReducer(state = initialUserState, action: UserActions): UserState {
  switch (action.type) {
    case 'set-user-loaded':
      return { ...state, loaded: action.payload }
    case 'set-user-data':
      return { ...state, features: action.payload }
    case 'set-is-logged-in':
      return { ...state, isLoggedIn: action.payload }
    default:
      return state
  }
}