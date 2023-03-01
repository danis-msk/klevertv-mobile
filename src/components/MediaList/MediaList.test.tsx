import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../store/store'
import { MediaList } from './MediaList'

describe('MediaList', () => {
  const channels = [{ id: 1, name: 'channel1' }, { id: 2, name: 'channel2' }]
  const genre = 'string'

  it('MediaList renders', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <MediaList channels={channels} genre={genre} />
        </BrowserRouter>
      </Provider>
    )
    expect(container).not.toBeEmptyDOMElement()
  })

  it('should render the correct number of MediaItems', () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <MediaList channels={channels} genre={genre} />
        </BrowserRouter>
      </Provider>
    )
    const mediaItems = getAllByTestId('media-item')
    expect(mediaItems).toHaveLength(channels.length)
  })
})
