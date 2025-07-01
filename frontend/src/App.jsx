import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'

import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from "./store/useThemeStore";
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast";

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
{/** */}
  console.log("authuser: ", authUser);

  if(isCheckingAuth && !authUser){ 
      <div className="flex items-center justify-center h-screen"> //loader during auth checker
        <Loader className="size-10 animate-spin" />
      </div>
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} /> //Route to HomePage if user not authenticated route to LoginPage
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} /> //Route to SignupPage if user is authenticated route to HomePage
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} /> //Route to LoginPage if user is authenticated route to HomePage
        <Route path="/settings" element={<SettingsPage />} /> //Route to SettingsPage
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} /> //Route to ProfilePage if user not authenticated route to LoginPage
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
