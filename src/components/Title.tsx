import { memo, VFC } from 'react'

const Title: VFC = memo(() => {
  console.log('--- Title ---')

  return <h1>todo app!</h1>
})

export default Title
