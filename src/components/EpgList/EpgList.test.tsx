import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../store/store'
import { EpgList } from './EpgList'

describe('EpgList', () => {
  const channelId = 1
  
  it('should render a link element', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EpgList channelId={channelId} />
        </BrowserRouter>
      </Provider>
    )

    expect(screen.getByRole('link')).toBeInTheDocument()
  })  

  it('should render a message when there is no epg', () => {
    const channel = { id: 1, name: 'Channel 1', epg: [] }

    render(
      <Provider store={store}>
        <BrowserRouter>
          <EpgList channelId={channel.id} />
        </BrowserRouter>
      </Provider>
    )

    expect(screen.getByText('Программа передач для этого канала отсутствует')).toBeInTheDocument()
  })
})
