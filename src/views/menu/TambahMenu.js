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
import { addMenu } from 'src/utils/api'
import Toast from 'src/components/Toast'

const TambahMenu = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [toast, addToast] = useState(0)

  const [nama, setNama] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [harga, setHarga] = useState('')
  const [diskon, setDiskon] = useState('')
  const [tersedia, setTersedia] = useState('1')
  const [gambar, setGambar] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    setIsLoading(true)

    const addMenuReq = await addMenu({
      nama,
      deskripsi,
      harga,
      diskon,
      tersedia,
      gambar,
    })

    setIsLoading(false)

    if (!addMenuReq.success) {
      addToast(<Toast color="danger" body={addMenuReq.message} />)
      return
    }
    addToast(<Toast color="success" body={addMenuReq.message} />)
  }

  if (isLoading) return <CSpinner color="primary" />

  return (
    <CRow>
      <CToaster push={toast} placement="top-end" />
      <div>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Tambah Menu</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" onSubmit={handleSubmit}>
              <CInputGroup>
                <CFormInput
                  type="text"
                  required
                  placeholder="Nama Menu"
                  onChange={(e) => {
                    setNama(e.target.value)
                  }}
                />
              </CInputGroup>
              <CInputGroup>
                <CFormTextarea
                  placeholder="Deskripsi"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onChange={(e) => {
                    setDeskripsi(e.target.value)
                  }}
                ></CFormTextarea>
              </CInputGroup>
              <CInputGroup>
                <CFormInput
                  type="number"
                  required
                  placeholder="Harga"
                  onChange={(e) => {
                    setHarga(e.target.value)
                  }}
                />
              </CInputGroup>
              <CInputGroup>
                <CFormInput
                  type="number"
                  required
                  placeholder="Diskon"
                  onChange={(e) => {
                    setDiskon(e.target.value)
                  }}
                />
              </CInputGroup>
              <CInputGroup>
                <CInputGroupText component="label" htmlFor="ketersediaan">
                  Ketersediaan
                </CInputGroupText>
                <CFormSelect
                  placeholder="Ketersediaan"
                  id="ketersediaan"
                  onChange={(e) => {
                    setTersedia(e.target.value)
                  }}
                >
                  <option value="1">Tersedia</option>
                  <option value="0">Belum Tersedia</option>
                </CFormSelect>
              </CInputGroup>
              <CInputGroup>
                <CFormInput
                  type="file"
                  id="gambar"
                  placeholder="Gambar"
                  onChange={(e) => {
                    setGambar(e.target.files[0])
                  }}
                />
                <CInputGroupText component="label" htmlFor="gambar">
                  Gambar
                </CInputGroupText>
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

export default TambahMenu
