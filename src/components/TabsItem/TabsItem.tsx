import { forwardRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import './TabsItem.scss'


interface TabsItemProps {
  label: string
  path: string
  icon: any
}

export const TabsItem = forwardRef<HTMLAnchorElement, TabsItemProps>(({ label, path, icon }, ref) => {
  const history = useHistory()
  const [classesItem, setClassesTabsItem] = useState(['tabs-item'])

  const classesIcon = [
    'tabs-item__icon',
    'tabs-item__icon--' + icon,
  ]

  useEffect(() => {
    if (history.location.pathname.includes(path)) {
      setClassesTabsItem(prev => [...prev, 'active'])
    }
    const listen = history.listen(() => {
      if (history.location.pathname.includes(path)) {
        setClassesTabsItem(prev => [...prev, 'active'])
      }
    })
    return listen
  }, [])

  return (
    <Link className={classesItem.join(' ')} to={path} ref={ref}>
      <div className={classesIcon.join(' ')}></div>
      <div className="tabs-item__label">{label}</div>
    </Link>
  )
})