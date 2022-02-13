import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks'
import './CategoriesItem.scss'

interface CategoriesItemProps {
  playlist: string
  name: string
  icon: string
}

export const CategoriesItem: FC<CategoriesItemProps> = ({ playlist, name, icon }) => {
  const urlTvChannels = useAppSelector(state => state['tv-channels'].url)

  return (
    <Link to={`genres/${urlTvChannels}/${playlist}/`} className="categories-item grid-item">
      <div className="categories-item__content grid-item__content">
        <img className="categories-item__img" src={icon} alt="icon" />
        <div className="categories-item__label">{name}</div>
      </div>
    </Link>
  )
}
