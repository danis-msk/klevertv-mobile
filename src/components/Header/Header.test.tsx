import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../store/store'
import { Header } from './Header'

describe('Header', () => {
  const titles: any[] = []
  const FavoriteIconEmpty = HTMLElement
  const FavoriteIconFilled = HTMLElement

  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header titles={titles} FavoriteIconEmpty={FavoriteIconEmpty} FavoriteIconFilled={FavoriteIconFilled} />
        </BrowserRouter>
      </Provider>
    )
  })

  it('Header renders', () => {    
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })
})