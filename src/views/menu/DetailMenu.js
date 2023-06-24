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
  CTableRow,
  CTableBody,
  CTableDataCell,
  CTableHeaderCell,
  CTableHead,
} from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  addMenuGambar,
  addMenuIsi,
  deleteMenuGambar,
  deleteMenuIsi,
  getMenuById,
  getMenuGambarByMenuId,
  getMenuIsiByMenuid,
  updateMenu,
} from 'src/utils/api'
import Toast from 'src/components/Toast'

const DetailMenu = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [toast, addToast] = useState(0)

  const { id } = useParams()
  const [nama, setNama] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [harga, setHarga] = useState('')
  const [diskon, setDiskon] = useState('')
  const [tersedia, setTersedia] = useState('1')
  const [gambar_utama, setGambarUtama] = useState(null)

  const [isi, setIsi] = useState('')
  const [gambar, setGambar] = useState(null)

  const [menu_isis, setMenuIsis] = useState({})
  const [menu_gambars, setMenuGambars] = useState({})

  useEffect(() => {
    componentDidMount()
  }, [])

  const componentDidMount = async () => {
    await getMenuByIdFunc()
    await getMenuIsiByMenuIdFunc()
    await getMenuGambarByMenuIdFunc()
  }

  const getMenuByIdFunc = async () => {
    setIsLoading(true)
    const getMenuByIdReq = await getMenuById(id)
    setIsLoading(false)

    if (!getMenuByIdReq.success) {
      addToast(<Toast color="danger" body={getMenuByIdReq.message} />)
      navigate('/menu/tambah')
      return
    }

    setNama(getMenuByIdReq.data.nama)
    setDeskripsi(getMenuByIdReq.data.detail)
    setHarga(getMenuByIdReq.data.harga)
    setDiskon(getMenuByIdReq.data.diskon)
    setTersedia(getMenuByIdReq.data.tersedia)
    setGambarUtama(getMenuByIdReq.data.gambar)
    if (getMenuByIdReq.data.tersedia == null) setTersedia('1')
  }

  const handleSubmitMenuIsi = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    setIsLoading(true)

    const addMenuIsiReq = await addMenuIsi({
      menu_id: id,
      isi,
    })

    setIsLoading(false)

    if (!addMenuIsiReq.success) {
      addToast(<Toast color="danger" body={addMenuIsiReq.message} />)
      return
    }
    getMenuIsiByMenuIdFunc()
  }

  const getMenuIsiByMenuIdFunc = async () => {
    const getMenuIsiByMenuidReq = await getMenuIsiByMenuid(id)
    setMenuIsis(getMenuIsiByMenuidReq)
  }

  const deleteMenuIsiFunc = async (id) => {
    setIsLoading(true)
    const deleteMenuIsiReq = await deleteMenuIsi(id)
    setIsLoading(false)

    if (!deleteMenuIsiReq.success) {
      addToast(<Toast color="danger" body={deleteMenuIsiReq.message} />)
      return
    }

    getMenuIsiByMenuIdFunc()
  }

  const handleSubmitMenuGambar = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    setIsLoading(true)

    const addMenuGambarReq = await addMenuGambar({
      menu_id: id,
      gambar,
    })

    setIsLoading(false)

    if (!addMenuGambarReq.success) {
      addToast(<Toast color="danger" body={addMenuGambarReq.message} />)
      return
    }

    getMenuGambarByMenuIdFunc()
  }

  const getMenuGambarByMenuIdFunc = async () => {
    const getMenuGambarByMenuIdReq = await getMenuGambarByMenuId(id)
    setMenuGambars(getMenuGambarByMenuIdReq)
  }

  const deleteMenuGambarFunc = async (id) => {
    setIsLoading(true)
    const deleteMenuGambarReq = await deleteMenuGambar(id)
    setIsLoading(false)

    if (!deleteMenuGambarReq.success) {
      addToast(<Toast color="danger" body={deleteMenuGambarReq.message} />)
      return
    }

    getMenuGambarByMenuIdFunc()
  }

  if (isLoading) return <CSpinner color="primary" />

  return (
    <CRow>
      <CToaster push={toast} placement="top-end" />
      <div>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Detail Menu</strong>
          </CCardHeader>
          <CCardBody>
            <div className="table-responsive">
              <CTable striped hover>
                <CTableBody>
                  <CTableRow key={id}>
                    <CTableDataCell style={{ fontWeight: 'bold' }}>Nama Menu</CTableDataCell>
                    <CTableDataCell>{nama}</CTableDataCell>
                  </CTableRow>
                  <CTableRow key={id}>
                    <CTableDataCell style={{ fontWeight: 'bold' }}>Harga</CTableDataCell>
                    <CTableDataCell>Rp.{harga}</CTableDataCell>
                  </CTableRow>
                  <CTableRow key={id}>
                    <CTableDataCell style={{ fontWeight: 'bold' }}>Gambar Utama</CTableDataCell>
                    <CTableDataCell>
                      <img src={gambar_utama} width="200" />
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </div>
            <hr />
            <h5>Isi Menu</h5>
            <CForm className="row g-3" onSubmit={handleSubmitMenuIsi}>
              <CInputGroup>
                <CFormInput
                  type="text"
                  required
                  placeholder="Masukkan Isi Menu"
                  onChange={(e) => {
                    setIsi(e.target.value)
                  }}
                />
              </CInputGroup>
              <CInputGroup>
                <CButton color="primary" type="submit">
                  Simpan
                </CButton>
              </CInputGroup>
            </CForm>
            <div className="table-responsive">
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">No.</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Isi Menu</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {menu_isis.data?.map((item, i) => {
                    const { id, isi } = item
                    return (
                      <CTableRow key={id}>
                        <CTableDataCell scope="row">{i + 1}</CTableDataCell>
                        <CTableDataCell>{isi}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            className="mb-1 ms-1"
                            color="danger"
                            onClick={() => {
                              deleteMenuIsiFunc(id)
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
            </div>
            <hr />
            <h5>Gambar Menu</h5>
            <CForm className="row g-3" onSubmit={handleSubmitMenuGambar}>
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
            <div className="table-responsive">
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">No.</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Gambar Menu</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {menu_gambars.data?.map((item, i) => {
                    const { id, gambar } = item
                    return (
                      <CTableRow key={id}>
                        <CTableDataCell scope="row">{i + 1}</CTableDataCell>
                        <CTableDataCell>
                          <img src={gambar} width="100" />
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            className="mb-1 ms-1"
                            color="danger"
                            onClick={() => {
                              deleteMenuGambarFunc(id)
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
            </div>
          </CCardBody>
        </CCard>
      </div>
    </CRow>
  )
}

export default DetailMenu
