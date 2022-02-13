import { FC, memo, useRef } from 'react'
import { MediaItem } from '../MediaItem/MediaItem'
import './MediaList.scss'

interface MediaListProps {
  channels: object[]
  genre?: string
}

export const MediaList: FC<MediaListProps> = memo(({ channels }) => {
  const activeItem = useRef<any>(null)

  const toggleActiveMediaItem = (e: React.MouseEvent): void => {
    const eTarget = e.target as Element
    if (!eTarget.closest('.media-item__header')) return
    const targetMediaItem = eTarget.closest('.media-item')
    activeItem.current?.classList.remove('active')
    if (activeItem.current !== targetMediaItem) {
      targetMediaItem?.classList.add('active')
    }
    activeItem.current = activeItem.current === targetMediaItem ? null : targetMediaItem
  }

  return (
    <div className="media-list" onClick={toggleActiveMediaItem}>
      {channels.map((channel: any) => (
        <MediaItem channel={channel} key={channel.id} />
      ))}
    </div>
  )
})