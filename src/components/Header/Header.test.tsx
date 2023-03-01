import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter, useHistory } from 'react-router-dom'
import store from '../../store/store'
import { Header } from './Header'

describe('Header', () => {
  const categoryTitles: any = {
    '/': 'Home',
    '/favorites': 'Favorites',
  }
  const FavoriteIconEmpty = () => <div data-testid="favorite-icon-empty"></div>
  const FavoriteIconFilled = () => <div data-testid="favorite-icon-filled"></div>

  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header categoryTitles={categoryTitles} favoriteIcons={{FavoriteIconEmpty, FavoriteIconFilled}} />
        </BrowserRouter>
      </Provider>
    )
  })

  it('renders the header title', () => {    
    const title = screen.getByRole('heading')
    expect(title).toBeInTheDocument()
    expect(title.textContent).toEqual('Home')
  })

  it('toggles the visibility of the back button', () => {
    const backButton = screen.getByTestId('back-button')
    expect(backButton).toBeInTheDocument()
    expect(backButton).toHaveClass('header__back-button')
    expect(backButton).not.toHaveClass('active')

    userEvent.click(backButton)

    expect(backButton).toHaveClass('active')
  })

  it('toggles the header title based on the current path', () => {
    const title = screen.getByRole('heading')
    expect(title).toBeInTheDocument()
    expect(title.textContent).toEqual('Home')
    const history = useHistory()
    history.push('/favorites')
    expect(title.textContent).toEqual('Favorites')
  })

  it('renders the favorite button', () => {
    expect(screen.queryByTestId('favorite-button')).not.toBeInTheDocument()

    const favoriteButton = screen.getByTestId('favorite-button')
    expect(favoriteButton).toBeInTheDocument()

    const emptyFavoriteIcon = screen.getByTestId('favorite-icon-empty')
    expect(emptyFavoriteIcon).toBeInTheDocument()

    userEvent.click(favoriteButton)

    expect(store.getState()['tv-channels'].favorites).toContainEqual({
      type: 'channel',
      media_id: 123,
      title: 'test',
    })

    expect(screen.getByTestId('favorite-icon-filled')).toBeInTheDocument()
  })
})
