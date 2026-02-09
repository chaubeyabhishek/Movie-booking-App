import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CinemaList from './pages/CinemaList'
import ShowSelection from './pages/ShowSelection'
import BookingConfirmation from './pages/BookingConfirmation'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import IndianMovies from './pages/IndianMovies'
import Profile from './pages/Profile'

function App() {
  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cinema/:movieId"
          element={
            <ProtectedRoute>
              <CinemaList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking/:movieId/:cinemaId"
          element={
            <ProtectedRoute>
              <ShowSelection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking/confirmation"
          element={
            <ProtectedRoute>
              <BookingConfirmation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/indian-movies"
          element={
            <ProtectedRoute>
              <IndianMovies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
