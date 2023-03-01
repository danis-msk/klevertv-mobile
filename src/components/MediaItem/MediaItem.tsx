import { FC } from 'react'
import { EpgList } from '../EpgList/EpgList'
import './MediaItem.scss'

export interface Channel {
  id: number
  channel_id: number
  age_limit: number
  name: string
  mrl: string
  is_blocked: boolean
  is_subscribed: boolean
  mime_type: string
  timeshift_archive_length: string
  timeshift_url: string
  logo: string
  epg: object
}

interface MediaItemProps {
  channel: Channel
}

export const MediaItem: FC<MediaItemProps> = ({ channel }) => (
  <div className="media-item" data-channel-id={channel.id} data-testid="media-item">
    <div className="media-item__header">
      <div className="media-item__header-icon">
        <img src={channel.logo} alt="icon" />
      </div>
      <h3 className="media-item__header-title">{channel.name}</h3>
    </div>
    <div className="media-item__body">
      <EpgList channelId={channel.id} />
    </div>
  </div>
)
