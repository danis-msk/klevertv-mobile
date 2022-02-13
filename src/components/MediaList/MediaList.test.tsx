import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../store/store'
import { MediaList } from './MediaList'

describe('MediaList', () => {
  const channels = [{}]
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
})