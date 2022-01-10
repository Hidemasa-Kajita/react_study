import axios, { AxiosRequestConfig } from 'axios'
import { ApiResponse } from 'types/request'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'applications/json',
  },
})

export const request = {
  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const res = await axiosInstance.get<T>(url, config)

      return res.data
    } catch (err: unknown) {
      throw err
    }
  },
  async post<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const res = await axiosInstance.post<T>(url, config)
      return res.data
    } catch (err: unknown) {
      throw err
    }
  },
  async put<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const res = await axiosInstance.put<T>(url, config)
      return res.data
    } catch (err: unknown) {
      throw err
    }
  },
  async patch<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const res = await axiosInstance.patch<T>(url, config)
      return res.data
    } catch (err: unknown) {
      throw err
    }
  },
  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const res = await axiosInstance.delete<T>(url, config)
      return res.data
    } catch (err: unknown) {
      throw err
    }
  },
}
