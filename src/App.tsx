import { VFC } from 'react'
import './App.css'
import TodoContainer from 'components/TodoContainer'

const App: VFC = () => {
  console.log('--- App ---')

  return <TodoContainer />
}

export default App
