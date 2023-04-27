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
import { useNavigate, useParams } from 'react-router-dom'
import { getKeranjangByPemesananId, getPemesananHeaderById, selesaiPemesanan } from 'src/utils/api'
import Toast from 'src/components/Toast'
import { verifPemesanan } from '../../utils/api'

const DataVerifikasi = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [toast, addToast] = useState(0)
  const [verifikasiModal, setVerifikasiModal] = useState(false)
  const [selesaiModal, setSelesaiModal] = useState(false)

  const [pemesanan, setPemesanan] = useState({})
  const [items, setItems] = useState({})

  const { id } = useParams()

  useEffect(() => {
    componentDidMount()
  }, [])

  const componentDidMount = async () => {
    await getPemesananFunc()
  }

  const getPemesananFunc = async () => {
    setIsLoading(true)

    const getPemesananHeaderByIdReq = await getPemesananHeaderById(id)
    setPemesanan(getPemesananHeaderByIdReq)

    const getKeranjangByPemesananIdReq = await getKeranjangByPemesananId(id)
    setItems(getKeranjangByPemesananIdReq)

    setIsLoading(false)
  }

  const verifPemesananFunc = async () => {
    setIsLoading(true)

    const verifPemesananReq = await verifPemesanan(id)

    setIsLoading(false)

    setVerifikasiModal(false)

    if (!verifPemesananReq.success) {
      addToast(<Toast color="danger" body={verifPemesananReq.message} />)
      return
    }
    addToast(<Toast color="success" body={verifPemesananReq.message} />)

    getPemesananFunc()
  }

  const selesaiPemesananFunc = async () => {
    setIsLoading(true)

    const selesaiPemesananReq = await selesaiPemesanan(id)

    setIsLoading(false)

    setSelesaiModal(false)

    if (!selesaiPemesananReq.success) {
      addToast(<Toast color="danger" body={selesaiPemesananReq.message} />)
      return
    }
    addToast(<Toast color="success" body={selesaiPemesananReq.message} />)

    getPemesananFunc()
  }

  const PemesananHeader = () => {
    const [pembayaranModal, setPembayaranModal] = useState(false)

    return (
      <div className="table-responsive">
        <CTable striped hover>
          <CTableBody>
            {pemesanan.data.map((data, i) => {
              const {
                id,
                no_pesan,
                tgl_pesan,
                tgl_verif,
                tgl_selesai,
                tgl_bayar,
                nama,
                alamat,
                telepon,
              } = data
              return (
                <>
                  <CTableRow key={id}>
                    <CTableDataCell style={{ fontWeight: 'bold' }}>No.Pemesanan</CTableDataCell>
                    <CTableDataCell>{no_pesan}</CTableDataCell>
                  </CTableRow>
                  <CTableRow key={id}>
                    <CTableDataCell style={{ fontWeight: 'bold' }}>Tgl Pemesanan</CTableDataCell>
                    <CTableDataCell>{tgl_pesan}</CTableDataCell>
                  </CTableRow>
                  <CTableRow key={id}>
                    <CTableDataCell style={{ fontWeight: 'bold' }}>Nama Pelanggan</CTableDataCell>
                    <CTableDataCell>{nama}</CTableDataCell>
                  </CTableRow>
                  <CTableRow key={id}>
                    <CTableDataCell style={{ fontWeight: 'bold' }}>Alamat</CTableDataCell>
                    <CTableDataCell>{alamat}</CTableDataCell>
                  </CTableRow>
                  <CTableRow key={id}>
                    <CTableDataCell style={{ fontWeight: 'bold' }}>Telepon</CTableDataCell>
                    <CTableDataCell>{telepon}</CTableDataCell>
                  </CTableRow>
                  <CTableRow key={id}>
                    <CTableDataCell style={{ fontWeight: 'bold' }}>Pembayaran</CTableDataCell>
                    <CTableDataCell>{tgl_bayar}</CTableDataCell>
                  </CTableRow>
                  <CTableRow key={id}>
                    <CTableDataCell style={{ fontWeight: 'bold' }}>Verifikasi</CTableDataCell>
                    <CTableDataCell>{tgl_verif}</CTableDataCell>
                  </CTableRow>
                  <CTableRow key={id}>
                    <CTableDataCell style={{ fontWeight: 'bold' }}>Selesai</CTableDataCell>
                    <CTableDataCell>{tgl_selesai}</CTableDataCell>
                  </CTableRow>
                </>
              )
            })}
          </CTableBody>
        </CTable>
        <CButton
          onClick={() => {
            setPembayaranModal(true)
          }}
          color="info"
          className="mb-1 ms-1"
          size="sm"
        >
          Lihat Pembayaran
        </CButton>
        <CButton
          onClick={() => {
            setVerifikasiModal(true)
          }}
          color="primary"
          className="mb-1 ms-1"
          size="sm"
        >
          Verifikasi
        </CButton>
        <CButton
          onClick={() => {
            setSelesaiModal(true)
          }}
          color="success"
          className="mb-1 ms-1"
          size="sm"
        >
          Selesai
        </CButton>
        <CButton
          onClick={() => {
            navigate(`/tools/chatting/${id}`)
          }}
          color="warning"
          className="mb-1 ms-1"
          size="sm"
        >
          Chatting
        </CButton>
        <CModal
          size="lg"
          alignment="center"
          visible={pembayaranModal}
          onClose={() => setPembayaranModal(false)}
        >
          <CModalHeader>
            <CModalTitle>Pembayaran</CModalTitle>
          </CModalHeader>
          <CModalBody style={{ textAlign: 'center' }}>
            <img src={pemesanan.data[0].bukti_bayar} width="100%" />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setPembayaranModal(false)}>
              Tutup
            </CButton>
          </CModalFooter>
        </CModal>
        <CModal
          alignment="center"
          visible={verifikasiModal}
          onClose={() => setVerifikasiModal(false)}
        >
          <CModalHeader>
            <CModalTitle>Verifikasi Pemesanan</CModalTitle>
          </CModalHeader>
          <CModalBody>Apakah pemesanan tersebut akan diverifikasi ?</CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={() => verifPemesananFunc()}>
              Verifikasi
            </CButton>
            <CButton color="secondary" onClick={() => setVerifikasiModal(false)}>
              Tutup
            </CButton>
          </CModalFooter>
        </CModal>
        <CModal alignment="center" visible={selesaiModal} onClose={() => setSelesaiModal(false)}>
          <CModalHeader>
            <CModalTitle>Selesai Pemesanan</CModalTitle>
          </CModalHeader>
          <CModalBody>Apakah pemesanan tersebut akan diselesaikan ?</CModalBody>
          <CModalFooter>
            <CButton color="success" onClick={() => selesaiPemesananFunc()}>
              Selesai
            </CButton>
            <CButton color="secondary" onClick={() => setSelesaiModal(false)}>
              Tutup
            </CButton>
          </CModalFooter>
        </CModal>
      </div>
    )
  }

  const PemesananDetail = () => {
    return (
      <div className="table-responsive">
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">No.</CTableHeaderCell>
              <CTableHeaderCell scope="col">Menu</CTableHeaderCell>
              <CTableHeaderCell scope="col">Jumlah</CTableHeaderCell>
              <CTableHeaderCell scope="col">Harga</CTableHeaderCell>
              <CTableHeaderCell scope="col">Diskon</CTableHeaderCell>
              <CTableHeaderCell scope="col">Harga Netto</CTableHeaderCell>
              <CTableHeaderCell scope="col">Subtotal</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {items.data.map((item, i) => {
              const { menu, harga, jumlah, diskon } = item
              const harga_netto = harga - harga * (diskon / 100)
              return (
                <>
                  <CTableRow key={id}>
                    <CTableHeaderCell scope="row">{i + 1}</CTableHeaderCell>
                    <CTableDataCell>{menu.nama}</CTableDataCell>
                    <CTableDataCell>{jumlah}</CTableDataCell>
                    <CTableDataCell>Rp.{harga}</CTableDataCell>
                    <CTableDataCell>{diskon}%</CTableDataCell>
                    <CTableDataCell>Rp.{harga_netto}</CTableDataCell>
                    <CTableDataCell>Rp.{harga_netto * jumlah}</CTableDataCell>
                  </CTableRow>
                </>
              )
            })}
            <CTableRow>
              <CTableDataCell colspan={6} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                Total
              </CTableDataCell>
              <CTableDataCell>Rp.{pemesanan.data[0].total}</CTableDataCell>
            </CTableRow>
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
            <strong>Detail Pemesanan</strong>
          </CCardHeader>
          <CCardBody>{pemesanan.success ? <PemesananHeader /> : pemesanan.message}</CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Detail Item</strong>
          </CCardHeader>
          <CCardBody>{items.success ? <PemesananDetail /> : items.message}</CCardBody>
        </CCard>
      </div>
    </CRow>
  )
}

export default DataVerifikasi
