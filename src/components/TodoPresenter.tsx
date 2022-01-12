import { Status } from 'const/status'
import { ChangeEvent, VFC } from 'react'
import { Task } from 'types/task'
import { TaskStatus } from 'types/taskStatus'
import NewTaskForm from './NewTaskForm'
import SelectBox from './SelectBox'
import SubTitle from './SubTitle'
import TaskList from './TaskList'
import Title from './Title'

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
}) => {
  console.log('--- TodoPresenter ---')

  return (
    <div>
      <Title />
      <div>
        <NewTaskForm
          newTask={newTask}
          handleChangeNewTask={handleChangeNewTask}
          addTask={addTask}
        />
      </div>
      <div>
        <SubTitle title="タスクリスト" />
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
}

export default TodoPresenter
