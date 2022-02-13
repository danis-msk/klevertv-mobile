import { render, screen } from '@testing-library/react'
import { EpgItem } from './EpgItem'

describe('EpgItem', () => {
  const epgItem = {
    start_ts: 1,
    stop_ts: 1,
    title: 'Testing title'
  }
  const epgItemId = 1

  it('Title availability', () => {
    render(
      <EpgItem epg={epgItem} epgItemId={epgItemId}/>
    )
    
    expect(screen.getByText(/Testing title/i)).toBeInTheDocument()
  })
})