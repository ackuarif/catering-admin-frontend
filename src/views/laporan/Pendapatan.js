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
  CSpinner,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { laporanPendapatanByDate } from 'src/utils/api'

const Pendapatan = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const [tgl_dari, setTglDari] = useState('')
  const [tgl_sampai, setTglSampai] = useState('')
  const [datas, setDatas] = useState({})
  const [grand_total, setGrandTotal] = useState(0)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    setIsLoading(true)

    const laporanPendapatanByDateReq = await laporanPendapatanByDate({ tgl_dari, tgl_sampai })
    setDatas(laporanPendapatanByDateReq)

    setGrandTotal(0)
    laporanPendapatanByDateReq.data.map((data, i) => {
      const { total } = data
      setGrandTotal((prevState) => prevState + parseInt(total))
    })

    setIsLoading(false)
  }

  const LihatPendapatan = () => {
    if (isLoading) return <CSpinner color="primary" />

    return (
      <div className="table-responsive">
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">No.</CTableHeaderCell>
              <CTableHeaderCell scope="col">No.Pemesanan</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tgl Bayar</CTableHeaderCell>
              <CTableHeaderCell scope="col">Pelanggan</CTableHeaderCell>
              <CTableHeaderCell scope="col">Subtotal</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {datas.data.map((data, i) => {
              const { id, no_pesan, tgl_bayar, nama, total } = data
              return (
                <>
                  <CTableRow key={id}>
                    <CTableHeaderCell scope="row">{i + 1}</CTableHeaderCell>
                    <CTableDataCell>{no_pesan}</CTableDataCell>
                    <CTableDataCell>{tgl_bayar}</CTableDataCell>
                    <CTableDataCell>{nama}</CTableDataCell>
                    <CTableDataCell>Rp.{total}</CTableDataCell>
                  </CTableRow>
                </>
              )
            })}
            <CTableRow>
              <CTableDataCell colspan={4} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                Total
              </CTableDataCell>
              <CTableDataCell>Rp.{grand_total}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </div>
    )
  }

  return (
    <CRow>
      <div>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Periode Laporan</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" onSubmit={handleSubmit}>
              <CInputGroup>
                <CFormInput
                  size="2"
                  type="date"
                  required
                  placeholder="Tanggal Dari"
                  onChange={(e) => {
                    setTglDari(e.target.value)
                  }}
                />
              </CInputGroup>
              <CInputGroup>
                <CFormInput
                  size="2"
                  type="date"
                  required
                  placeholder="Tgl Sampai"
                  onChange={(e) => {
                    setTglSampai(e.target.value)
                  }}
                />
              </CInputGroup>
              <CInputGroup>
                <CButton color="primary" type="submit">
                  Lihat
                </CButton>
              </CInputGroup>
            </CForm>
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Hasil Laporan</strong>
          </CCardHeader>
          <CCardBody>{datas.success ? <LihatPendapatan /> : datas.message}</CCardBody>
        </CCard>
      </div>
    </CRow>
  )
}

export default Pendapatan
