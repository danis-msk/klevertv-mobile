import React, { FC, useEffect, useRef, useState } from 'react'
import { MediaList } from '../components/MediaList/MediaList'
import { useAppSelector } from '../hooks'
import { throttle } from '../api/func'

const Search: FC = () => {
  const channelsAll = useAppSelector(state => state['tv-channels'].channels)
  const [channels, setChannels] = useState<object[]>([])
  const searchInput = useRef<HTMLInputElement>(null)

  const channelsFilter = (e: React.FormEvent<HTMLInputElement>) => {
    setChannels([])
    const eTarget = e.target as HTMLInputElement
    const channelsForState = Object.values(channelsAll).filter(
      chan => chan && chan.name && chan.name.toUpperCase().startsWith(eTarget.value.toUpperCase())
    )
    setChannels(eTarget.value ? channelsForState : [])
  }

  useEffect(() => {
    searchInput.current?.addEventListener(
      'input',
      throttle(channelsFilter, 1000)
    )

    return () => {
      searchInput.current?.removeEventListener(
        'input',
        throttle(channelsFilter, 1000)
      )
    }
  }, [channelsAll])

  return (
    <div className="search">
      <input
        type="text"
        className="search__input"
        maxLength={20}
        placeholder="Введите название канала"
        ref={searchInput}
      />
      <MediaList channels={channels} />
    </div>
  )
}


export default Search