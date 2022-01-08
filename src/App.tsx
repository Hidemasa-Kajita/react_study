import { useState } from 'react'
import './App.css'

const App = () => {
  const [count, setCount] = useState(0)
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => setCount(0)

  return (
    <>
      <p>count app</p>
      <p>count: {count}</p>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      {count !== 0 && <button onClick={reset}>reset</button>}
    </>
  )
}

export default App
