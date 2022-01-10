export const STATUS = {
  PENDING: 'pending',
  DONE: 'done',
  PROGRESS: 'progress',
  EXPIRED: 'expired',
} as const

export type Status = typeof STATUS[keyof typeof STATUS]
