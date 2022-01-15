import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from 'pages/NotFound'
import Home from 'pages/Home'
import Tasks from 'pages/task/Tasks'
import NewTask from 'pages/task/NewTask'
import EditTask from 'pages/task/EditTask'
import DeleteTask from 'pages/task/DeleteTask'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/tasks">
          <Route index element={<Tasks />} />
          <Route path="new" element={<NewTask />} />
          <Route path="edit" element={<EditTask />} />
          <Route path="delete" element={<DeleteTask />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
