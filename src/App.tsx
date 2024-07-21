import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import SignUpPage from './pages/signup'
import LogInPage from './pages/login'
import SetupAccountPage from './pages/SetupAccountPage'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" Component={SignUpPage} />
        <Route path="/login" Component={LogInPage} />
        <Route path="/setup" Component={SetupAccountPage} />
        <Route path="/Dashboard" Component={Dashboard} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
  )
}

export default App
