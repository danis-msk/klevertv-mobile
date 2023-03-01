import { FC, memo, useCallback, useMemo, useRef } from 'react'
import { MediaItem } from '../MediaItem/MediaItem'
import './MediaList.scss'

interface MediaListProps {
  channels: any[]
  genre?: string
}

export const MediaList: FC<MediaListProps> = memo(({ channels }) => {
  const activeItem = useRef<HTMLElement | null>(null)

  const toggleActiveMediaItem = useCallback((e: React.MouseEvent): void => {
    const eTarget = e.target as Element
    if (!eTarget.closest('.media-item__header')) return
    const targetMediaItem = eTarget.closest('.media-item') as HTMLElement | null
    if (!targetMediaItem) return
    activeItem.current?.classList.remove('active')
    targetMediaItem.classList.add('active')
    activeItem.current = activeItem.current === targetMediaItem ? null : targetMediaItem
  }, [])

  const mediaItemList = useMemo(() => {
    return channels.map((channel: any) => (
      <MediaItem channel={channel} key={channel.id + channel.name} />
    ))
  }, [channels])

  return (
    <div className="media-list" onClick={toggleActiveMediaItem}>
      {mediaItemList}
    </div>
  )
})
