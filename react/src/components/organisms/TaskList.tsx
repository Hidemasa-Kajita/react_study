import { ChangeEvent, memo, VFC } from 'react'
import { Task } from '../../types/task'
import Container from '@mui/material/Container'
import TaskCard from '../../components/molecules/TaskCard'
import Typography from '@mui/material/Typography'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Button from '@mui/material/Button'

type Props = {
  tasks: Task[]
  status: string
  newTask: string
  showStatusTaskInput: string
  handleShowTaskInput: (status: string) => void
  handleSetTaskByStatus: () => void
  handleSetNewTask: (e: ChangeEvent<HTMLTextAreaElement>) => void
  handleHideShowTaskInput: () => void
  handleOpenModal: (task: Task) => void
}

const TaskList: VFC<Props> = memo(
  ({
    tasks,
    status,
    newTask,
    showStatusTaskInput,
    handleShowTaskInput,
    handleSetTaskByStatus,
    handleSetNewTask,
    handleHideShowTaskInput,
    handleOpenModal,
  }) => (
    <Container
      sx={{
        border: '1px solid grey',
        borderRadius: '10px',
        width: '250px',
        height: 'fit-content',
        backgroundColor: '#ebecf0',
      }}
    >
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ marginBottom: '10px', textDecoration: 'underline' }}
      >
        {status}
      </Typography>
      {tasks.map((task) => (
        <Box key={task.id} onClick={() => handleOpenModal(task)}>
          <TaskCard task={task} />
        </Box>
      ))}
      {showStatusTaskInput === status ? (
        <>
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="New Task!"
            style={{ width: '194px' }}
            value={newTask}
            onChange={handleSetNewTask}
            // onBlur={handleBlurTaskInput}
          />
          <Button onClick={handleSetTaskByStatus}>タスクを追加</Button>
          <Button onClick={handleHideShowTaskInput}>×</Button>
        </>
      ) : (
        <>
          <Box sx={{ textAlign: 'center', marginBottom: '10px' }}>
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              onClick={() => handleShowTaskInput(status)}
            >
              <AddIcon />
            </Fab>
          </Box>
        </>
      )}
    </Container>
  ),
)

export default TaskList
