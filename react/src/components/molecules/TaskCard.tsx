import { memo, VFC } from 'react'
import Typography from '@mui/material/Typography'
import { Task } from '../../types/task'

type Props = {
  task: Task
}

const TaskCard: VFC<Props> = memo(({ task }) => (
  <Typography
    sx={{
      maxWidth: 'auto',
      marginBottom: '10px',
      border: '1px solid grey',
      borderRadius: '3px',
      padding: '5px',
      cursor: 'pointer',
      boxShadow: '2px 2px 4px gray',
    }}
  >
    {task.name}
  </Typography>
))

export default TaskCard
