import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from 'src/contexts/UserContext'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  const navigate = useNavigate()
  const { authedUser, setAuthedUser } = useContext(UserContext)

  useEffect(() => {
    if (authedUser === null) navigate('/login')
  }, [])

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
