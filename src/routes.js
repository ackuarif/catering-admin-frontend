import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const TambahMenu = React.lazy(() => import('./views/menu/TambahMenu'))
const DataMenu = React.lazy(() => import('./views/menu/DataMenu'))
const EditMenu = React.lazy(() => import('./views/menu/EditMenu'))

const TambahAdmin = React.lazy(() => import('./views/admin/TambahAdmin'))
const DataAdmin = React.lazy(() => import('./views/admin/DataAdmin'))
const EditAdmin = React.lazy(() => import('./views/admin/EditAdmin'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/menu/tambah', name: 'Tambah Menu', element: TambahMenu },
  { path: '/menu/data', name: 'Data Menu', element: DataMenu },
  { path: '/menu/edit/:id', name: 'Edit Menu', element: EditMenu },
  { path: '/admin/tambah', name: 'Tambah Admin', element: TambahAdmin },
  { path: '/admin/data', name: 'Data Admin', element: DataAdmin },
  { path: '/admin/edit/:id', name: 'Edit Admin', element: EditAdmin },
]

export default routes
