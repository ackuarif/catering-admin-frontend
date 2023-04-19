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
import { getAdminAll, getPemesananVerif, inactiveAdminById } from 'src/utils/api'
import Toast from 'src/components/Toast'
import { verifPemesanan } from '../../utils/api'

const DataVerifikasi = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const [verifs, setVerifs] = useState({})

  useEffect(() => {
    componentDidMount()
  }, [])

  const componentDidMount = async () => {
    await getPemesananVerifFunc()
  }

  const getPemesananVerifFunc = async () => {
    setIsLoading(true)
    const getPemesananVerifReq = await getPemesananVerif()
    setIsLoading(false)
    setVerifs(getPemesananVerifReq)
  }

  const VerifTable = () => {
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
            {verifs.data.map((verif, i) => {
              const { id, no_pesan, tgl_pesan, nama, total } = verif
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
                      color="primary"
                      size="sm"
                    >
                      Verifikasi
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
            <strong>Verifikasi Pemesanan</strong>
          </CCardHeader>
          <CCardBody>{verifs.success ? <VerifTable /> : verifs.message}</CCardBody>
        </CCard>
      </div>
    </CRow>
  )
}

export default DataVerifikasi
