import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../store/store'
import { EpgList } from './EpgList'

describe('EpgList', () => {
  const channelId = 1
  
  it('Epg renders', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EpgList channelId={channelId} />
        </BrowserRouter>
      </Provider>
    )

    expect(screen.getByRole('link')).toBeInTheDocument()
  })
})