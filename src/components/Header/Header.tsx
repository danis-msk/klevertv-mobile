import { forwardRef, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setFavorites } from '../../store/tv/action'
import './Header.scss'
import _ from 'lodash'

interface HeaderProps {
  categoryTitles: any
  favoriteIcons: any
}

export const Header = forwardRef<HTMLElement, HeaderProps>(({ categoryTitles, favoriteIcons }, ref) => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { FavoriteIconEmpty, FavoriteIconFilled } = favoriteIcons

  let favorites = useAppSelector((state) => state['tv-channels'].favorites)
  const channelId = useAppSelector((state) => state['tv-channels'].idChannelPlayingNow) || ''
  const channelName = useAppSelector((state) => state['tv-channels'].channels[channelId]?.name) || ''

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
      for (let key in categoryTitles) {
        if (history.location.pathname.includes(key)) title = categoryTitles[key]
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
    dispatch(setFavorites(_.uniq(favorites)))
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
  }, [categoryTitles, channelName])
  
  useEffect(() => {
    if (isPlayer) toggleFavoritesIcon()
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

export default Header
      
      
      
      