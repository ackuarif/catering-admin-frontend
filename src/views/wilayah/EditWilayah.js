import React, { useEffect, useState } from 'react'
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
import { useNavigate, useParams } from 'react-router-dom'
import { getWilayahById, updateWilayah } from 'src/utils/api'
import Toast from 'src/components/Toast'

const EditWilayah = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [toast, addToast] = useState(0)

  const { id } = useParams()
  const [nama, setNama] = useState('')
  const [ongkir, setOngkir] = useState('')

  useEffect(() => {
    componentDidMount()
  }, [])

  const componentDidMount = async () => {
    await getWilayahByIdFunc()
  }

  const getWilayahByIdFunc = async () => {
    setIsLoading(true)
    const getWilayahByIdReq = await getWilayahById(id)
    setIsLoading(false)

    if (!getWilayahByIdReq.success) {
      addToast(<Toast color="danger" body={getWilayahByIdReq.message} />)
      navigate('/wilayah/tambah')
      return
    }

    setNama(getWilayahByIdReq.data.nama)
    setOngkir(getWilayahByIdReq.data.ongkir)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    setIsLoading(true)

    const updateWilayahReq = await updateWilayah({
      id,
      nama,
      ongkir,
    })

    setIsLoading(false)

    if (!updateWilayahReq.success) {
      addToast(<Toast color="danger" body={updateWilayahReq.message} />)
      return
    }
    addToast(<Toast color="success" body={updateWilayahReq.message} />)
    navigate('/wilayah/data')
  }

  if (isLoading) return <CSpinner color="primary" />

  return (
    <CRow>
      <CToaster push={toast} placement="top-end" />
      <div>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Wilayah</strong>
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
                  value={nama}
                />
              </CInputGroup>
              <CInputGroup>
                <CFormInput
                  type="text"
                  required
                  placeholder="User ID"
                  onChange={(e) => {
                    setOngkir(e.target.value)
                  }}
                  value={ongkir}
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

export default EditWilayah
