import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
  CToaster,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { login, putAccessToken } from 'src/utils/api'
import Toast from 'src/components/Toast'
import UserContext from 'src/contexts/UserContext'

const Login = () => {
  const navigate = useNavigate()
  const { authedUser, setAuthedUser } = useContext(UserContext)

  const [user_id, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [toast, addToast] = useState(0)

  useEffect(() => {
    if (authedUser !== null) navigate('/')
  }, [])

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    setIsLoading(true)

    const reqLogin = await login({
      user_id,
      password,
    })

    setIsLoading(false)

    if (!reqLogin.success) {
      addToast(<Toast color="danger" body={reqLogin.message} />)
      return
    }
    putAccessToken(reqLogin.token)
    setAuthedUser(reqLogin.user)
    navigate('/')
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CToaster push={toast} placement="top-end" />
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="User ID"
                        autoComplete="user_id"
                        value={user_id}
                        onChange={(e) => {
                          setUserId(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        {isLoading ? (
                          <CSpinner color="primary" />
                        ) : (
                          <CButton color="primary" className="px-4" onClick={onSubmitHandler}>
                            Login
                          </CButton>
                        )}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
