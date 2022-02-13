import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../store/store'
import { TabsItem } from './TabsItem'

describe('TabsItem', () => {
  const href = 'string'
  const icon = 'string'
  const label = 'string'
  
  it('TabsItem renders', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <TabsItem
            href={href}
            icon={icon}
            label={label}
          />
        </BrowserRouter>
      </Provider>
    )
    
    expect(container).not.toBeEmptyDOMElement()
  })
})