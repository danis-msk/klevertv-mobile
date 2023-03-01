import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../store/store'
import { App } from './App'

describe('App', () => {
  it('renders App component', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    )
    expect(container).toBeInTheDocument()
  })

  it('redirects to login page if user is not authenticated', async () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    )
    expect(window.location.pathname).toBe('/login')
  })

  it('displays header with titles and icons when user is authenticated', async () => {
    jest.spyOn(store.getState().user, 'loaded', 'get').mockReturnValue(true)
    jest.spyOn(store.getState()['tv-channels'], 'loaded', 'get').mockReturnValue(true)
    jest.spyOn(store.getState()['tv-channels'], 'categoryArr', 'get').mockReturnValue([
      {
        icon: 'http://go.commpass.tv/mobile-icons/groups/tv-movie.png',
        id: 15,
        items: [6648, 6519, 6649],
        name: 'Кино',
        playlist: 'tv-movie'
      }, {
        icon: 'http://go.commpass.tv/mobile-icons/groups/tv-discovery.png',
        id: 15,
        items: [5382, 5767],
        name: 'Познавательные',
        playlist: 'tv-discovery'
      }
    ])

    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    )

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()

    const titles = screen.getAllByRole('heading', { level: 1 })
    expect(titles).toHaveLength(2)
    expect(titles[0]).toHaveTextContent('Кино')
    expect(titles[1]).toHaveTextContent('Познавательные')

    const icons = screen.getAllByRole('img')
    expect(icons).toHaveLength(2)
    expect(icons[0]).toHaveAttribute('src', '/icons/star.svg')
    expect(icons[1]).toHaveAttribute('src', '/icons/star-fill.svg')
  })
})
