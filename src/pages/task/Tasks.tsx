import { useState, ChangeEvent, VFC } from 'react'
import TopBar from 'components/molecules/TopBar'
import TaskList from 'components/organisms/TaskList'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { SelectChangeEvent } from '@mui/material/Select'
import { DateRange } from '@mui/lab/DateRangePicker'
import { Task } from 'types/task'
import TaskEditModal from 'components/organisms/TaskEditModal'

const Tasks: VFC = () => {
  // mock
  const [tasksByStatus, setTasksByStatus] = useState<Record<string, Task[]>>({
    'not start': [
      {
        id: 100,
        name: 'おでかけ1',
        start_date: '1990-01-01',
        end_date: '2022-01-31',
        implementation_hours: 1,
        implementation_minutes: 30,
        status: 'not start',
        labels: [
          {
            id: 1,
            name: 'private',
          },
        ],
        memo: 'memo',
        created_at: '2021-01-01 00:00:00',
        updated_at: '2021-01-01 00:00:00',
      },
    ],
    'in progress': [
      {
        id: 200,
        name: 'おでかけ2',
        start_date: '2022-01-01',
        end_date: '2022-01-31',
        implementation_hours: null,
        implementation_minutes: null,
        status: 'in progress',
        labels: [
          {
            id: 1,
            name: 'private',
          },
        ],
        memo: 'memo',
        created_at: '2021-01-01 00:00:00',
        updated_at: '2021-01-01 00:00:00',
      },
    ],
    done: [],
    expired: [],
  })

  const taskStatuses = Object.keys(tasksByStatus)

  const [newTask, setNewTask] = useState('')

  const [showStatusTaskInput, setShowStatusTaskInput] = useState('')

  const [showOpenModal, setShowOpenModal] = useState(false)

  const [selectedTask, setSelectedTask] = useState<Task>()

  const [dateRange, setDateRange] = useState<DateRange<Date>>([null, null])

  const handleShowTaskInput = (status: string) => {
    setShowStatusTaskInput(() => status)
    setNewTask(() => '')
  }

  const handleSetNewTask = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewTask(() => e.target.value)
  }

  const handleSetTaskByStatus = () => {
    setTasksByStatus((prev) => {
      const data: Record<string, Task[]> = JSON.parse(JSON.stringify(prev))

      // TODO: タスク作成のAPIを叩く
      data[showStatusTaskInput].push({
        id: 3,
        name: newTask,
        start_date: null,
        end_date: null,
        implementation_hours: null,
        implementation_minutes: null,
        status: showStatusTaskInput,
        labels: [],
        memo: null,
        created_at: '2021-01-01 00:00:00',
        updated_at: '2021-01-01 00:00:00',
      })

      return data
    })
    setNewTask(() => '')
    setShowStatusTaskInput(() => '')
  }

  const handleHideShowTaskInput = () => {
    setShowStatusTaskInput(() => '')
  }

  // TODO: タイミングを考える必要あり
  const handleBlurTaskInput = () => {
    setShowStatusTaskInput(() => '')
  }

  const handleOpenModal = (task: Task) => {
    setShowOpenModal(() => true)
    setSelectedTask(() => task)
    const startDate =
      task.start_date !== null ? new Date(task.start_date) : null
    const endDate = task.end_date !== null ? new Date(task.end_date) : null
    setDateRange(() => [startDate, endDate])
  }

  const handleCloseModal = () => {
    setDateRange(() => [null, null])
    setShowOpenModal(() => false)
    setSelectedTask(() => undefined)
  }

  const handleEditTaskName = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedTask((prev) => {
      const task: Task = JSON.parse(JSON.stringify(prev))

      task.name = e.target.value

      return task
    })
  }

  const handleEditTaskImplementationHours = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectedTask((prev) => {
      const task: Task = JSON.parse(JSON.stringify(prev))

      // NaN になるときの対応
      task.implementation_hours = Number(e.target.value)

      return task
    })
  }

  const handleEditTaskImplementationMunites = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectedTask((prev) => {
      const task: Task = JSON.parse(JSON.stringify(prev))

      // NaN になるときの対応
      task.implementation_minutes = Number(e.target.value)

      return task
    })
  }

  const handleEditTaskMemo = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedTask((prev) => {
      const task: Task = JSON.parse(JSON.stringify(prev))

      task.memo = e.target.value

      return task
    })
  }

  const handleEditTaskStatus = (e: SelectChangeEvent) => {
    setSelectedTask((prev) => {
      const task: Task = JSON.parse(JSON.stringify(prev))

      task.status = e.target.value

      return task
    })
  }

  const handleEditTaskDate = (e: [Date | null, Date | null]) => {
    setDateRange(() => e)
    setSelectedTask((prev) => {
      const task: Task = JSON.parse(JSON.stringify(prev))

      const start = e[0]
      if (typeof start !== 'undefined' && start !== null) {
        task.start_date = `${start.getFullYear()}-${
          start.getMonth() + 1
        }-${start.getDate()}`
      }

      const end = e[1]
      if (typeof end !== 'undefined' && end !== null) {
        task.end_date = `${end.getFullYear()}-${
          end.getMonth() + 1
        }-${end.getDate()}`
      }

      return task
    })
  }

  const handleUpdateTask = () => {
    setTasksByStatus((prev) => {
      const data: Record<string, Task[]> = JSON.parse(JSON.stringify(prev))

      if (typeof selectedTask === 'undefined') {
        return prev
      }

      let deleteTaskId: number | null = null
      let deleteTaskStatus: string = ''
      Object.entries(prev).forEach((tasks: [string, Task[]]) => {
        if (tasks[1].length === 0) {
          return
        }

        const index = tasks[1].findIndex((task) => task.id === selectedTask.id)

        if (index !== -1) {
          deleteTaskId = data[tasks[0]][index].id
          deleteTaskStatus = data[tasks[0]][index].status
        }
      })

      data[deleteTaskStatus] = data[deleteTaskStatus].filter(
        (task) => task.id !== deleteTaskId,
      )
      data[selectedTask.status].push(selectedTask)

      return data
    })
    handleCloseModal()
  }

  const handleDeleteTask = () => {
    setTasksByStatus((prev) => {
      const data: Record<string, Task[]> = JSON.parse(JSON.stringify(prev))

      if (typeof selectedTask === 'undefined') {
        return prev
      }

      let deleteTaskId: number | null = null
      let deleteTaskStatus: string = ''
      Object.entries(prev).forEach((tasks: [string, Task[]]) => {
        if (tasks[1].length === 0) {
          return
        }

        const index = tasks[1].findIndex((task) => task.id === selectedTask.id)

        if (index !== -1) {
          deleteTaskId = data[tasks[0]][index].id
          deleteTaskStatus = data[tasks[0]][index].status
        }
      })

      data[deleteTaskStatus] = data[deleteTaskStatus].filter(
        (task) => task.id !== deleteTaskId,
      )

      return data
    })
    handleCloseModal()
  }

  return (
    <>
      <TopBar />
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{
          marginBottom: '30px',
          textDecoration: 'underline',
          textAlign: 'center',
          marginTop: '30px',
        }}
      >
        your board!
      </Typography>
      <Container
        sx={{
          mt: '10px',
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          maxWidth: '100vh',
        }}
      >
        {taskStatuses.map((status, index) => (
          <TaskList
            key={index}
            tasks={tasksByStatus[status]}
            status={status}
            newTask={newTask}
            showStatusTaskInput={showStatusTaskInput}
            handleSetTaskByStatus={handleSetTaskByStatus}
            handleShowTaskInput={handleShowTaskInput}
            handleSetNewTask={handleSetNewTask}
            handleHideShowTaskInput={handleHideShowTaskInput}
            handleOpenModal={handleOpenModal}
          />
        ))}

        <TaskEditModal
          showOpenModal={showOpenModal}
          selectedTask={selectedTask}
          taskStatuses={taskStatuses}
          dateRange={dateRange}
          handleCloseModal={handleCloseModal}
          handleEditTaskName={handleEditTaskName}
          handleEditTaskImplementationHours={handleEditTaskImplementationHours}
          handleEditTaskImplementationMunites={
            handleEditTaskImplementationMunites
          }
          handleEditTaskMemo={handleEditTaskMemo}
          handleEditTaskStatus={handleEditTaskStatus}
          handleEditTaskDate={handleEditTaskDate}
          handleBlurTaskInput={handleBlurTaskInput}
          handleUpdateTask={handleUpdateTask}
          handleDeleteTask={handleDeleteTask}
        />
      </Container>
    </>
  )
}

export default Tasks
