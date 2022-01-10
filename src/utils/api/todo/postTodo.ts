import { STATUS } from 'const/status'
import { ApiResponse } from 'types/request'
import { Task } from 'types/task'
import { request } from 'utils/request'

export const postTodo = async (name: string): Promise<ApiResponse<Task>> => {
  return await request.post<Task>('/todo', {
    name,
    status: STATUS.PENDING,
  })
}
