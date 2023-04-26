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
import { deleteMenuById, getMenuAll } from 'src/utils/api'
import Toast from 'src/components/Toast'

const DataMenu = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [toast, addToast] = useState(0)

  const [menus, setMenus] = useState({})

  useEffect(() => {
    componentDidMount()
  }, [])

  const getMenuAllReqFunc = async () => {
    setIsLoading(true)
    const getMenuAllReq = await getMenuAll()
    setIsLoading(false)
    setMenus(getMenuAllReq)
  }

  const componentDidMount = async () => {
    await getMenuAllReqFunc()
  }

  const deleteMenuByIdFunc = async (id) => {
    setIsLoading(true)
    const deleteMenuByIdReq = await deleteMenuById(id)
    setIsLoading(false)

    if (!deleteMenuByIdReq.success) {
      addToast(<Toast color="danger" body={deleteMenuByIdReq.message} />)
      return
    }

    await getMenuAllReqFunc()
  }

  const MenuTable = () => {
    const [visible, setVisible] = useState(false)
    const [menuId, setMenuId] = useState('')

    return (
      <div className="table-responsive">
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">No.</CTableHeaderCell>
              <CTableHeaderCell scope="col">Menu</CTableHeaderCell>
              <CTableHeaderCell scope="col">Deskripsi</CTableHeaderCell>
              <CTableHeaderCell scope="col">Harga</CTableHeaderCell>
              <CTableHeaderCell scope="col">Diskon</CTableHeaderCell>
              <CTableHeaderCell scope="col">Gambar</CTableHeaderCell>
              <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {menus.data.map((menu, i) => {
              const { id, nama, detail, harga, diskon, gambar } = menu
              return (
                <CTableRow key={id}>
                  <CTableHeaderCell scope="row">{i + 1}</CTableHeaderCell>
                  <CTableDataCell>{nama}</CTableDataCell>
                  <CTableDataCell>{detail}</CTableDataCell>
                  <CTableDataCell>Rp.{harga}</CTableDataCell>
                  <CTableDataCell>{diskon}%</CTableDataCell>
                  <CTableDataCell>
                    <img src={gambar} width="70" />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      onClick={() => {
                        navigate(`/menu/edit/${id}`)
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
                        setMenuId(id)
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
          <CModalBody>Apakah yakin akan menghapus data tersebut ?</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Batal
            </CButton>
            <CButton color="danger" onClick={() => deleteMenuByIdFunc(menuId)}>
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
            <strong>Data Menu</strong>
          </CCardHeader>
          <CCardBody>{menus.success ? <MenuTable /> : menus.message}</CCardBody>
        </CCard>
      </div>
    </CRow>
  )
}

export default DataMenu
