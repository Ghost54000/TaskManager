import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';
import DeleteTask from './pages/DeleteTask';
import PrivateRoute from './PrivateRoute';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header></Header>
      <main id="center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute><CreateTask /></PrivateRoute>} />
          <Route path="/edit/:id" element={<PrivateRoute><EditTask /></PrivateRoute>} />
          <Route path="/delete/:id" element={<PrivateRoute><DeleteTask /></PrivateRoute>} />
        </Routes>  
      </main>
      <Footer></Footer>
    </>
  )
}

export default App
