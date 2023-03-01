import { FC, useEffect, useRef } from 'react'
import { requestLoginUser, requestSendPassword } from '../api/request'
import { storage } from '../api/storage'

const Login: FC = () => {
  const TIMER = 60
  const inputPhone = useRef<HTMLInputElement>(null)
  const inputPassword = useRef<HTMLInputElement>(null)
  const buttonLogin = useRef<HTMLDivElement>(null)
  const buttonSendPassword = useRef<HTMLDivElement>(null)
  const timeRepeat = useRef<HTMLSpanElement>(null)
  const intervalSendPassword = useRef<any>(null)

  const getTime = () => {
    return Math.round(Date.now() / 1000)
  }

  const checkLengthPhone = (e: React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value
    const length = value.length
    if (length <= 11){
      return true
    } else {
      value = value.substring(0, value.length - 1)
      e.currentTarget.value = value
    }
  }

  const validatePhone = (phone: string) => {
    if (phone?.length < 11 || phone?.length > 11) {
      alert('Номер телефона введен некорректно')
      return false
    }
    return `7${phone?.slice(1)}`
  }

  const validatePassword = (password: string) => {
    if (password?.length === 0) {
      alert('Введите пароль')
      return false
    }
    return password
  }

  const checkLockedSendPassword = (time: number) => {
    const past = getTime() - time
    return past < TIMER
  }

  const setIntervalSendPassword = (time: number, timer: number) => {
    intervalSendPassword.current = setInterval(() => {
      if (checkLockedSendPassword(time)) {
        updateTimeRepeat(--timer)
      } else {
        updateTimeRepeat(TIMER)
        unlockedButtonSendPassword()
        removeTimeSendPassword()
        clearIntervalSendPassword()
      }
    }, 1000)
  }

  const clearIntervalSendPassword = () => {
    clearInterval(intervalSendPassword.current)
  }

  const updateTimeRepeat = (time: number) => {
    if (!timeRepeat.current) return
    timeRepeat.current.innerText = String(time)
  }

  const getTimeSendPassword = () => {
    return storage.getItem('timeSendPassword') || String(getTime())
  }

  const setTimeSendPassword = (time: string) => {
    storage.setItem('timeSendPassword', time)
  }

  const removeTimeSendPassword = () => {
    storage.removeItem('timeSendPassword')
  }

  const lockedButtonSendPassword = () => {
    buttonSendPassword.current?.classList.add('locked')
  }

  const unlockedButtonSendPassword = () => {
    buttonSendPassword.current?.classList.remove('locked')
  }

  const checkLockedButtonSendPassword = () => {
    return buttonSendPassword.current?.classList.contains('locked')
  }

  const sendPassword = async () => {
    if (checkLockedButtonSendPassword()) return
    const phone = validatePhone(inputPhone.current?.value || '')
    if (!phone) return
    const time: string = getTimeSendPassword()
    setTimeSendPassword(time)
    const response = await requestSendPassword(phone)
    response && alert(response.message)
    lockedButtonSendPassword()
    setIntervalSendPassword(+time, TIMER)
  }

  const login = () => {
    const phone = validatePhone(inputPhone.current?.value || '')
    const password = validatePassword(inputPassword.current?.value || '')
    phone && password && requestLoginUser(phone, password)
    .then(() => {
      window.location.reload()
    })
  }

  useEffect(() => {
    if (inputPhone.current) inputPhone.current.value = '7'
    buttonSendPassword.current?.addEventListener('touchstart', sendPassword)
    buttonLogin.current?.addEventListener('touchstart', login)
    return () => {
      buttonSendPassword.current?.removeEventListener('touchstart', sendPassword)
      buttonLogin.current?.removeEventListener('touchstart', login)
    }
  }, [])

  useEffect(() => {
    const now = getTime()
    const time = +getTimeSendPassword()
    const pastTime = now - time
    const timer = (pastTime > TIMER || pastTime === 0) ? 0 : TIMER - pastTime
    if (timer > 0) {
      setIntervalSendPassword(+time, timer)
      lockedButtonSendPassword()
    } else {
      removeTimeSendPassword()
    }

    return () => {
      clearIntervalSendPassword()
    }
  }, [])
  
  

  return (
    <div className="login">
      <input
        type="number"
        className="login__input phone"
        placeholder="Введите номер телефона"
        onInput={checkLengthPhone}
        ref={inputPhone}
      />
      <input
        type="password"
        className="login__input password"
        placeholder="Введите пароль"
        maxLength={20}
        ref={inputPassword}
      />
      <div className="login__button" ref={buttonLogin}>Войти</div>
      <div className="login__button" ref={buttonSendPassword}>
        <div className="login__button-text">Получить пароль</div>
        <div className="login__button-text-repeat">Повторно запросить пароль<br/>можно через <span ref={timeRepeat}></span> сек</div>
      </div>
    </div>
  )
}

export default Login