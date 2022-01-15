import { memo, VFC } from 'react'

type Props = {
  count: number
  handleSetCount: () => void
}

const Counter: VFC<Props> = memo(({ count, handleSetCount }) => {
  console.log('--- Counter ---')

  return (
    <>
      <div>
        count: {count}
        <button onClick={handleSetCount}>count up!</button>
      </div>
    </>
  )
})

export default Counter
