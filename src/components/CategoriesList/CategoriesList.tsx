import { FC } from 'react'
import { CategoriesItem } from '../CategoriesItem/CategoriesItem'
import './CategoriesList.scss'
import { Category } from '../../store/tv/state'

interface CategoriesProps {
  categories: Category[]
}

export const CategoriesList: FC<CategoriesProps> = ({ categories }) => (
  <div className="categories container">
    {categories.map(cat => 
      <CategoriesItem
        playlist={cat.playlist}
        name={cat.name}
        icon={cat.icon}
        key={cat.icon + cat.name}
      />
    )}
  </div>
)