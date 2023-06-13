import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const TambahMenu = React.lazy(() => import('./views/menu/TambahMenu'))
const DataMenu = React.lazy(() => import('./views/menu/DataMenu'))
const EditMenu = React.lazy(() => import('./views/menu/EditMenu'))

const TambahAdmin = React.lazy(() => import('./views/admin/TambahAdmin'))
const DataAdmin = React.lazy(() => import('./views/admin/DataAdmin'))
const EditAdmin = React.lazy(() => import('./views/admin/EditAdmin'))

const TambahWilayah = React.lazy(() => import('./views/wilayah/TambahWilayah'))
const DataWilayah = React.lazy(() => import('./views/wilayah/DataWilayah'))
const EditWilayah = React.lazy(() => import('./views/wilayah/EditWilayah'))

const DataVerifikasiPemesanan = React.lazy(() => import('./views/pemesanan/DataVerifikasi'))
const DataProsesPemesanan = React.lazy(() => import('./views/pemesanan/DataProses'))
const DataSelesaiPemesanan = React.lazy(() => import('./views/pemesanan/DataSelesai'))
const DetailPemesanan = React.lazy(() => import('./views/pemesanan/DetailPemesanan'))

const Pendapatan = React.lazy(() => import('./views/laporan/Pendapatan'))
const Chatting = React.lazy(() => import('./views/chat/DataChat'))
const ChatByPemesananId = React.lazy(() => import('./views/chat/ChatByPemesananId'))
const Komplain = React.lazy(() => import('./views/komplain/DataKomplain'))
const KomplainByUserId = React.lazy(() => import('./views/komplain/KomplainByUserId'))
const Setting = React.lazy(() => import('./views/setting/EditSetting'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/menu/tambah', name: 'Tambah Menu', element: TambahMenu },
  { path: '/menu/data', name: 'Data Menu', element: DataMenu },
  { path: '/menu/edit/:id', name: 'Edit Menu', element: EditMenu },
  { path: '/admin/tambah', name: 'Tambah Admin', element: TambahAdmin },
  { path: '/admin/data', name: 'Data Admin', element: DataAdmin },
  { path: '/admin/edit/:id', name: 'Edit Admin', element: EditAdmin },
  { path: '/wilayah/tambah', name: 'Tambah Wilayah', element: TambahWilayah },
  { path: '/wilayah/data', name: 'Data Wilayah', element: DataWilayah },
  { path: '/wilayah/edit/:id', name: 'Edit Wilayah', element: EditWilayah },
  { path: '/pemesanan/verifikasi', name: 'Data Verifikasi', element: DataVerifikasiPemesanan },
  { path: '/pemesanan/proses', name: 'Data Proses', element: DataProsesPemesanan },
  { path: '/pemesanan/selesai', name: 'Data Selesai', element: DataSelesaiPemesanan },
  { path: '/pemesanan/detail/:id', name: 'Detail Pemesanan', element: DetailPemesanan },
  { path: '/tools/laporan', name: 'Laporan', element: Pendapatan },
  { path: '/tools/chatting', name: 'Chatting', element: Chatting },
  { path: '/tools/chatting/:id', name: 'Chat By Pemesanan', element: ChatByPemesananId },
  { path: '/tools/setting', name: 'Setting', element: Setting },
  { path: '/tools/komplain', name: 'Komplain', element: Komplain },
  { path: '/tools/komplain/:id', name: 'Komplain By Pelanggan', element: KomplainByUserId },
]

export default routes
