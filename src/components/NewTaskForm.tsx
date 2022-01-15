import { ChangeEvent, memo, VFC } from 'react'

type Props = {
  newTask: string
  handleChangeNewTask: (e: ChangeEvent<HTMLInputElement>) => void
  addTask: () => void
}

const NewTaskForm: VFC<Props> = memo(
  ({ newTask, handleChangeNewTask, addTask }) => {
    console.log('--- newTaskForm ---')

    return (
      <>
        <h2>新規タスク追加</h2>
        <input value={newTask} onChange={handleChangeNewTask} />
        <button onClick={addTask}>追加</button>
      </>
    )
  },
)

export default NewTaskForm
