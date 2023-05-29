import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CButton, CForm, CInputGroup, CFormInput, CToaster } from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { addKomplainAdmin } from 'src/utils/api'
import Toast from 'src/components/Toast'

const KomplainInput = ({ reloadParent }) => {
  const navigate = useNavigate()

  const [toast, addToast] = useState(0)

  const { id } = useParams()
  const [komplain, setKomplain] = useState('')

  const komplainSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    const addKomplainAdminReq = await addKomplainAdmin({
      user_id: id,
      ket: komplain,
    })

    if (!addKomplainAdminReq.success) {
      addToast(<Toast color="danger" body={addKomplainAdminReq.message} />)
      return
    }

    if (reloadParent) reloadParent()
  }

  return (
    <CForm className="row g-3" onSubmit={komplainSubmit}>
      <CToaster push={toast} placement="top-end" />
      <CInputGroup>
        <CFormInput
          type="text"
          required
          placeholder="Tulis komplain di sini"
          onChange={(e) => {
            setKomplain(e.target.value)
          }}
        />
        <CButton color="primary" type="submit">
          Kirim
        </CButton>
      </CInputGroup>
    </CForm>
  )
}

KomplainInput.propTypes = {
  reloadParent: PropTypes.func,
}

export default KomplainInput
