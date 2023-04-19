import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CToaster,
  CSpinner,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { getAdminAll, getPemesananProses, inactiveAdminById } from 'src/utils/api'
import Toast from 'src/components/Toast'
import { prosesPemesanan } from '../../utils/api'

const DataProses = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const [prosess, setProsess] = useState({})

  useEffect(() => {
    componentDidMount()
  }, [])

  const componentDidMount = async () => {
    await getPemesananProsesFunc()
  }

  const getPemesananProsesFunc = async () => {
    setIsLoading(true)
    const getPemesananProsesReq = await getPemesananProses()
    setIsLoading(false)
    setProsess(getPemesananProsesReq)
  }

  const ProsesTable = () => {
    return (
      <div className="table-responsive">
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">No.</CTableHeaderCell>
              <CTableHeaderCell scope="col">No.Pemesanan</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tgl Pesan</CTableHeaderCell>
              <CTableHeaderCell scope="col">Pelanggan</CTableHeaderCell>
              <CTableHeaderCell scope="col">Total</CTableHeaderCell>
              <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {prosess.data.map((proses, i) => {
              const { id, no_pesan, tgl_pesan, nama, total } = proses
              return (
                <CTableRow key={id}>
                  <CTableHeaderCell scope="row">{i + 1}</CTableHeaderCell>
                  <CTableDataCell>{no_pesan}</CTableDataCell>
                  <CTableDataCell>{tgl_pesan}</CTableDataCell>
                  <CTableDataCell>{nama}</CTableDataCell>
                  <CTableDataCell>Rp.{total}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      onClick={() => {
                        navigate(`/pemesanan/detail/${id}`)
                      }}
                      className="mb-1 ms-1"
                      color="success"
                      size="sm"
                    >
                      Selesai
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
      </div>
    )
  }

  if (isLoading) return <CSpinner color="primary" />

  return (
    <CRow>
      <div>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Pemesanan Proses</strong>
          </CCardHeader>
          <CCardBody>{prosess.success ? <ProsesTable /> : prosess.message}</CCardBody>
        </CCard>
      </div>
    </CRow>
  )
}

export default DataProses
