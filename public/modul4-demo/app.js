const API = `${window.location.origin}/api/v1`;
let token = null;

const message = document.querySelector('#message');
const rows = document.querySelector('#rows');
const authMessage = document.querySelector('#authMessage');

async function requestApi(path, options = {}) {
  const headers = {
    Accept: 'application/json',
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API}${path}`, { ...options, headers });

  if (response.status === 204) {
    return { ok: response.ok, status: response.status, data: null };
  }

  const data = await response.json().catch(() => null);
  return { ok: response.ok, status: response.status, data };
}

function showMessage(text, target = message) {
  target.textContent = text;
}

async function loadProgramStudi() {
  const result = await requestApi('/program-studi');
  const select = document.querySelector('#program_studi_id');
  select.replaceChildren();

  if (!result.ok) {
    showMessage(`Gagal memuat program studi (HTTP ${result.status}).`);
    return;
  }

  const items = result.data?.data ?? [];
  for (const item of items) {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = `${item.kode_prodi} — ${item.nama_prodi}`;
    select.append(option);
  }
}

async function loadMataKuliah() {
  showMessage('Memuat data...');
  const result = await requestApi('/mata-kuliah');

  if (!result.ok) {
    showMessage(`Gagal mengambil data (HTTP ${result.status}).`);
    return;
  }

  rows.replaceChildren();
  const items = result.data?.data ?? [];

  for (const item of items) {
    const tr = document.createElement('tr');
    const values = [
      item.id,
      item.kode_mk,
      item.nama_mk,
      item.sks,
      item.program_studi?.nama_prodi ?? '-'
    ];

    for (const value of values) {
      const td = document.createElement('td');
      td.textContent = String(value ?? '');
      tr.append(td);
    }

    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.addEventListener('click', async () => {
      if (!confirm(`Hapus mata kuliah ${item.kode_mk}?`)) return;
      const deleted = await requestApi(`/mata-kuliah/${item.id}`, { method: 'DELETE' });
      if (deleted.ok) {
        showMessage(`Data ${item.kode_mk} berhasil dihapus (HTTP ${deleted.status}).`);
        await loadMataKuliah();
      } else {
        showMessage(`Gagal menghapus data (HTTP ${deleted.status}).`);
      }
    });
    actionCell.append(deleteButton);
    tr.append(actionCell);
    rows.append(tr);
  }

  showMessage(`Berhasil memuat ${items.length} data (HTTP ${result.status}).`);
}

document.querySelector('#createForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    program_studi_id: Number(document.querySelector('#program_studi_id').value),
    kode_mk: document.querySelector('#kode_mk').value.trim(),
    nama_mk: document.querySelector('#nama_mk').value.trim(),
    sks: Number(document.querySelector('#sks').value),
    semester: Number(document.querySelector('#semester').value),
    status_aktif: true,
  };

  const result = await requestApi('/mata-kuliah', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (result.ok) {
    showMessage(`Data berhasil ditambahkan (HTTP ${result.status}).`);
    await loadMataKuliah();
  } else {
    showMessage(`Gagal menambah data (HTTP ${result.status}).\n${JSON.stringify(result.data, null, 2)}`);
  }
});

document.querySelector('#loginButton').addEventListener('click', async () => {
  const result = await requestApi('/login', {
    method: 'POST',
    body: JSON.stringify({
      email: document.querySelector('#email').value,
      password: document.querySelector('#password').value,
    }),
  });

  if (result.ok && result.data?.access_token) {
    token = result.data.access_token;
    showMessage(`Login berhasil sebagai ${result.data.user.email}. Token tersimpan sementara di memori halaman.`, authMessage);
  } else {
    showMessage(`Login gagal (HTTP ${result.status}).\n${JSON.stringify(result.data, null, 2)}`, authMessage);
  }
});

document.querySelector('#logoutButton').addEventListener('click', async () => {
  if (!token) {
    showMessage('Belum ada token login.', authMessage);
    return;
  }

  const result = await requestApi('/logout', { method: 'POST' });
  token = null;
  showMessage(result.ok ? 'Logout berhasil. Token lokal dihapus.' : `Logout gagal (HTTP ${result.status}).`, authMessage);
});

document.querySelector('#reloadButton').addEventListener('click', loadMataKuliah);

loadProgramStudi();
loadMataKuliah();
