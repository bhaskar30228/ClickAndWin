import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Ranking from './pages/Ranking'
import AddUser from './pages/AddUser'
const App = () => {
  const router= createBrowserRouter([
    {path: '/',element: <Ranking />},
    {path:'/addUsers',element: <AddUser />},
  ])
  return (
    <RouterProvider router={router}>
      
      </RouterProvider>
  )
}

export default App
