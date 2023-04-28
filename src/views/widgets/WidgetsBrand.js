import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { CWidgetStatsD, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibFacebook, cibLinkedin, cibTwitter, cilBarChart, cilCalendar } from '@coreui/icons'
import { CChart } from '@coreui/react-chartjs'
import {
  getChatBalas,
  getJmlPemesananCurrentMonth,
  getJmlPemesananPrevMonth,
  getPemesananProses,
  getPemesananSelesai,
  getPemesananVerif,
} from 'src/utils/api'

const WidgetsBrand = ({ withCharts }) => {
  const [jmlPemesananCurrentMonth, setJmlPemesananCurrentMonth] = useState(0)
  const [jmlPemesananPrevMonth, setJmlPemesananPrevMonth] = useState(0)
  const [jmlVerif, setJmlVerif] = useState(0)
  const [jmlProses, setJmlProses] = useState(0)
  const [jmlSelesai, setJmlSelesai] = useState(0)
  const [jmlChat, setJmlChat] = useState(0)

  useEffect(() => {
    componentDidMount()
  }, [])

  const componentDidMount = async () => {
    const getJmlPemesananCurrentMonthReq = await getJmlPemesananCurrentMonth()
    setJmlPemesananPrevMonth(getJmlPemesananCurrentMonthReq.data)

    const getJmlPemesananPrevMonthReq = await getJmlPemesananPrevMonth()
    setJmlPemesananCurrentMonth(getJmlPemesananPrevMonthReq.data)

    const getPemesananVerifReq = await getPemesananVerif()
    if (getPemesananVerifReq.success) setJmlVerif(getPemesananVerifReq.data.length)

    const getPemesananProsesReq = await getPemesananProses()
    if (getPemesananProsesReq.success) setJmlProses(getPemesananProsesReq.data.length)

    const getPemesananSelesaiReq = await getPemesananSelesai()
    if (getPemesananSelesaiReq.success) setJmlSelesai(getPemesananSelesaiReq.data.length)

    const getChatBalasReq = await getChatBalas()
    if (getChatBalasReq.success) setJmlChat(getChatBalasReq.data.length)
  }

  return (
    <CRow>
      <CCol sm={12} lg={6}>
        <CWidgetStatsD
          className="mb-4"
          icon={<CIcon icon={cilBarChart} height={52} className="my-4 text-white" />}
          values={[
            { title: 'Pemesanan Bulan Ini', value: jmlPemesananCurrentMonth },
            { title: 'Pemesanan Bulan Kemarin', value: jmlPemesananPrevMonth },
          ]}
          style={{
            '--cui-card-cap-bg': '#4875b4',
          }}
        />
      </CCol>

      <CCol sm={12} lg={6}>
        <CWidgetStatsD
          className="mb-4"
          color="warning"
          icon={<CIcon icon={cilCalendar} height={52} className="my-4 text-white" />}
          values={[
            { title: 'Verifikasi', value: jmlVerif },
            { title: 'Proses', value: jmlProses },
            { title: 'Selesai', value: jmlSelesai },
            { title: 'Chatting', value: jmlChat },
          ]}
        />
      </CCol>
    </CRow>
  )
}

WidgetsBrand.propTypes = {
  withCharts: PropTypes.bool,
}

export default WidgetsBrand
