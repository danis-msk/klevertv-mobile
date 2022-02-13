import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../store/store'
import { CategoriesList } from './CategoriesList'

describe('CategoriesList', () => {
  const categories = [
    {
      id: 1,
      playlist: 'string',
      name: 'string',
      icon: 'string',
      items: [1, 2, 3],
    }
  ]
  
  it('Links renders', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CategoriesList categories={categories} />
        </BrowserRouter>
      </Provider>
    )

    expect(container).not.toBeEmptyDOMElement()
  })
})