import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../store/store'
import { TabsItem } from './TabsItem'

describe('TabsItem', () => {
  const path = 'string'
  const icon = 'string'
  const label = 'string'
  
  it('TabsItem renders', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <TabsItem
            path={path}
            icon={icon}
            label={label}
          />
        </BrowserRouter>
      </Provider>
    )
    
    expect(container).not.toBeEmptyDOMElement()
  })

  it('TabsItem has correct Link component', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <TabsItem
            path={path}
            icon={icon}
            label={label}
          />
        </BrowserRouter>
      </Provider>
    )
    
    const link = container.querySelector('a.tabs-item')
    expect(link).toHaveAttribute('/href', path)
  
    const iconElement = link?.querySelector(`.tabs-item__icon--${icon}`)
    expect(iconElement).toBeInTheDocument()
  
    const labelElement = link?.querySelector('.tabs-item__label')
    expect(labelElement?.textContent).toBe(label)
  })
})