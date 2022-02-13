import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../store/store'
import { App } from './App'

describe('App', () => {
  it('App renders', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    )
    
    expect(container).not.toBeEmptyDOMElement()
  })
})