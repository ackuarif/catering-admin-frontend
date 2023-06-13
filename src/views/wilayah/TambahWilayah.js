import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CRow,
  CInputGroup,
  CToaster,
  CSpinner,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { addWilayah } from 'src/utils/api'
import Toast from 'src/components/Toast'

const TambahWilayah = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [toast, addToast] = useState(0)

  const [nama, setNama] = useState('')
  const [ongkir, setOngkir] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    setIsLoading(true)

    const addWilayahReq = await addWilayah({
      nama,
      ongkir,
    })

    setIsLoading(false)

    if (!addWilayahReq.success) {
      addToast(<Toast color="danger" body={addWilayahReq.message} />)
      return
    }
    addToast(<Toast color="success" body={addWilayahReq.message} />)
  }

  if (isLoading) return <CSpinner color="primary" />

  return (
    <CRow>
      <CToaster push={toast} placement="top-end" />
      <div>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Tambah Wilayah</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" onSubmit={handleSubmit}>
              <CInputGroup>
                <CFormInput
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
                  type="number"
                  required
                  placeholder="Biaya Pengiriman"
                  onChange={(e) => {
                    setOngkir(e.target.value)
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

export default TambahWilayah
