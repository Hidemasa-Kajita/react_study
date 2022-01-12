import { Status } from 'const/status'
import { ChangeEvent, VFC } from 'react'
import { Task } from 'types/task'
import { TaskStatus } from 'types/taskStatus'
import NewTaskForm from './NewTaskForm'
import SelectBox from './SelectBox'
import TaskList from './TaskList'

type Props = {
  todo: Task[]
  newTask: string
  statuses: TaskStatus[]
  handleChangeNewTask: (e: ChangeEvent<HTMLInputElement>) => void
  handleChangeStatus: (e: ChangeEvent<HTMLSelectElement>) => void
  changeStatus: (id: number, name: string) => void
  addTask: () => void
  deleteTask: (id: number) => void
}

const TodoPresenter: VFC<Props> = ({
  todo,
  newTask,
  statuses,
  handleChangeNewTask,
  handleChangeStatus,
  changeStatus,
  addTask,
  deleteTask,
}) => (
  <div>
    <h1>todo app</h1>
    <div>
      <NewTaskForm
        newTask={newTask}
        handleChangeNewTask={handleChangeNewTask}
        addTask={addTask}
      />
    </div>
    <div>
      <h2>タスクリスト</h2>
      変更ステータス:
      <SelectBox<Status>
        statuses={statuses}
        handleChangeStatus={handleChangeStatus}
      />
      <TaskList
        todo={todo}
        changeStatus={changeStatus}
        deleteTask={deleteTask}
      />
    </div>
  </div>
)

export default TodoPresenter
