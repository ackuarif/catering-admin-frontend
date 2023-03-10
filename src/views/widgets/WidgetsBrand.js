import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { CWidgetStatsD, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibFacebook, cibLinkedin, cibTwitter, cilBarChart, cilCalendar } from '@coreui/icons'
import { CChart } from '@coreui/react-chartjs'
import { getJmlPemesananCurrentMonth, getJmlPemesananPrevMonth } from 'src/utils/api'

const WidgetsBrand = ({ withCharts }) => {
  const [jmlPemesananCurrentMonth, setJmlPemesananCurrentMonth] = useState(0)
  const [jmlPemesananPrevMonth, setJmlPemesananPrevMonth] = useState(0)

  useEffect(() => {
    componentDidMount()
  }, [])

  const componentDidMount = async () => {
    const getJmlPemesananCurrentMonthReq = await getJmlPemesananCurrentMonth()
    const getJmlPemesananPrevMonthReq = await getJmlPemesananPrevMonth()
    setJmlPemesananCurrentMonth(getJmlPemesananCurrentMonthReq.data)
    setJmlPemesananPrevMonth(getJmlPemesananPrevMonthReq.data)
  }

  const chartOptions = {
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
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
            { title: 'items', value: '3' },
            { title: 'events', value: '12+' },
            { title: 'meetings', value: '4' },
            { title: 'meet', value: '4' },
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
