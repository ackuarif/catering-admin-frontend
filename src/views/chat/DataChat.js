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
import { getChatAll, getChatBalas, inactiveChatById } from 'src/utils/api'
import Toast from 'src/components/Toast'

const DataChat = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [toast, addToast] = useState(0)

  const [chats, setChats] = useState({})

  useEffect(() => {
    componentDidMount()
  }, [])

  const getChatBalasFunc = async () => {
    setIsLoading(true)
    const getChatBalasReq = await getChatBalas()
    setIsLoading(false)
    setChats(getChatBalasReq)
  }

  const componentDidMount = async () => {
    await getChatBalasFunc()
  }

  const ChatTable = () => {
    return (
      <div className="table-responsive">
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">No.</CTableHeaderCell>
              <CTableHeaderCell scope="col">No.Pemesanan</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tgl Chat</CTableHeaderCell>
              <CTableHeaderCell scope="col">Isi Chat</CTableHeaderCell>
              <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {chats.data.map((data, i) => {
              const { id, no_pesan, created_at, chat, pemesanan_id } = data
              return (
                <CTableRow key={id}>
                  <CTableHeaderCell scope="row">{i + 1}</CTableHeaderCell>
                  <CTableDataCell>{no_pesan}</CTableDataCell>
                  <CTableDataCell>{created_at}</CTableDataCell>
                  <CTableDataCell>{chat}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      onClick={() => {
                        navigate(`/tools/chatting/${pemesanan_id}`)
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
            <strong>Data Chat</strong>
          </CCardHeader>
          <CCardBody>{chats.success ? <ChatTable /> : chats.message}</CCardBody>
        </CCard>
      </div>
    </CRow>
  )
}

export default DataChat
