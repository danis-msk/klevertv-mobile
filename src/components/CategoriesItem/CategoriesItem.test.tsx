import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../store/store'
import { CategoriesItem } from './CategoriesItem'

describe('CategoriesItem', () => {
  const playlist = 'playlist'
  const name = 'name'
  const icon = 'icon'

  it('CategoriesItem renders', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CategoriesItem playlist={playlist} name={name} icon={icon} />
        </BrowserRouter>
      </Provider>
    )
    
    expect(screen.getByRole('link')).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})