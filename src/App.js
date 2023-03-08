import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import './scss/style.scss'
import { getSelfUser } from './utils/api'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userContext: {
        authedUser: null,
        setAuthedUser: (authedUser) => {
          this.setState((state) => {
            return {
              userContext: {
                ...state.userContext,
                authedUser,
              },
            }
          })
        },
      },
    }
  }

  async componentDidMount() {
    const getSelfUserReq = await getSelfUser()
    this.setState((state) => {
      return {
        userContext: {
          ...state.userContext,
          authedUser: null,
        },
      }
    })

    if (getSelfUserReq.success) {
      this.setState((state) => {
        return {
          userContext: {
            ...state.userContext,
            authedUser: getSelfUserReq.data,
          },
        }
      })
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <UserProvider value={this.state.userContext}>
            <Routes>
              <Route exact path="/404" name="Page 404" element={<Page404 />} />
              <Route exact path="/500" name="Page 500" element={<Page500 />} />
              <Route exact path="/login" name="Login Page" element={<Login />} />
              <Route path="*" name="Home" element={<DefaultLayout />} />
            </Routes>
          </UserProvider>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
