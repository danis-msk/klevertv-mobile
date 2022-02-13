import { FC, useEffect, useState } from 'react'
import { MediaList } from '../components/MediaList/MediaList'
import { useAppSelector } from '../hooks'

interface GenresProps {
  match: any
}

export const Genres: FC<GenresProps> = ({ match }) => {
  const { section, genre } = match.params
  const channelsAll = useAppSelector(state => state['tv-channels'].channels)
  const [channels, setChannels] = useState([])
  const categories = useAppSelector((state: any) => state[section].categories)
  
  useEffect(() => {
    const categoriesEmpty = !Object.keys(categories).length
    if (categoriesEmpty) return
    const categoryItems = categories[genre].items
    const channelsTemp = categoryItems?.map((item: any) => channelsAll[item])
    setChannels(channelsTemp)
  }, [categories])

  return (
    <MediaList channels={channels} genre={genre} />
  )
}