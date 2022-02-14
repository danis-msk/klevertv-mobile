import React, { forwardRef, useEffect, useRef } from 'react'
import { TabsItem } from '../TabsItem/TabsItem'
import './Tabs.scss'

interface TabsProps {
  pages: Page[]
}

interface Page {
  label: string
  path: string
  icon: string
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(({ pages }, ref) => {
  const tabsItemsRef = useRef<HTMLAnchorElement[]>([])

  useEffect(() => {
    tabsItemsRef.current = tabsItemsRef.current.slice(0, pages.length)
  }, [pages])

  const toggleActiveTabsItem = (e: React.MouseEvent): void => {
    const targetTabsItem = (e.target as Element).closest('.tabs-item')
    tabsItemsRef.current.forEach((item: HTMLAnchorElement) => {
      if (targetTabsItem !== item) {
        item.classList.remove('active')
      } else {
        item.classList.add('active')
      }
    })
  }

  return (
    <div className="tabs" ref={ref} onClick={toggleActiveTabsItem}>
      {pages.map((page: any, i: number) => (
        <TabsItem
          ref={(el: HTMLAnchorElement) => tabsItemsRef.current[i] = el}
          path={page.path}
          icon={page.icon}
          label={page.label}
          key={page.path}
        />
      ))}
    </div>
  )
})