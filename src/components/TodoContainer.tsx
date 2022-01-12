import { useTask } from 'hooks/useTask'
import { VFC } from 'react'
import TodoPresenter from './TodoPresenter'

const TodoContainer: VFC = () => {
  console.log('------------')
  console.log('--- TodoContainer ---')

  const [
    { todo, newTask, statuses },
    {
      handleChangeNewTask,
      handleChangeStatus,
      addTask,
      changeStatus,
      deleteTask,
    },
  ] = useTask()

  return (
    <TodoPresenter
      todo={todo}
      newTask={newTask}
      statuses={statuses}
      handleChangeNewTask={handleChangeNewTask}
      handleChangeStatus={handleChangeStatus}
      changeStatus={changeStatus}
      addTask={addTask}
      deleteTask={deleteTask}
    />
  )
}

export default TodoContainer
