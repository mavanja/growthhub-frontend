import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Shell from './components/dashboard/Shell'
import Dashboard from './pages/Dashboard'
import Service from './pages/Service'
import Settings from './pages/Settings'
import Support from './pages/Support'
import GroupAnalyzer from './pages/GroupAnalyzer'

function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/analyze" element={<GroupAnalyzer />} />

          {/* Protected */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Shell />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/services/:serviceId" element={<Service />} />
              <Route path="/dashboard/settings" element={<Settings />} />
              <Route path="/dashboard/support" element={<Support />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
    </ThemeProvider>
  )
}

export default App
