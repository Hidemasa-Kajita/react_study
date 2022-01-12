import { ChangeEvent, useEffect, useState, VFC } from 'react'
import './App.css'
import { STATUS, Status } from 'const/status'
import { Task } from 'types/task'
import { TaskStatus } from 'types/taskStatus'
import { api, isErrorResponse } from 'utils/api'
import NewTaskForm from 'components/NewTaskForm'
import TaskList from 'components/TaskList'
import SelectBox from 'components/SelectBox'

const App: VFC = () => {
  console.log('--- App ---')

  const [todo, setTodo] = useState<Task[]>([])
  const [statuses, setStatuses] = useState<TaskStatus[]>([])
  const [updateStatus, setUpdateStatus] = useState<Status>(STATUS.PENDING)
  const [newTask, setNewTask] = useState('')

  const getTodo = async () => {
    const response = await api.todo.getTodo()

    if (isErrorResponse(response)) {
      // どっか飛ばしたいね
      return
    }

    setTodo(() => response)
  }

  const getStatuses = async () => {
    const response = await api.statuses.getStatuses()

    if (isErrorResponse(response)) {
      // どっか飛ばしたいね
      return
    }

    setStatuses(() => response)
  }

  useEffect(() => {
    getStatuses()
    getTodo()
  }, [])

  const handleChangeNewTask = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(() => e.target.value)
  }

  const handleChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setUpdateStatus(() => e.target.value as Status)
  }

  const addTask = async () => {
    const response = await api.todo.postTodo(newTask)

    if (isErrorResponse(response)) {
      // どっか飛ばしたいね
      return
    }

    setTodo((prev) => [...prev, response])
    setNewTask(() => '')
  }

  const changeStatus = async (id: number, name: string) => {
    await api.todo.putTodo(id, name, updateStatus)

    getTodo()
  }

  const deleteTask = async (id: number) => {
    await api.todo.deleteTodo(id)

    getTodo()
  }

  return (
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
}

export default App
