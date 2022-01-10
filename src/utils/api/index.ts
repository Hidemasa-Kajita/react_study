import axios, { AxiosError } from 'axios'
import { todo } from 'utils/api/todo'
import { statuses } from 'utils/api/statuses'

export const api = {
  todo,
  statuses,
}

export const isErrorResponse = (
  response: unknown,
): response is AxiosError | Error => {
  if (!response) {
    return false
  }

  return response instanceof Error
}

export const getAxiosStatusCode = (
  err: AxiosError | Error,
): number | undefined => {
  if (axios.isAxiosError(err)) {
    return err?.response?.status
  }

  return undefined
}

export const getAxiosErrorMessage = (
  err: AxiosError | Error,
): string | null | undefined => {
  if (axios.isAxiosError(err)) {
    return err?.response?.data?.message
  }

  return undefined
}
