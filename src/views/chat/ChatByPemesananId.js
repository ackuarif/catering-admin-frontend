import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CSpinner,
  CAvatar,
  CCol,
  CCardText,
} from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { getChatByPemesananId } from 'src/utils/api'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'
import ChatInput from './ChatInput'

const ChatByPemesananId = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [toast, addToast] = useState(0)

  const { id } = useParams()
  const [chats, setChats] = useState({})
  const [chatting, setChatting] = useState('')

  useEffect(() => {
    componentDidMount()
  }, [])

  const getChatByPemesananIdFunc = async () => {
    setIsLoading(true)
    const getChatByPemesananIdReq = await getChatByPemesananId(id)
    setIsLoading(false)
    setChats(getChatByPemesananIdReq)
  }

  const componentDidMount = async () => {
    await getChatByPemesananIdFunc()
  }

  const ChatTable = () => {
    return (
      <div style={{ height: '400px', overflowY: 'scroll', overflowX: 'hidden' }}>
        {chats.data.map((data, i) => {
          const { id, nama, chat, user_type, created_at } = data
          return (
            <CCard key={id} className="mb-2">
              <CRow>
                <CCol style={{ maxWidth: '70px' }} className="pt-3 ps-4">
                  <CAvatar color="secondary" status="success" size="lg">
                    <CIcon icon={cilUser} />
                  </CAvatar>
                </CCol>
                <CCol>
                  <CCardBody style={{ padding: '5px' }}>
                    <CCardText style={{ marginBottom: '0px' }}>
                      <strong>
                        {nama} ({user_type})
                      </strong>
                    </CCardText>
                    <CCardText style={{ marginBottom: '0px' }}>{chat}</CCardText>
                    <CCardText style={{ marginBottom: '0px', fontStyle: 'italic' }}>
                      <small className="text-medium-emphasis">{created_at}</small>
                    </CCardText>
                  </CCardBody>
                </CCol>
              </CRow>
            </CCard>
          )
        })}
      </div>
    )
  }

  if (isLoading) return <CSpinner color="primary" />

  return (
    <CRow>
      <div>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Chatting</strong>
          </CCardHeader>
          <CCardBody>
            {chats.success ? <ChatTable /> : chats.message}
            <ChatInput reloadParent={getChatByPemesananIdFunc} />
          </CCardBody>
        </CCard>
      </div>
    </CRow>
  )
}

export default ChatByPemesananId
