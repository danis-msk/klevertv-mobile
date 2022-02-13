import { FC } from 'react'
import { CategoriesItem } from '../CategoriesItem/CategoriesItem'
import './CategoriesList.scss'

interface category {
  id: number
  playlist: string
  name: string
  icon: string
  items: number[]
}

interface CategoriesProps {
  categories: category[]
}

export const CategoriesList: FC<CategoriesProps> = ({ categories }) => (
  <div className="categories container">
    {categories.map(cat => 
      <CategoriesItem
        playlist={cat.playlist}
        name={cat.name}
        icon={cat.icon}
        key={cat.icon + Math.random()}
      />
    )}
  </div>
)