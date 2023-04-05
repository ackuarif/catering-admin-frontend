import React, { useEffect, useState } from 'react'
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
import { useNavigate, useParams } from 'react-router-dom'
import { getAdminById, updateAdmin } from 'src/utils/api'
import Toast from 'src/components/Toast'

const EditAdmin = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [toast, addToast] = useState(0)

  const { id } = useParams()
  const [nama, setNama] = useState('')
  const [user_id, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirm, setPasswordConfirm] = useState('')

  useEffect(() => {
    componentDidMount()
  }, [])

  const componentDidMount = async () => {
    await getAdminByIdFunc()
  }

  const getAdminByIdFunc = async () => {
    setIsLoading(true)
    const getAdminByIdReq = await getAdminById(id)
    setIsLoading(false)

    if (!getAdminByIdReq.success) {
      addToast(<Toast color="danger" body={getAdminByIdReq.message} />)
      navigate('/admin/tambah')
      return
    }

    setNama(getAdminByIdReq.data.nama)
    setUserId(getAdminByIdReq.data.user_id)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    setIsLoading(true)

    const updateAdminReq = await updateAdmin({
      id,
      nama,
      user_id,
    })

    setIsLoading(false)

    if (!updateAdminReq.success) {
      addToast(<Toast color="danger" body={updateAdminReq.message} />)
      return
    }
    addToast(<Toast color="success" body={updateAdminReq.message} />)
    navigate('/admin/data')
  }

  if (isLoading) return <CSpinner color="primary" />

  return (
    <CRow>
      <CToaster push={toast} placement="top-end" />
      <div>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Admin</strong>
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
                  value={nama}
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
                  value={user_id}
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

export default EditAdmin
