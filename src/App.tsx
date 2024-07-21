import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import SignUpPage from './pages/signup'
import LogInPage from './pages/login'
import Homepage from './pages/Homepage'
import SetupAccountPage from './pages/SetupAccountPage'

function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" Component={Homepage} />
        <Route path="/signup" Component={SignUpPage} />
        <Route path="/login" Component={LogInPage} />
        <Route path="/setup" Component={SetupAccountPage} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
  )
}

export default App
