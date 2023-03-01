import { takeEvery, put, call } from 'redux-saga/effects'
import { requestUserData } from '../../api/request'
import { setUserData, setUserLoaded } from './action'


function* fetchUser(): any {
  yield put(setUserLoaded(false))
  const data = yield call(requestUserData)
  yield put(setUserLoaded(true))
  if (!data) return
  yield put(setUserData(data))
}

export function* watchLoadUserData() {
  yield takeEvery('load-user-data', fetchUser)
}