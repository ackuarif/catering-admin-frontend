// const BASE_URL = 'http://localhost:8000/api'
// const BASE_URL = 'http://192.168.1.4:8000/api';
const BASE_URL = 'https://api.tomboluwe.my.id/api'

function getAccessToken() {
  return localStorage.getItem('accessToken')
}

function putAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken)
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  })
}

async function login({ user_id, password }) {
  const response = await fetch(`${BASE_URL}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id, password }),
  })

  return await response.json()
}

async function register(data) {
  const response = await fetch(`${BASE_URL}/pelanggan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

async function getMenuById(id) {
  const response = await fetch(`${BASE_URL}/menu/getMenuById/${id}`)
  const data = await response.json()
  return data
}

async function getSelfUser() {
  const response = await fetchWithToken(`${BASE_URL}/admin/getSelfUser`)
  return await response.json()
}

async function addChatAdmin(data) {
  const response = await fetchWithToken(`${BASE_URL}/chat/addChatAdmin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

async function addPembayaran(data) {
  const formData = new FormData()
  const { id, tgl_bayar, bukti_bayar } = data
  formData.append('id', id)
  formData.append('tgl_bayar', tgl_bayar)
  formData.append('bukti_bayar', bukti_bayar)

  const response = await fetchWithToken(`${BASE_URL}/pemesanan/addPembayaran`, {
    method: 'POST',
    body: formData,
  })

  return await response.json()
}

async function getKeranjangAll() {
  const response = await fetchWithToken(`${BASE_URL}/keranjang`)
  return await response.json()
}

async function getKeranjangByPemesananId(pemesananId) {
  const response = await fetchWithToken(
    `${BASE_URL}/keranjang/getKeranjangByPemesananId/${pemesananId}`,
  )
  return await response.json()
}

async function getPemesananAll() {
  const response = await fetchWithToken(`${BASE_URL}/pemesanan`)
  return await response.json()
}

async function getPemesananById(id) {
  const response = await fetchWithToken(`${BASE_URL}/pemesanan/getById/${id}`)
  return await response.json()
}

async function getTotalKeranjangByPelanggan() {
  const response = await fetchWithToken(`${BASE_URL}/keranjang/getTotalKeranjangByPelanggan`)
  return await response.json()
}

async function getChatByPemesananId(pemesananId) {
  const response = await fetchWithToken(`${BASE_URL}/chat/getChatByPemesananId/${pemesananId}`)
  return await response.json()
}

async function getTotalByPemesananId(id) {
  const response = await fetchWithToken(`${BASE_URL}/keranjang/getTotalByPemesananId/${id}`)
  return await response.json()
}

async function getJmlPemesananCurrentMonth() {
  const response = await fetchWithToken(`${BASE_URL}/pemesanan/getJmlPemesananCurrentMonth`)
  return await response.json()
}

async function getJmlPemesananPrevMonth() {
  const response = await fetchWithToken(`${BASE_URL}/pemesanan/getJmlPemesananPrevMonth`)
  return await response.json()
}

async function addMenu(data) {
  const formData = new FormData()
  const { nama, deskripsi, harga, diskon, tersedia, gambar } = data
  formData.append('nama', nama)
  formData.append('detail', deskripsi)
  formData.append('harga', harga)
  formData.append('diskon', diskon)
  formData.append('tersedia', tersedia)
  formData.append('gambar', gambar)

  const response = await fetchWithToken(`${BASE_URL}/menu`, {
    method: 'POST',
    body: formData,
  })

  return await response.json()
}

async function getMenuAll() {
  const response = await fetchWithToken(`${BASE_URL}/menu`)
  return await response.json()
}

async function deleteMenuById(id) {
  const response = await fetchWithToken(`${BASE_URL}/menu/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await response.json()
}

async function updateMenu(data) {
  const formData = new FormData()
  const { id, nama, deskripsi, harga, diskon, tersedia, gambar } = data
  formData.append('nama', nama)
  formData.append('detail', deskripsi)
  formData.append('harga', harga)
  formData.append('diskon', diskon)
  formData.append('tersedia', tersedia)
  formData.append('gambar', gambar)

  const response = await fetchWithToken(`${BASE_URL}/menu/${id}`, {
    method: 'PUT',
    body: formData,
  })

  return await response.json()
}

async function addAdmin(data) {
  const response = await fetchWithToken(`${BASE_URL}/admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

async function getAdminAll() {
  const response = await fetchWithToken(`${BASE_URL}/admin`)
  return await response.json()
}

async function inactiveAdminById(id) {
  const response = await fetchWithToken(`${BASE_URL}/admin/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await response.json()
}

async function updateAdmin(data) {
  const { id } = data

  const response = await fetchWithToken(`${BASE_URL}/admin/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

async function getAdminById(id) {
  const response = await fetchWithToken(`${BASE_URL}/admin/getAdminById/${id}`)
  const data = await response.json()
  return data
}

async function getPemesananUnpaid() {
  const response = await fetchWithToken(`${BASE_URL}/pemesanan/getPemesananUnpaid`)
  return await response.json()
}

async function getPemesananVerif() {
  const response = await fetchWithToken(`${BASE_URL}/pemesanan/getPemesananVerif`)
  return await response.json()
}

async function getPemesananProses() {
  const response = await fetchWithToken(`${BASE_URL}/pemesanan/getPemesananProses`)
  return await response.json()
}

async function getPemesananSelesai() {
  const response = await fetchWithToken(`${BASE_URL}/pemesanan/getPemesananSelesai`)
  return await response.json()
}

async function verifPemesanan(id) {
  const response = await fetchWithToken(`${BASE_URL}/pemesanan/verifPemesanan/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await response.json()
}

async function selesaiPemesanan(id) {
  const response = await fetchWithToken(`${BASE_URL}/pemesanan/selesaiPemesanan/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await response.json()
}

async function getPemesananHeaderById(id) {
  const response = await fetchWithToken(`${BASE_URL}/pemesanan/getPemesananHeaderById/${id}`)
  return await response.json()
}

async function laporanPendapatanByDate(data) {
  const response = await fetchWithToken(`${BASE_URL}/pemesanan/laporanPendapatanByDate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}

async function getChatBalas() {
  const response = await fetchWithToken(`${BASE_URL}/chat/getChatBalas`)
  return await response.json()
}

async function getJmlPemesananPerMonth() {
  const response = await fetchWithToken(`${BASE_URL}/pemesanan/getJmlPemesananPerMonth`)
  return await response.json()
}

async function getJmlKunjunganPerMonth() {
  const response = await fetchWithToken(`${BASE_URL}/log/getJmlKunjunganPerMonth`)
  return await response.json()
}

async function getSettingAll() {
  const response = await fetchWithToken(`${BASE_URL}/setting`)
  return await response.json()
}

async function updateSetting(data) {
  const response = await fetchWithToken(`${BASE_URL}/setting`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

async function addKomplainAdmin(data) {
  const response = await fetchWithToken(`${BASE_URL}/komplain/addKomplainAdmin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

async function getKomplainBalas() {
  const response = await fetchWithToken(`${BASE_URL}/komplain/getKomplainBalas`)
  return await response.json()
}

async function getKomplainByUserId(id) {
  const response = await fetchWithToken(`${BASE_URL}/komplain/${id}`)
  return await response.json()
}

async function addWilayah(data) {
  const response = await fetchWithToken(`${BASE_URL}/wilayah`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

async function getWilayahAll() {
  const response = await fetchWithToken(`${BASE_URL}/wilayah`)
  return await response.json()
}

async function inactiveWilayahById(id) {
  const response = await fetchWithToken(`${BASE_URL}/wilayah/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await response.json()
}

async function updateWilayah(data) {
  const { id } = data

  const response = await fetchWithToken(`${BASE_URL}/wilayah/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

async function getWilayahById(id) {
  const response = await fetchWithToken(`${BASE_URL}/wilayah/getWilayahById/${id}`)
  const data = await response.json()
  return data
}

async function addMenuIsi(data) {
  const response = await fetchWithToken(`${BASE_URL}/menu/addMenuIsi`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

async function getMenuIsiByMenuid(menu_id) {
  const response = await fetchWithToken(`${BASE_URL}/menu/getMenuIsiByMenuId/${menu_id}`)
  return await response.json()
}

async function deleteMenuIsi(id) {
  const response = await fetchWithToken(`${BASE_URL}/menu/deleteMenuIsi/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await response.json()
}

async function addMenuGambar(data) {
  const formData = new FormData()
  const { menu_id, gambar } = data
  formData.append('menu_id', menu_id)
  formData.append('gambar', gambar)

  const response = await fetchWithToken(`${BASE_URL}/menu/addMenuGambar`, {
    method: 'POST',
    body: formData,
  })

  return await response.json()
}

async function getMenuGambarByMenuId(menu_id) {
  const response = await fetchWithToken(`${BASE_URL}/menu/getMenuGambarByMenuId/${menu_id}`)
  return await response.json()
}

async function deleteMenuGambar(id) {
  const response = await fetchWithToken(`${BASE_URL}/menu/deleteMenuGambar/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await response.json()
}

export {
  getAccessToken,
  putAccessToken,
  getMenuAll,
  getMenuById,
  getSelfUser,
  addPembayaran,
  getKeranjangAll,
  getPemesananAll,
  getPemesananById,
  getJmlPemesananCurrentMonth,
  getJmlPemesananPrevMonth,
  getKeranjangByPemesananId,
  getTotalKeranjangByPelanggan,
  getTotalByPemesananId,
  addChatAdmin,
  getChatByPemesananId,
  login,
  register,
  addMenu,
  deleteMenuById,
  updateMenu,
  addAdmin,
  getAdminAll,
  inactiveAdminById,
  updateAdmin,
  getAdminById,
  getPemesananVerif,
  getPemesananUnpaid,
  verifPemesanan,
  selesaiPemesanan,
  getPemesananHeaderById,
  getPemesananProses,
  getPemesananSelesai,
  laporanPendapatanByDate,
  getChatBalas,
  getJmlPemesananPerMonth,
  getJmlKunjunganPerMonth,
  getSettingAll,
  updateSetting,
  addKomplainAdmin,
  getKomplainBalas,
  getKomplainByUserId,
  addWilayah,
  getWilayahAll,
  inactiveWilayahById,
  updateWilayah,
  getWilayahById,
  addMenuIsi,
  getMenuIsiByMenuid,
  deleteMenuIsi,
  addMenuGambar,
  getMenuGambarByMenuId,
  deleteMenuGambar,
}
