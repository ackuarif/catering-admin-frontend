import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CRow,
  CFormTextarea,
  CInputGroupText,
  CInputGroup,
  CToaster,
  CSpinner,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { addAdmin, addMenu } from 'src/utils/api'
import Toast from 'src/components/Toast'

const TambahAdmin = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [toast, addToast] = useState(0)

  const [nama, setNama] = useState('')
  const [user_id, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirm, setPasswordConfirm] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    setIsLoading(true)

    const addAdminReq = await addAdmin({
      nama,
      user_id,
      password,
      password_confirm,
    })

    setIsLoading(false)

    if (!addAdminReq.success) {
      addToast(<Toast color="danger" body={addAdminReq.message} />)
      return
    }
    addToast(<Toast color="success" body={addAdminReq.message} />)
  }

  if (isLoading) return <CSpinner color="primary" />

  return (
    <CRow>
      <CToaster push={toast} placement="top-end" />
      <div>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Tambah Admin</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" onSubmit={handleSubmit}>
              <CInputGroup>
                <CFormInput
                  size="2"
                  type="text"
                  required
                  placeholder="Nama"
                  onChange={(e) => {
                    setNama(e.target.value)
                  }}
                />
              </CInputGroup>
              <CInputGroup>
                <CFormInput
                  size="2"
                  type="text"
                  required
                  placeholder="User ID"
                  onChange={(e) => {
                    setUserId(e.target.value)
                  }}
                />
              </CInputGroup>
              <CInputGroup>
                <CFormInput
                  size="2"
                  type="password"
                  required
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                />
              </CInputGroup>
              <CInputGroup>
                <CFormInput
                  size="2"
                  type="password"
                  required
                  placeholder="Konfirmasi Password"
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value)
                  }}
                />
              </CInputGroup>
              <CInputGroup>
                <CButton color="primary" type="submit">
                  Simpan
                </CButton>
              </CInputGroup>
            </CForm>
          </CCardBody>
        </CCard>
      </div>
    </CRow>
  )
}

export default TambahAdmin
