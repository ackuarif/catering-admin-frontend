import React, { useEffect, useState } from 'react'
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
import { getAdminAll, getMenuAll, inactiveAdminById } from 'src/utils/api'
import Toast from 'src/components/Toast'

const DataMenu = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [toast, addToast] = useState(0)

  const [admins, setAdmins] = useState([])

  useEffect(() => {
    componentDidMount()
  }, [])

  const getAdminAllReqFunc = async () => {
    setIsLoading(true)
    const getAdminAllReq = await getAdminAll()
    setIsLoading(false)
    setAdmins(getAdminAllReq)
  }

  const componentDidMount = async () => {
    await getAdminAllReqFunc()
  }

  const inactiveAdminByIdFunc = async (id) => {
    setIsLoading(true)
    const inactiveAdminByIdReq = await inactiveAdminById(id)
    setIsLoading(false)

    if (!inactiveAdminByIdReq.success) {
      addToast(<Toast color="danger" body={inactiveAdminByIdReq.message} />)
      return
    }

    await getAdminAllReqFunc()
  }

  const AdminTable = () => {
    const [visible, setVisible] = useState(false)
    const [adminId, setAdminId] = useState('')

    return (
      <div className="table-responsive">
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">No.</CTableHeaderCell>
              <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
              <CTableHeaderCell scope="col">User ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {admins.data.map((admin, i) => {
              const { id, nama, user_id } = admin
              return (
                <CTableRow key={id}>
                  <CTableHeaderCell scope="row">{i + 1}</CTableHeaderCell>
                  <CTableDataCell>{nama}</CTableDataCell>
                  <CTableDataCell>{user_id}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      onClick={() => {
                        navigate(`/admin/edit/${id}`)
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
                        setAdminId(id)
                      }}
                      size="sm"
                    >
                      Inactive
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
          <CModalBody>Apakah yakin akan inactive admin tersebut ?</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Batal
            </CButton>
            <CButton color="danger" onClick={() => inactiveAdminByIdFunc(adminId)}>
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
            <strong>Data Admin</strong>
          </CCardHeader>
          <CCardBody>{admins.success ? <AdminTable /> : admins.message}</CCardBody>
        </CCard>
      </div>
    </CRow>
  )
}

export default DataMenu
