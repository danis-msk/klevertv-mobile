import { FC, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { Redirect, Route } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'

import { Home } from '../../pages/Home'
import { Favorites } from '../../pages/Favorites'
import { Search } from '../../pages/Search'
import { Account } from '../../pages/Account'
import { Login } from '../../pages/Login'
import { Genres } from '../../pages/Genres'

import { Header } from '../Header/Header'
import { Tabs } from '../Tabs/Tabs'
import { Player } from '../Player/Player'

import { loadUserData } from '../../store/user/action'
import { getPlaylists } from '../../store/tv/action'

import { ReactComponent as FavoriteIconEmpty } from '../../assets/img/icons/star.svg'
import { ReactComponent as FavoriteIconFilled } from '../../assets/img/icons/star-fill.svg'

import { SESSION_ID } from '../../api/request'

import './App.scss'


export const App: FC = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()

  const appRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  const userLoaded = useAppSelector(state => state.user.loaded)
  const tvLoaded = useAppSelector(state => state['tv-channels'].loaded)
  const categoriesArr = useAppSelector(state => state['tv-channels'].categoriesArr)

  const [titles, setTitles] = useState({})

  interface Page {
    label: string
    href: string
    icon: string
  }

  const pages: Page[] = [
    {
      label: 'Главная',
      href: '/home',
      icon: 'home',
    }, {
      label: 'Избранное',
      href: '/favorites',
      icon: 'favorites',
    }, {
      label: 'Поиск',
      href: '/search',
      icon: 'search',
    }, {
      label: 'Аккаунт',
      href: '/account',
      icon: 'account',
    },
  ]

  useEffect(() => {
    dispatch(loadUserData())
  }, [])

  // наполнить массив заголовков - для страниц категорий тв
  useEffect(() => {
    if (!tvLoaded) return
    const titles: {[key: string]: string} = {}
    categoriesArr.forEach(cat => {
      titles[cat.playlist] = cat.name
    })
    setTitles(titles)
  }, [tvLoaded])

  // если пользователь авторизован ( SESSION_ID !== null ) получить контент, иначе показать окно регистрации
  useEffect(() => {
    if (!userLoaded) return
    if (SESSION_ID) {
      dispatch(getPlaylists())
    } else {
      history.push('/login')
    }
  }, [userLoaded])

  if (!SESSION_ID) {
    return (
      <div className="App">
        <Route path="/login" component={Login} exact />
      </div>
    )
  }


  return (
    <div className="App" ref={appRef}>
      <Header ref={headerRef} titles={titles} FavoriteIconEmpty={FavoriteIconEmpty} FavoriteIconFilled={FavoriteIconFilled} />

      <main className="content">
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/login" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={(props: any) => <Home {...props} categoriesArr={categoriesArr} />} exact />
        <Route path="/genres/:section/:genre" component={Genres} exact />
        <Route path="/favorites" component={Favorites} exact />
        <Route path="/search" component={Search} exact />
        <Route path="/account" component={Account} exact />
        <Route path="/player/:channelId" component={(props: any) => <Player {...props} categoriesArr={categoriesArr} appRef={appRef.current} headerRef={headerRef.current} tabsRef={tabsRef.current} />} exact />
      </main>
      <Tabs ref={tabsRef} pages={pages} />
    </div>
  )
}