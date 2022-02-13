import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { State, Dispatch } from './store/store'

export const useAppSelector: TypedUseSelectorHook<State> = useSelector
export const useAppDispatch = () => useDispatch<Dispatch>()
