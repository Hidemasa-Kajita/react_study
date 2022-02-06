export type Task = {
  id: number
  name: string
  start_date: string | null
  end_date: string | null
  implementation_hours: number | null
  implementation_minutes: number | null
  status: string
  memo: string | null
  // labels: Label[]
  created_at: string
  updated_at: string
}
