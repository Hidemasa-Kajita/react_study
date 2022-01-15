// ASK: useCallback, useMemo の使い方

import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { STATUS, Status } from 'const/status'
import { Task } from 'types/task'
import { TaskStatus } from 'types/taskStatus'
import { api, isErrorResponse } from 'utils/api'

export const useTask = () => {
  const [todo, setTodo] = useState<Task[]>([])
  const [statuses, setStatuses] = useState<TaskStatus[]>([])
  const [updateStatus, setUpdateStatus] = useState<Status>(STATUS.PENDING)
  const [newTask, setNewTask] = useState('')
  const [count, setCount] = useState(0)

  const getTodo = async (): Promise<void> => {
    const response = await api.todo.getTodo()

    if (isErrorResponse(response)) {
      // どっか飛ばしたいね
      return
    }

    setTodo(() => response)
  }

  const getStatuses = async (): Promise<void> => {
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

  const handleSetCount = useCallback(() => setCount((pre) => pre + 1), [])

  const handleChangeNewTask = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setNewTask(() => e.target.value)
    },
    [],
  )

  const handleChangeStatus = useCallback(
    (e: ChangeEvent<HTMLSelectElement>): void => {
      setUpdateStatus(() => e.target.value as Status)
    },
    [],
  )

  const addTask = useCallback(async (): Promise<void> => {
    const response = await api.todo.postTodo(newTask)

    if (isErrorResponse(response)) {
      // どっか飛ばしたいね
      return
    }

    setTodo((prev) => [...prev, response])
    setNewTask(() => '')
  }, [newTask])

  const changeStatus = useCallback(
    async (id: number, name: string): Promise<void> => {
      await api.todo.putTodo(id, name, updateStatus)

      getTodo()
    },
    [updateStatus],
  )

  const deleteTask = useCallback(async (id: number): Promise<void> => {
    await api.todo.deleteTodo(id)

    getTodo()
  }, [])

  return [
    { todo, newTask, statuses, count },
    {
      handleChangeNewTask,
      handleChangeStatus,
      addTask,
      changeStatus,
      deleteTask,
      handleSetCount,
    },
  ] as const
}
