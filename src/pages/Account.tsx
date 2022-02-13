import { FC, useEffect, useRef } from 'react'
import { requestLogoutUser } from '../api/request'
import { useAppSelector } from '../hooks'

export const Account: FC = () => {
  const canUnregister = useAppSelector(state => state.user.features.can_unregister) || true
  const accountExitButton = useRef<HTMLDivElement>(null)

  const logout = async () => {
    await requestLogoutUser()
    window.location.reload()
  }

  useEffect(() => {
    accountExitButton.current?.addEventListener('touchstart', logout)
    return () => {
      accountExitButton.current?.removeEventListener('touchstart', logout)
    }
  }, [])

  return (
    <div className="account">
      {canUnregister &&
      <div className="account__exit-button" ref={accountExitButton}>Выход</div>}
    </div>
  )
}