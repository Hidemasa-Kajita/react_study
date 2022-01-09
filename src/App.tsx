import { ChangeEvent, useEffect, useState, VFC } from 'react'
import './App.css'
import axios from 'axios'

const STATUS = {
  PENDING: 'pending',
  DONE: 'done',
  PROGRESS: 'progress',
  EXPIRED: 'expired',
} as const

type Status = typeof STATUS[keyof typeof STATUS]

type TodoStatus = {
  id: number
  name: Status
}

type Todo = {
  id: number
  name: string
  status: Status
}

const App: VFC = () => {
  const [todo, setTodo] = useState<Todo[]>([])
  const [statuses, setStatuses] = useState<TodoStatus[]>([])
  const [updateStatus, setUpdateStatus] = useState<Status>(STATUS.PENDING)
  const [newTask, setNewTask] = useState('')

  const getTodo = async () => {
    const response = await axios.get<Todo[]>('http://localhost:3001/todo')

    setTodo(() => response.data)
  }

  const getStatuses = async () => {
    const response = await axios.get<TodoStatus[]>(
      'http://localhost:3001/statuses',
    )
    setStatuses(() => response.data)
  }

  useEffect(() => {
    getStatuses()
    getTodo()
  }, [])

  const handleChangeNewTask = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(() => e.target.value)
  }

  const addTask = async () => {
    const response = await axios.post<Todo>('http://localhost:3001/todo', {
      name: newTask,
      status: STATUS.PENDING,
    })

    setTodo((prev) => [...prev, response.data])
  }

  const changeStatus = async (task: Todo) => {
    await axios.put<Todo>(`http://localhost:3001/todo/${task.id}`, {
      name: task.name,
      status: updateStatus,
    })

    getTodo()
  }

  const handleChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setUpdateStatus(() => e.target.value as Status)
  }

  const deleteTask = async (id: number) => {
    await axios.delete<Todo>(`http://localhost:3001/todo/${id}`)

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
              <button onClick={() => changeStatus(task)}>更新</button>
              <button onClick={() => deleteTask(task.id)}>削除</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
