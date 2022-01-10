import { getTodo } from 'utils/api/todo/getTodo'
import { postTodo } from 'utils/api/todo/postTodo'
import { putTodo } from 'utils/api/todo/putTodo'
import { deleteTodo } from 'utils/api/todo/deleteTodo'

export const todo = {
  getTodo,
  postTodo,
  putTodo,
  deleteTodo,
}
