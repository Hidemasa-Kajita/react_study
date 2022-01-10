import { ChangeEvent, useEffect, useState, VFC } from 'react'
import './App.css'
import { STATUS, Status } from 'const/status'
import { Task } from 'types/task'
import { TaskStatus } from 'types/taskStatus'
import { api, isErrorResponse } from 'utils/api'

const App: VFC = () => {
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
        <h2>新規タスク追加</h2>
        <input value={newTask} onChange={handleChangeNewTask} />
        <button onClick={addTask}>追加</button>
      </div>
      <div>
        <h2>タスクリスト</h2>
        変更ステータス:
        <select onChange={handleChangeStatus}>
          {statuses.map((status) => (
            <option key={status.id} value={status.name}>
              {status.name}
            </option>
          ))}
        </select>
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
      </div>
    </div>
  )
}

export default App
