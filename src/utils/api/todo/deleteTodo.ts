import { ApiResponse } from 'types/request'
import { Task } from 'types/task'
import { request } from 'utils/request'

export const deleteTodo = async (id: number): Promise<ApiResponse<Task>> => {
  return await request.delete<Task>(`/todo/${id}`)
}
