import { memo, VFC } from 'react'
import useSWR from 'swr'

type Props = {
  title: string
}

const SubTitle: VFC<Props> = memo(({ title }) => {
  console.log('--- SubTitle ---')

  return <h2>{title}</h2>
})

export default SubTitle
