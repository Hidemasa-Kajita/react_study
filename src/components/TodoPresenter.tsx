// import { Status } from 'const/status'
import { ChangeEvent, memo, useMemo, VFC } from 'react'
import { Task } from 'types/task'
import { TaskStatus } from 'types/taskStatus'
import NewTaskForm from './NewTaskForm'
import DropDown from './DropDown'
import SubTitle from './SubTitle'
import TaskList from './TaskList'
import Title from './Title'
import Counter from './Counter'
import { Status } from 'const/status'

type Props = {
  todo: Task[]
  newTask: string
  statuses: TaskStatus[]
  count: number
  handleChangeNewTask: (e: ChangeEvent<HTMLInputElement>) => void
  handleChangeStatus: (e: ChangeEvent<HTMLSelectElement>) => void
  handleSetCount: () => void
  changeStatus: (id: number, name: string) => void
  addTask: () => void
  deleteTask: (id: number) => void
}

const TodoPresenter: VFC<Props> = memo(
  ({
    todo,
    newTask,
    statuses,
    count,
    handleChangeNewTask,
    handleChangeStatus,
    changeStatus,
    addTask,
    deleteTask,
    handleSetCount,
  }) => {
    console.log('--- TodoPresenter ---')

    const statusDropDown = useMemo(
      () => (
        <DropDown<Status>
          listItems={statuses}
          handleChangeStatus={handleChangeStatus}
        />
      ),
      [statuses],
    )

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
          {statusDropDown}
          <TaskList
            todo={todo}
            changeStatus={changeStatus}
            deleteTask={deleteTask}
          />
        </div>
        <div>
          <Counter count={count} handleSetCount={handleSetCount} />
        </div>
      </div>
    )
  },
)

export default TodoPresenter
