import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../store/store'
import { Tabs } from './Tabs'

describe('Tabs', () => {
  const pages = [{
    label: 'string',
    href: 'string',
    icon: 'string',
  }]
  
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
})