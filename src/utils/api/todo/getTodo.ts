import { ApiResponse } from 'types/request'
import { Task } from 'types/task'
import { request } from 'utils/request'

export const getTodo = async (): Promise<ApiResponse<Task[]>> => {
  return await request.get<Task[]>('/todo')
}
