import { Status } from 'const/status'
import { ApiResponse } from 'types/request'
import { Task } from 'types/task'
import { request } from 'utils/request'

export const putTodo = async (
  id: number,
  name: string,
  status: Status,
): Promise<ApiResponse<Task>> => {
  return await request.put<Task>(`/todo/${id}`, {
    data: {
      name,
      status,
    },
  })
}
