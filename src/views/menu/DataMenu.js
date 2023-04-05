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
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { addMenu, getMenuAll } from 'src/utils/api'
import Toast from 'src/components/Toast'

const DataMenu = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const [menus, setMenus] = useState([])

  useEffect(() => {
    componentDidMount()
  }, [])

  const componentDidMount = async () => {
    setIsLoading(true)
    const getMenuAllReq = await getMenuAll()
    setIsLoading(false)
    setMenus(getMenuAllReq)
  }

  const MenuTable = () => {
    return (
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
                  <img src={gambar} width="50" />
                </CTableDataCell>
                <CTableDataCell>
                  <CButton color="primary" size="sm">
                    Edit
                  </CButton>
                  <CButton color="danger" size="sm">
                    Hapus
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
    )
  }

  if (isLoading) return <CSpinner color="primary" />

  return (
    <CRow>
      <div>
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
