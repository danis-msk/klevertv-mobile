import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../store/store'
import { Tabs } from './Tabs'

describe('Tabs', () => {
  const pages = [
    {
      label: 'Label 1',
      path: '/path-1',
      icon: 'icon-1',
    },
    {
      label: 'Label 2',
      path: '/path-2',
      icon: 'icon-2',
    },
  ]

  it('Tabs renders', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Tabs pages={pages} />
        </BrowserRouter>
      </Provider>
    )

    expect(container).not.toBeEmptyDOMElement()
  })

  it('Toggles active tab item', () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Tabs pages={pages} />
        </BrowserRouter>
      </Provider>
    )

    const tabItems = getAllByTestId('tabs-item')
    fireEvent.click(tabItems[0])
    expect(tabItems[0]).toHaveClass('active')
    expect(tabItems[1]).not.toHaveClass('active')

    fireEvent.click(tabItems[1])
    expect(tabItems[0]).not.toHaveClass('active')
    expect(tabItems[1]).toHaveClass('active')
  })
})
