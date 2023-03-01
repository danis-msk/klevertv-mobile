import { FC, useEffect, useState } from 'react'
import { MediaList } from '../components/MediaList/MediaList'
import { useAppSelector } from '../hooks'

const Favorites: FC = () => {
  const favorites = useAppSelector(state => state['tv-channels'].favorites)
  const channels = useAppSelector(state => state['tv-channels'].channels)
  const [favoriteChannels, setFavoriteChannels] = useState<object[]>([])

  useEffect(() => {
    if (!Object.keys(channels).length || favoriteChannels.length) return
    const mediaIds: object[] = favorites.map(el => channels[el.media_id])
    setFavoriteChannels(mediaIds)
  })

  return (
    <MediaList channels={favoriteChannels} />
  )
}

export default Favorites