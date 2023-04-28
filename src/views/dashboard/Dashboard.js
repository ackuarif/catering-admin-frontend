import React, { useEffect, useState } from 'react'

import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

import WidgetsBrand from '../widgets/WidgetsBrand'
import { getJmlKunjunganPerMonth, getJmlPemesananPerMonth } from 'src/utils/api'

const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const [bulan1, setBulan1] = useState([])
  const [jml1, setJml1] = useState([])
  const [bulan2, setBulan2] = useState([])
  const [jml2, setJml2] = useState([])

  useEffect(() => {
    componentDidMount()
  }, [])

  const componentDidMount = async () => {
    const getJmlPemesananPerMonthReq = await getJmlPemesananPerMonth()
    getJmlPemesananPerMonthReq.data.map((data) => {
      setBulan1((prevArr) => [...prevArr, data.bulan])
      setJml1((prevArr) => [...prevArr, data.jml])
    })

    const getJmlKunjunganPerMonthReq = await getJmlKunjunganPerMonth()
    getJmlKunjunganPerMonthReq.data.map((data) => {
      setBulan2((prevArr) => [...prevArr, data.bulan])
      setJml2((prevArr) => [...prevArr, data.jml])
    })
  }

  return (
    <>
      <WidgetsBrand withCharts />
      <CRow>
        <CCol sm={12} lg={6}>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    Pemesanan
                  </h4>
                  <div className="small text-medium-emphasis">January - July 2021</div>
                </CCol>
              </CRow>
              <CChartLine
                style={{ height: '300px', marginTop: '40px' }}
                data={{
                  labels: bulan1,
                  datasets: [
                    {
                      label: 'Jumlah',
                      backgroundColor: 'transparent',
                      borderColor: getStyle('--cui-success'),
                      pointHoverBackgroundColor: getStyle('--cui-success'),
                      borderWidth: 2,
                      data: jml1,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        drawOnChartArea: false,
                      },
                    },
                    y: {
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(250 / 5),
                        max: 250,
                      },
                    },
                  },
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
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={12} lg={6}>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    Kunjungan
                  </h4>
                  <div className="small text-medium-emphasis">January - July 2021</div>
                </CCol>
              </CRow>
              <CChartLine
                style={{ height: '300px', marginTop: '40px' }}
                data={{
                  labels: bulan2,
                  datasets: [
                    {
                      label: 'Jumlah',
                      backgroundColor: 'transparent',
                      borderColor: getStyle('--cui-success'),
                      pointHoverBackgroundColor: getStyle('--cui-success'),
                      borderWidth: 2,
                      data: jml2,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        drawOnChartArea: false,
                      },
                    },
                    y: {
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(250 / 5),
                        max: 250,
                      },
                    },
                  },
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
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
