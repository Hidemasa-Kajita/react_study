import { ChangeEvent, Fragment, VFC } from 'react'
import { Task } from '../../types/task'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import ModalUnstyled from '@mui/base/ModalUnstyled'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import DateRangePicker from '@mui/lab/DateRangePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DateRange } from '@mui/lab/DateRangePicker/RangeTypes'
import TextInputField from '../../components/molecules/TextInputField'
import Button from '@mui/material/Button'
import NumberInputField from '../../components/molecules/NumberInputField'

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: scroll;
  margin: 30px;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  -webkit-tap-highlight-color: transparent;
`

const style = {
  maxWidth: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
}

type Props = {
  showOpenModal: boolean
  selectedTask: Task | undefined
  taskStatuses: string[]
  dateRange: DateRange<Date>
  handleBlurTaskInput: () => void
  handleCloseModal: () => void
  handleEditTaskName: (e: ChangeEvent<HTMLInputElement>) => void
  handleEditTaskImplementationHours: (e: ChangeEvent<HTMLInputElement>) => void
  handleEditTaskImplementationMunites: (
    e: ChangeEvent<HTMLInputElement>,
  ) => void
  handleEditTaskMemo: (e: ChangeEvent<HTMLTextAreaElement>) => void
  handleEditTaskStatus: (e: SelectChangeEvent) => void
  handleEditTaskDate: (e: [Date | null, Date | null]) => void
  handleUpdateTask: () => void
  handleDeleteTask: () => void
}

const TaskEditModal: VFC<Props> = ({
  showOpenModal,
  selectedTask,
  taskStatuses,
  dateRange,
  handleCloseModal,
  handleEditTaskName,
  handleEditTaskImplementationHours,
  handleEditTaskImplementationMunites,
  handleEditTaskMemo,
  handleEditTaskStatus,
  handleEditTaskDate,
  handleUpdateTask,
  handleDeleteTask,
}) => (
  <StyledModal
    open={showOpenModal}
    onClose={handleCloseModal}
    BackdropComponent={Backdrop}
  >
    <Box sx={style}>
      <Box
        component="form"
        noValidate
        sx={{
          display: 'grid',
        }}
      >
        <TextInputField
          sx={{ marginBottom: '10px' }}
          label="タスク名"
          value={selectedTask?.name}
          required={true}
          handle={handleEditTaskName}
        />
        <FormControl variant="standard" sx={{ marginBottom: '10px' }}>
          <InputLabel id="status-select-label">状態</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            label="状態"
            value={selectedTask?.status}
            onChange={handleEditTaskStatus}
          >
            {taskStatuses.map((status, index) => (
              <MenuItem value={status} key={index}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ marginBottom: '10px' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="開始日"
              endText="終了日"
              value={dateRange}
              onChange={handleEditTaskDate}
              renderInput={(startProps, endProps) => (
                <Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </Fragment>
              )}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl variant="standard" sx={{ marginBottom: '10px' }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
            }}
          >
            <NumberInputField
              sx={{ width: '40%' }}
              label="作業時間（時間）"
              value={selectedTask?.implementation_hours}
              required={false}
              handle={handleEditTaskImplementationHours}
            />
            <Typography sx={{ width: '10%', textAlign: 'center' }}>
              時間
            </Typography>
            <NumberInputField
              sx={{ width: '40%' }}
              label="作業時間（分）"
              value={selectedTask?.implementation_minutes}
              required={false}
              handle={handleEditTaskImplementationMunites}
            />
            <Typography sx={{ width: '10%', textAlign: 'center' }}>
              分
            </Typography>
          </Box>
        </FormControl>
        <FormControl variant="standard" sx={{ marginBottom: '10px' }}>
          <Typography sx={{ width: '10%', textAlign: 'center' }}>
            詳細
          </Typography>
          <TextareaAutosize
            aria-label="empty textarea"
            minRows={5}
            value={selectedTask?.memo ?? ''}
            // onBlur={handleBlurTaskInput}
            onChange={handleEditTaskMemo}
          />
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Button variant="contained" onClick={handleUpdateTask}>
            更新
          </Button>
          <Button variant="contained" onClick={handleDeleteTask}>
            削除
          </Button>
        </Box>
      </Box>
    </Box>
  </StyledModal>
)
export default TaskEditModal
