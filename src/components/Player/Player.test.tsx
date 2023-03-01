import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../store/store'
import Player from './Player'

describe('Player', () => {
  const match = [{}]
  const appRef = { current: 1 }
  const headerRef = { current: 1 }
  const tabsRef = { current: 1 }

  it('Player renders', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Player appRef={appRef.current} headerRef={headerRef.current} tabsRef={tabsRef.current} />
        </BrowserRouter>
      </Provider>
    )
    
    expect(container).not.toBeEmptyDOMElement()
  })
})