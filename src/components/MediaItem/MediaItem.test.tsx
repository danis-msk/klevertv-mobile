import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../store/store'
import { MediaItem } from './MediaItem'

describe('MediaItem', () => {
  const channel = {
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
    epg: {}
  }

  it('MediaItem renders', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <MediaItem channel={channel} />
        </BrowserRouter>
      </Provider>
    )
    
    expect(container).not.toBeEmptyDOMElement()
  })
})