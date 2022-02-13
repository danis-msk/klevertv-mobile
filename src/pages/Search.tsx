import React, { FC, useEffect, useRef, useState } from 'react'
import { MediaList } from '../components/MediaList/MediaList'
import { useAppSelector } from '../hooks'
import { throttle } from '../api/func'

export const Search: FC = () => {
  const channelsAll = useAppSelector(state => state['tv-channels'].channels)
  const [channels, setChannels] = useState<object[]>([])
  const searchInput = useRef<HTMLInputElement>(null)
  const channelsArr: object[] = []

  const channelsFilter = (e: React.FormEvent<HTMLInputElement>) => {
    if (!channelsArr.length) return
    setChannels([])
    const eTarget = e.target as HTMLInputElement
    const channelsForState = channelsArr.map((chan: any) => {
      if (chan.name.toUpperCase().indexOf(eTarget.value.toUpperCase()) === 0) {
        return chan
      }
    })
    if (eTarget.value) {
      setChannels(channelsForState)
    } else {
      setChannels([])
    }
  }

  useEffect(() => {
    searchInput.current?.addEventListener('input', throttle(channelsFilter, 1000))
    return () => {
      searchInput.current?.removeEventListener('input', throttle(channelsFilter, 1000))
    }
  }, [])

  useEffect(() => {
    if (!Object.keys(channelsAll).length || channels.length) return
    Object.keys(channelsAll).forEach(key => {
      channelsArr.push(channelsAll[key])
    })
  }, [])

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
