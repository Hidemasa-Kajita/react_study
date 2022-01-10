import { ApiResponse } from 'types/request'
import { TaskStatus } from 'types/taskStatus'
import { request } from 'utils/request'

export const getStatuses = async (): Promise<ApiResponse<TaskStatus[]>> => {
  return await request.get<TaskStatus[]>('/statuses')
}
