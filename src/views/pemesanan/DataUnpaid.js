import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CSpinner,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { getPemesananUnpaid } from 'src/utils/api'

const DataUnpaid = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const [unpaids, setUnpaids] = useState({})

  useEffect(() => {
    componentDidMount()
  }, [])

  const componentDidMount = async () => {
    await getPemesananUnpaidFunc()
  }

  const getPemesananUnpaidFunc = async () => {
    setIsLoading(true)
    const getPemesananUnpaidReq = await getPemesananUnpaid()
    setIsLoading(false)
    setUnpaids(getPemesananUnpaidReq)
  }

  const UnpaidTable = () => {
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
            {unpaids.data.map((unpaid, i) => {
              const { id, no_pesan, tgl_pesan, nama, total } = unpaid
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
                      Lihat
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
            <strong>Pemesanan Unpaid</strong>
          </CCardHeader>
          <CCardBody>{unpaids.success ? <UnpaidTable /> : unpaids.message}</CCardBody>
        </CCard>
      </div>
    </CRow>
  )
}

export default DataUnpaid
