import { render } from '@testing-library/react'
import { MediaItem, Channel } from './MediaItem'

const channel: Channel = {
  id: 1,
  channel_id: 1,
  age_limit: 1,
  name: 'string',
  mrl: 'string',
  is_blocked: true,
  is_subscribed: true,
  mime_type: 'string',
  timeshift_archive_length: 'string',
  timeshift_url: 'string',
  logo: 'string',
  epg: {},
}

describe('MediaItem', () => {
  it('should render channel logo and name', () => {
    const { getByAltText, getByText } = render(<MediaItem channel={channel} />)
    const logo = getByAltText('icon')
    const name = getByText(channel.name)

    expect(logo).toBeInTheDocument()
    expect(name).toBeInTheDocument()
  })

  it('should render EpgList', () => {
    const { getByTestId } = render(<MediaItem channel={channel} />)
    const epgList = getByTestId('epg-list')

    expect(epgList).toBeInTheDocument()
  })

  it('should have data-channel-id attribute equal to channel id', () => {
    const { container } = render(<MediaItem channel={channel} />)
    const mediaItem = container.firstChild as HTMLElement

    expect(mediaItem).toHaveAttribute('data-channel-id', channel.id.toString())
  })
})
