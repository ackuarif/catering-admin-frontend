import React from 'react'
import PropTypes from 'prop-types'
import { CToast, CToastBody, CToastClose } from '@coreui/react'

const Toast = ({ color, body }) => {
  return (
    <CToast autohide={true} color={color} className="text-white align-items-center" visible={true}>
      <div className="d-flex">
        <CToastBody>{body}</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )
}

Toast.propTypes = {
  color: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
}

export default Toast
