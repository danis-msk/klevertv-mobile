import { render, screen } from '@testing-library/react'
import { EpgItem } from './EpgItem'

describe('EpgItem', () => {
  const epgItem = {
    start_ts: Math.floor(Date.now() / 1000) - 60, // 1 minute ago
    stop_ts: Math.floor(Date.now() / 1000) + 60, // 1 minute later
    title: 'Testing title'
  }
  const epgItemId = 1

  it('renders title', () => {
    render(<EpgItem epg={epgItem} epgItemId={epgItemId} />)
    expect(screen.getByText(/Testing title/i)).toBeInTheDocument()
  })

  it('renders the formatted time', () => {
    render(<EpgItem epg={epgItem} epgItemId={epgItemId} />)
    const hour = new Date(epgItem.start_ts * 1000).getHours()
    const min = new Date(epgItem.start_ts * 1000).getMinutes()
    const expectedTime = `${hour > 9 ? hour : '0' + hour}:${min > 9 ? min : '0' + min}`
    expect(screen.getByText(expectedTime)).toBeInTheDocument()
  })
})
