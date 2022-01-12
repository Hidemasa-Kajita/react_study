import { VFC } from 'react'
import { Task } from 'types/task'

type Props = {
  todo: Task[]
  changeStatus: (id: number, name: string) => void
  deleteTask: (id: number) => void
}

const TaskList: VFC<Props> = ({ todo, changeStatus, deleteTask }) => {
  console.log('--- TaskList ---')

  return (
    <>
      <ul>
        {todo.map((task) => (
          <li key={task.id}>
            {task.id}: {task.name}: {task.status}:
            <button onClick={() => changeStatus(task.id, task.name)}>
              更新
            </button>
            <button onClick={() => deleteTask(task.id)}>削除</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TaskList
