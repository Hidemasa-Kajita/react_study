import { ChangeEvent, useEffect, useState } from 'react'
import { STATUS, Status } from 'const/status'
import { Task } from 'types/task'
import { TaskStatus } from 'types/taskStatus'
import { api, isErrorResponse } from 'utils/api'

export const useTask = () => {
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

  return [
    { todo, newTask, statuses },
    {
      handleChangeNewTask,
      handleChangeStatus,
      addTask,
      changeStatus,
      deleteTask,
    },
  ] as const
}
