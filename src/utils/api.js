const BASE_URL = 'http://localhost:8000/api'
// const BASE_URL = 'http://192.168.1.4:8000/api';

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

async function getMenuAll() {
  const response = await fetch(`${BASE_URL}/menu`)
  const data = await response.json()
  return data
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

async function addKeranjang(data) {
  const response = await fetchWithToken(`${BASE_URL}/keranjang`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

async function addPemesanan(data) {
  const response = await fetchWithToken(`${BASE_URL}/pemesanan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

async function addChatPelanggan(data) {
  const response = await fetchWithToken(`${BASE_URL}/chat/addChatPelanggan`, {
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

async function deleteKeranjang(id) {
  const response = await fetchWithToken(`${BASE_URL}/keranjang/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
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

export {
  getAccessToken,
  putAccessToken,
  getMenuAll,
  getMenuById,
  getSelfUser,
  addKeranjang,
  addPemesanan,
  addPembayaran,
  deleteKeranjang,
  getKeranjangAll,
  getPemesananAll,
  getPemesananById,
  getKeranjangByPemesananId,
  getTotalKeranjangByPelanggan,
  getTotalByPemesananId,
  addChatPelanggan,
  getChatByPemesananId,
  login,
  register,
}
