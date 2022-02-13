import { forwardRef, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { setFavorites } from '../../store/tv/action'
import './Header.scss'

interface HeaderProps {
  titles: any
  FavoriteIconEmpty: any
  FavoriteIconFilled: any
}

export const Header = forwardRef<HTMLElement, HeaderProps>(({ titles, FavoriteIconEmpty, FavoriteIconFilled }, ref) => {
  const history = useHistory()
  const dispatch = useAppDispatch()

  let favorites = useAppSelector(state => state['tv-channels'].favorites)
  const channelId = useAppSelector(state => state['tv-channels'].idChannelPlayingNow) || ''
  const channelName = useAppSelector(state => state['tv-channels'].channels[channelId].name) || ''

  const [title, setTitle] = useState('')
  const [isPlayer, setIsPlayer] = useState(false)
  const [StarIcon, setStarIcon] = useState(FavoriteIconEmpty)

  const backButton = useRef<HTMLDivElement>(null)
  const favoriteButton = useRef<HTMLDivElement>(null)
  
  const mediaForFavorites = { type: 'channel', media_id: +channelId, title: channelName }

  // показать/скрыть стрелку "назад"
  const toggleVisibilityBackButton = (): void => {
    if (!backButton.current) return
    const slash = history.location.pathname.match(/\//g) || []
    if (slash?.length > 1) {
      backButton.current?.classList.add('active')
    } else {
      backButton.current?.classList.remove('active')
    }
  }

  // вставить заголовок, в зависимости от страницы
  const toggleTitle = (): void => {
    let title: string = channelName
    if (!isPlayer) {
      for (let key in titles) {
        if (history.location.pathname.includes(key)) title = titles[key]
      }
    }
    setTitle(title)
  }

  // проверка находится ли канал в избранном
  const checkFavorites = (): boolean => {
    return favorites.some(el => {
      return el.media_id === mediaForFavorites?.media_id
    })
  }

  // поменять иконку если находится канал в избранном
  const toggleFavoritesIcon = (): void => {
    if (checkFavorites()) {
      setStarIcon(FavoriteIconFilled)
    } else {
      setStarIcon(FavoriteIconEmpty)
    }
  }

  // добавить канал в избранное
  const addFavorites = (): void => {
    let isFavorite: boolean = false
    favorites = favorites.filter(el => {
      if (el.media_id !== mediaForFavorites.media_id) {
        return el
      }
      isFavorite = true
    })
    if (!isFavorite) {
      favorites.push(mediaForFavorites)
    }
    dispatch(setFavorites(favorites))
  }

  const goBack = (): void => {
    history.goBack()
  }


  useEffect(() => {
    toggleVisibilityBackButton()
  }, [channelName])

  useEffect(() => {
    setIsPlayer(history.location.pathname.includes('player') ? true : false)
    toggleTitle()
  }, [titles, channelName])

  useEffect(() => {
    if (isPlayer) toggleFavoritesIcon()
  })

  useEffect(() => {
    const listen = history.listen(() => {
      setIsPlayer(history.location.pathname.includes('player') ? true : false)
      toggleVisibilityBackButton()
      toggleTitle()
      if (isPlayer) toggleFavoritesIcon()
    })
    return listen
  })

  

  return (
    <header className="header container" ref={ref}>
      <div className="header__back-button" onClick={goBack} ref={backButton}>{'<'}</div>
      <div className="header__title">{title}</div>
      {StarIcon && isPlayer && (
        <div className="header__favorite" ref={favoriteButton} onClick={addFavorites}>
          <StarIcon className="header__favorite-icon" />
        </div>
      )}
    </header>
  )
})