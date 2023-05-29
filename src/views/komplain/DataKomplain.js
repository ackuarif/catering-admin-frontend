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
import { getKomplainAll, getKomplainBalas, inactiveKomplainById } from 'src/utils/api'
import Toast from 'src/components/Toast'

const DataKomplain = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [toast, addToast] = useState(0)

  const [komplains, setKomplains] = useState({})

  useEffect(() => {
    componentDidMount()
  }, [])

  const getKomplainBalasFunc = async () => {
    setIsLoading(true)
    const getKomplainBalasReq = await getKomplainBalas()
    setIsLoading(false)
    setKomplains(getKomplainBalasReq)
  }

  const componentDidMount = async () => {
    await getKomplainBalasFunc()
  }

  const KomplainTable = () => {
    return (
      <div className="table-responsive">
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">No.</CTableHeaderCell>
              <CTableHeaderCell scope="col">Pelanggan</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tgl Komplain</CTableHeaderCell>
              <CTableHeaderCell scope="col">Isi Komplain</CTableHeaderCell>
              <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {komplains.data.map((data, i) => {
              const { id, nama, created_at, ket, user_id } = data
              return (
                <CTableRow key={id}>
                  <CTableHeaderCell scope="row">{i + 1}</CTableHeaderCell>
                  <CTableDataCell>{nama}</CTableDataCell>
                  <CTableDataCell>{created_at}</CTableDataCell>
                  <CTableDataCell>{ket}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      onClick={() => {
                        navigate(`/tools/komplain/${user_id}`)
                      }}
                      className="mb-1 ms-1"
                      color="primary"
                      size="sm"
                    >
                      Balas
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
        <CToaster push={toast} placement="top-end" />
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Data Komplain</strong>
          </CCardHeader>
          <CCardBody>{komplains.success ? <KomplainTable /> : komplains.message}</CCardBody>
        </CCard>
      </div>
    </CRow>
  )
}

export default DataKomplain
