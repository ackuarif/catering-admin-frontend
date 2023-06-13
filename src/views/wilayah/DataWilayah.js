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
import { getWilayahAll, inactiveWilayahById } from 'src/utils/api'
import Toast from 'src/components/Toast'

const DataWilayah = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [toast, addToast] = useState(0)

  const [wilayahs, setWilayahs] = useState({})

  useEffect(() => {
    componentDidMount()
  }, [])

  const getWilayahAllReqFunc = async () => {
    setIsLoading(true)
    const getWilayahAllReq = await getWilayahAll()
    setIsLoading(false)
    setWilayahs(getWilayahAllReq)
  }

  const componentDidMount = async () => {
    await getWilayahAllReqFunc()
  }

  const inactiveWilayahByIdFunc = async (id) => {
    setIsLoading(true)
    const inactiveWilayahByIdReq = await inactiveWilayahById(id)
    setIsLoading(false)

    if (!inactiveWilayahByIdReq.success) {
      addToast(<Toast color="danger" body={inactiveWilayahByIdReq.message} />)
      return
    }

    await getWilayahAllReqFunc()
  }

  const WilayahTable = () => {
    const [visible, setVisible] = useState(false)
    const [wilayahId, setWilayahId] = useState('')

    return (
      <div className="table-responsive">
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">No.</CTableHeaderCell>
              <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
              <CTableHeaderCell scope="col">Biaya Pengiriman</CTableHeaderCell>
              <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {wilayahs.data.map((wilayah, i) => {
              const { id, nama, ongkir } = wilayah
              return (
                <CTableRow key={id}>
                  <CTableHeaderCell scope="row">{i + 1}</CTableHeaderCell>
                  <CTableDataCell>{nama}</CTableDataCell>
                  <CTableDataCell>{ongkir}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      onClick={() => {
                        navigate(`/wilayah/edit/${id}`)
                      }}
                      className="mb-1 ms-1"
                      color="primary"
                      size="sm"
                    >
                      Edit
                    </CButton>
                    <CButton
                      className="mb-1 ms-1"
                      color="danger"
                      onClick={() => {
                        setVisible(!visible)
                        setWilayahId(id)
                      }}
                      size="sm"
                    >
                      Hapus
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
        <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Hapus</CModalTitle>
          </CModalHeader>
          <CModalBody>Apakah yakin akan menghapus wilayah tersebut ?</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Batal
            </CButton>
            <CButton color="danger" onClick={() => inactiveWilayahByIdFunc(wilayahId)}>
              Hapus
            </CButton>
          </CModalFooter>
        </CModal>
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
            <strong>Data Wilayah</strong>
          </CCardHeader>
          <CCardBody>{wilayahs.success ? <WilayahTable /> : wilayahs.message}</CCardBody>
        </CCard>
      </div>
    </CRow>
  )
}

export default DataWilayah
