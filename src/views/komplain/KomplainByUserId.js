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
import { getKomplainByUserId } from 'src/utils/api'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'
import KomplainInput from './KomplainInput'

const KomplainByPemesananId = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [toast, addToast] = useState(0)

  const { id } = useParams()
  const [komplains, setKomplains] = useState({})
  const [komplain, setKomplain] = useState('')

  useEffect(() => {
    componentDidMount()
  }, [])

  const getKomplainByUserIdFunc = async () => {
    setIsLoading(true)
    const getKomplainByUserIdReq = await getKomplainByUserId(id)
    setIsLoading(false)
    setKomplains(getKomplainByUserIdReq)
  }

  const componentDidMount = async () => {
    await getKomplainByUserIdFunc()
  }

  const KomplainTable = () => {
    return (
      <div style={{ height: '400px', overflowY: 'scroll', overflowX: 'hidden' }}>
        {komplains.data.map((data, i) => {
          const { id, nama, ket, user_type, created_at } = data
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
                    <CCardText style={{ marginBottom: '0px' }}>{ket}</CCardText>
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
            <strong>Komplain</strong>
          </CCardHeader>
          <CCardBody>
            {komplains.success ? <KomplainTable /> : komplains.message}
            <KomplainInput reloadParent={getKomplainByUserIdFunc} />
          </CCardBody>
        </CCard>
      </div>
    </CRow>
  )
}

export default KomplainByPemesananId
