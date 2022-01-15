import { useTask } from 'hooks/useTask'
import { memo, VFC } from 'react'
import TodoPresenter from './TodoPresenter'

const TodoContainer: VFC = memo(() => {
  console.log('------------')
  console.log('--- TodoContainer ---')

  const [
    { todo, newTask, statuses, count },
    {
      handleChangeNewTask,
      handleChangeStatus,
      addTask,
      changeStatus,
      deleteTask,
      handleSetCount,
    },
  ] = useTask()

  return (
    <TodoPresenter
      todo={todo}
      newTask={newTask}
      statuses={statuses}
      count={count}
      handleChangeNewTask={handleChangeNewTask}
      handleChangeStatus={handleChangeStatus}
      handleSetCount={handleSetCount}
      changeStatus={changeStatus}
      addTask={addTask}
      deleteTask={deleteTask}
    />
  )
})

export default TodoContainer
