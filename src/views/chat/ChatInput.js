import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CButton, CForm, CInputGroup, CFormInput, CToaster } from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { addChatAdmin } from 'src/utils/api'
import Toast from 'src/components/Toast'

const ChatInput = ({ reloadParent }) => {
  const navigate = useNavigate()

  const [toast, addToast] = useState(0)

  const { id } = useParams()
  const [chat, setChat] = useState('')

  const chatSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    const addChatAdminReq = await addChatAdmin({
      pemesanan_id: id,
      chat,
    })

    if (!addChatAdminReq.success) {
      addToast(<Toast color="danger" body={addChatAdminReq.message} />)
      return
    }

    if (reloadParent) reloadParent()
  }

  return (
    <CForm className="row g-3" onSubmit={chatSubmit}>
      <CToaster push={toast} placement="top-end" />
      <CInputGroup>
        <CFormInput
          type="text"
          required
          placeholder="Tulis chat di sini"
          onChange={(e) => {
            setChat(e.target.value)
          }}
        />
        <CButton color="primary" type="submit">
          Kirim
        </CButton>
      </CInputGroup>
    </CForm>
  )
}

ChatInput.propTypes = {
  reloadParent: PropTypes.func,
}

export default ChatInput
