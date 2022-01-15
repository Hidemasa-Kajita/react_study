// ASK: 汎用コンポーネントの型定義どうすれば良いの？

import { ChangeEvent, memo, VFC } from 'react'

type ListItem<T> = {
  id: number
  name: T extends string | number ? T : ''
}

type Props<T> = {
  listItems: ListItem<T>[]
  handleChangeStatus: (e: ChangeEvent<HTMLSelectElement>) => void
}

const DropDown = <T,>({ listItems, handleChangeStatus }: Props<T>) => {
  console.log('--- DropDown ---')

  return (
    <>
      変更ステータス:
      <select onChange={handleChangeStatus}>
        {listItems.map((listItem) => (
          <option key={listItem.id} value={listItem.name}>
            {listItem.name}
          </option>
        ))}
      </select>
    </>
  )
}

export default DropDown
