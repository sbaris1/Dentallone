import { getDictionary } from './dictionaries'

export default async function Home({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  return (
    <div>
      <h1>{dict.common.welcome}</h1>
      <div className="actions">
        <a href={`/${params.lang}/login`}>{dict.common.login}</a>
        <a href={`/${params.lang}/dashboard`}>{dict.common.dashboard}</a>
      </div>
    </div>
  )
}