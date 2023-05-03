import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilChatBubble,
  cilDescription,
  cilPencil,
  cilSave,
  cilSettings,
  cilSpeedometer,
  cilStorage,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Pemesanan',
  },
  {
    component: CNavItem,
    name: 'Verifikasi',
    to: '/pemesanan/verifikasi',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Proses',
    to: '/pemesanan/proses',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Selesai',
    to: '/pemesanan/selesai',
    icon: <CIcon icon={cilSave} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Tools',
  },
  {
    component: CNavItem,
    name: 'Chatting',
    to: '/tools/chatting',
    icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Laporan',
    to: '/tools/laporan',
    icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Menu Catering',
  },
  {
    component: CNavItem,
    name: 'Tambah Menu',
    to: '/menu/tambah',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Data Menu',
    to: '/menu/data',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Admin',
  },
  {
    component: CNavItem,
    name: 'Tambah Admin',
    to: '/admin/tambah',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Data Admin',
    to: '/admin/data',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Setting',
  },
  {
    component: CNavItem,
    name: 'Setting',
    to: '/tools/setting',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
]

export default _nav
