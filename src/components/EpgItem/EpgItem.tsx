import { FC, useEffect, useState } from 'react'
import './EpgItem.scss'

interface EpgItemProps {
  epg: {
    start_ts: number
    stop_ts: number
    title: string
  }
  epgItemId: number
}

export const EpgItem: FC<EpgItemProps> = ({ epg, epgItemId }) => {
  const hour = new Date(epg.start_ts * 1000).getHours()
  const min = new Date(epg.start_ts * 1000).getMinutes()
  const formatTime = (val: number) => val > 9 ? val : '0' + val
  const time = formatTime(hour) + ':' + formatTime(min)
  const [classesEpgItem, setClassesEpgItem] = useState(['epg-item'])

  useEffect(() => {
    if (epg.start_ts * 1000 < Date.now() && epg.stop_ts * 1000 > Date.now()) {
      setClassesEpgItem(prev => [...prev, 'play-now'])
    }
  }, [epg.start_ts])

  return (
    <div data-id={epgItemId} className={classesEpgItem.join(' ')}>
      <div className="epg-item__time">{time}</div>
      <div className="epg-item__title">{epg.title}</div>
    </div>
  )
}