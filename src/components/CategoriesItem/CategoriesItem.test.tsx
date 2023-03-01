import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../store/store'
import { CategoriesItem } from './CategoriesItem'

describe('CategoriesItem', () => {
  const playlist = 'playlist'
  const name = 'name'
  const icon = 'icon'

  it('should render name prop', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CategoriesItem playlist={playlist} name={name} icon={icon} />
        </BrowserRouter>
      </Provider>
    )

    expect(screen.getByText(name)).toBeInTheDocument()
  })

  it('should render icon prop', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CategoriesItem playlist={playlist} name={name} icon={icon} />
        </BrowserRouter>
      </Provider>
    )

    expect(screen.getByRole('img', { name: 'icon' })).toHaveAttribute('src', icon)
  })

  it('should have a link with the correct URL', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CategoriesItem playlist={playlist} name={name} icon={icon} />
        </BrowserRouter>
      </Provider>
    )

    const link = screen.getByRole('link')

    expect(link).toHaveAttribute('href', `/genres/${store.getState()['tv-channels'].url}/${playlist}/`)
  })
})
