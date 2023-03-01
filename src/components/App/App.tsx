import { FC, useEffect, useRef, useState, lazy, Suspense, useMemo } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { Home } from '../../pages/Home'
import { Header } from '../Header/Header'
import { Tabs } from '../Tabs/Tabs'
import { loadUserData } from '../../store/user/action'
import { getPlaylists } from '../../store/tv/action'
import { ReactComponent as FavoriteIconEmpty } from '../../assets/img/icons/star.svg'
import { ReactComponent as FavoriteIconFilled } from '../../assets/img/icons/star-fill.svg'
import { sessionId } from '../../api/request'
import './App.scss'
const Player = lazy(() => import('../Player/Player'))
const Favorites = lazy(() => import('../../pages/Favorites'))
const Search = lazy(() => import('../../pages/Search'))
const Account = lazy(() => import('../../pages/Account'))
const Login = lazy(() => import('../../pages/Login'))
const Genres = lazy(() => import('../../pages/Genres'))

export interface Page {
  label: string
  path: string
  icon: string
}

export const App: FC = () => {
  const dispatch = useAppDispatch()
  const appRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const userLoaded = useAppSelector(state => state.user.loaded)
  const { loaded: tvLoaded, categoryArr } = useAppSelector(state => state['tv-channels'])
  const [categoryTitles, setCategoryTitles] = useState<Record<string, string>>({})
  const favoriteIcons = useMemo(() => ({
    FavoriteIconEmpty,
    FavoriteIconFilled,
  }), [])
  const spinner = <div className="spinner">Loading...</div>
  
  const pages: Page[] = [
    {
      label: 'Главная',
      path: '/home',
      icon: 'home',
    },
    {
      label: 'Избранное',
      path: '/favorites',
      icon: 'favorites',
    },
    {
      label: 'Поиск',
      path: '/search',
      icon: 'search',
    },
    {
      label: 'Аккаунт',
      path: '/account',
      icon: 'account',
    },
  ]

  useEffect(() => {
    dispatch(loadUserData())
  }, [])

  // set category titles
  useEffect(() => {
    if (!tvLoaded) return
    const categoryTitles: Record<string, string> = {}
    categoryArr.forEach(cat => {
      categoryTitles[cat.playlist] = cat.name
    })
    setCategoryTitles(categoryTitles)
  }, [tvLoaded, categoryArr])

  useEffect(() => {
    if (userLoaded || sessionId) dispatch(getPlaylists())
  }, [userLoaded, sessionId])

  if (!userLoaded) return null

  if (!sessionId) {
    return (
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Redirect to="/login" />
        </Switch>
      </div>
    )
  }

  return (
    <div className="App" ref={appRef}>
      <Header
        ref={headerRef}
        categoryTitles={categoryTitles}
        favoriteIcons={favoriteIcons}
      />

      <main className="content">
        <Switch>
          <Suspense fallback={spinner}>
            <Route path="/home">
              <Home categoryArr={categoryArr} />
            </Route>
            <Route path="/genres/:section/:genre">
              <Genres />
            </Route>
            <Route path="/favorites">
              <Favorites />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/player/:channelId">
              <Player
                appRef={appRef.current}
                headerRef={headerRef.current}
                tabsRef={tabsRef.current}
              />
            </Route>
            <Redirect to="/home" />
          </Suspense>
        </Switch>
      </main>
      <Tabs ref={tabsRef} pages={pages} />
    </div>
  )
}
