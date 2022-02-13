import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { userReducer } from './user/reducer'
import { watchFetchUser } from './user/saga'
import { watchGetEpg, watchGetPlaylists, watchSetFavorites } from './tv/saga'
import { tvReducer } from './tv/reducer'

const saga = createSagaMiddleware()

const reducer = combineReducers({
  user: userReducer,
  'tv-channels': tvReducer,
})

const composeEnhancers = compose(
  applyMiddleware(saga),
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(),
)

const store = createStore(
  reducer,
  composeEnhancers,
)


saga.run(watchFetchUser)
saga.run(watchGetPlaylists)
saga.run(watchGetEpg)
saga.run(watchSetFavorites)

export type State = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch

export default store