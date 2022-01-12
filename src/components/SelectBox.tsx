// ASK: 汎用コンポーネントの型定義どうすれば良いの？

import { ChangeEvent } from 'react'

type ListItem<T> = {
  id: number
  name: T extends string | number ? T : ''
}

type Props<T> = {
  statuses: ListItem<T>[]
  handleChangeStatus: (e: ChangeEvent<HTMLSelectElement>) => void
}

const SelectBox = <T,>({ statuses, handleChangeStatus }: Props<T>) => {
  console.log('--- SelectBox ---')

  return (
    <>
      変更ステータス:
      <select onChange={handleChangeStatus}>
        {statuses.map((status) => (
          <option key={status.id} value={status.name}>
            {status.name}
          </option>
        ))}
      </select>
    </>
  )
}

export default SelectBox
