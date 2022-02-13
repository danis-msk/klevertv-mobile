import { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { EpgItem } from '../EpgItem/EpgItem'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { getEpg } from '../../store/tv/action'
import './EpgList.scss'

interface EpgListProps {
  channelId: number
}

export const EpgList: FC<EpgListProps> = ({ channelId }) => {
  const epg = useAppSelector(state => state['tv-channels'].channels[channelId].epg)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getEpg(channelId))
  }, [])

  return (
    <Link to={`/player/${channelId}`} className="epg-list">
      {!epg.length && <div className="epg-list__no-epg">Программа передач для этого канала отсутствует</div> ||

      epg.map((epgItem: any, i: number) => (epgItem.stop_ts * 1000 < Date.now()) && 
        <EpgItem 
          epg={epgItem} 
          epgItemId={i} 
          key={epgItem.start_ts+epgItem.title} 
        />
      )}
    </Link>
  )
}