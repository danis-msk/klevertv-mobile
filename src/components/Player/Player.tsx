import React, { FC, useEffect, useRef } from 'react'
import { play, stop } from '../../api/player'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setIdChannelPlayingNow } from '../../store/tv/action'
import { EpgList } from '../EpgList/EpgList'
import './Player.scss'
import { useParams } from 'react-router-dom'

interface PlayerProps {
  appRef: any
  headerRef: any
  tabsRef: any
}

interface PlayerParams {
  channelId: string
}

const Player: FC<PlayerProps> = ({ appRef, headerRef, tabsRef }) => {
  const dispatch = useAppDispatch()
  const { channelId } = useParams<PlayerParams>()
  const mrl = useAppSelector(state => state['tv-channels'].channels[channelId].mrl) || ''
  const timeout = useRef<any>(null)
  const [fullScreen, setFullScreen] = React.useState(false)
  
  // скрыть хедер и табы
  const hiddenHeader = (): void => {
    headerRef?.classList.add('hidden')
    tabsRef?.classList.add('hidden')
    setFullScreen(true)
  }
  
  // показать хедер и табы
  const visibleHeader = (): void => {
    headerRef?.classList.remove('hidden')
    tabsRef?.classList.remove('hidden')
    setFullScreen(false)
  }

  // показать хедер и табы - скроются автоматически через 3 сек
  const toggleVisibleHeader = (e: React.TouchEvent): void => {
    const eTarget = e.target as Element
    if (!eTarget.closest('.content')) return
    if (fullScreen) {
      visibleHeader()
      timeout.current = setTimeout(() => {
        hiddenHeader()
      }, 3000)
    } else {
      hiddenHeader()
      clearTimeout(timeout.current)
    }
  }

  const playPlayer = (): void => {
    play(mrl)
    timeout.current = setTimeout(() => {
      hiddenHeader()
    }, 2000)
  }

  const stopPlayer = (): void => {
    stop()
    visibleHeader()
    clearTimeout(timeout.current)
    appRef?.removeEventListener('touchstart', toggleVisibleHeader)
  }

  // остановить плеер при сворачивании приложения
  useEffect(() => {
    const togglePlayer = (): void => {
      if (document.hidden) {
        stopPlayer()
      } else {
        playPlayer()
      }
    }
    document.addEventListener('visibilitychange', togglePlayer)
    return () => {
      document.removeEventListener('visibilitychange', togglePlayer)
    }
  }, [])

  // сохранить в store id канала, который запустился. При уходе со страницы плеера, id сбрасывается
  useEffect(() => {
    dispatch(setIdChannelPlayingNow(+channelId))
    return () => {
      dispatch(setIdChannelPlayingNow(false))
    }
  }, [])

  // запустить плеер при переходе на страницу с плеером
  useEffect(() => {
    playPlayer()
    return () => {
      stopPlayer()
    }
  }, [])

  // переключать видимость хедера и табов при касании на плеер 
  useEffect(() => {
    appRef?.addEventListener('touchstart', toggleVisibleHeader)
    return () => {
      appRef?.removeEventListener('touchstart', toggleVisibleHeader)
    }
  }, [])

  return (
    <div className="player">
      <div className="player__video"></div>
      <div className="player__epg">
        <EpgList channelId={+channelId} />
      </div>
    </div>
  )
}

export default Player
