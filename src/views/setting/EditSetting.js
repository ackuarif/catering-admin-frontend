import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CRow,
  CInputGroup,
  CToaster,
  CSpinner,
  CFormTextarea,
  CFormLabel,
} from '@coreui/react'
import { getSettingAll, updateSetting } from 'src/utils/api'
import Toast from 'src/components/Toast'

const EditAdmin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [toast, addToast] = useState(0)

  const [info_pembayaran, setInfoPembayaran] = useState('')

  useEffect(() => {
    componentDidMount()
  }, [])

  const componentDidMount = async () => {
    await getSettingAllFunc()
  }

  const getSettingAllFunc = async () => {
    setIsLoading(true)
    const getSettingAllReq = await getSettingAll()
    setIsLoading(false)

    if (!getSettingAllReq.success) {
      addToast(<Toast color="danger" body={getSettingAllReq.message} />)
      return
    }

    setInfoPembayaran(getSettingAllReq.data[0].info_pembayaran)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    setIsLoading(true)

    const updateSettingReq = await updateSetting({
      info_pembayaran,
    })

    setIsLoading(false)

    if (!updateSettingReq.success) {
      addToast(<Toast color="danger" body={updateSettingReq.message} />)
      return
    }
    addToast(<Toast color="success" body={updateSettingReq.message} />)
  }

  if (isLoading) return <CSpinner color="primary" />

  return (
    <CRow>
      <CToaster push={toast} placement="top-end" />
      <div>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Setting</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" onSubmit={handleSubmit}>
              <div>
                <CFormLabel>Info Pembayaran</CFormLabel>
                <CFormTextarea
                  placeholder="Info Pembayaran"
                  rows="3"
                  onChange={(e) => {
                    setInfoPembayaran(e.target.value)
                  }}
                  value={info_pembayaran}
                ></CFormTextarea>
              </div>
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
