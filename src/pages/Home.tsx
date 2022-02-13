import { FC } from 'react'
import { CategoriesList } from '../components/CategoriesList/CategoriesList'

interface HomeProps {
  categoriesArr: any
}

export const Home: FC<HomeProps> = ({ categoriesArr }) => {
  const sectionTitles = [
    {
      id: 1,
      title: 'Телеканалы',
    }
  ]

  return (
    <>
      {sectionTitles.map(title => (
        <section key={title.id}>
          <div className="section-title container">{title.title}</div>
          <CategoriesList categories={categoriesArr} />
        </section>
      ))}
    </>
  )
}