import { FC, useEffect, useState } from 'react'
import { MediaList } from '../components/MediaList/MediaList'
import { useAppSelector } from '../hooks'
import { useParams } from 'react-router-dom'

interface GenresParams {
  section: string
  genre: string
}

const Genres: FC = () => {
  const { section, genre } = useParams<GenresParams>()
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

export default Genres