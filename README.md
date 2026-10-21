# Project Praktikum Modul 4 — RESTful API dan Konsumsi API

Project latihan mandiri untuk Modul 4. Project ini dirancang agar praktikan tidak harus menyelesaikan project Modul 1–3 terlebih dahulu.

## Isi fitur

- CRUD Mata Kuliah
- Data Program Studi untuk relasi
- API Resource untuk format JSON
- Validasi menggunakan Form Request
- Pengujian API melalui Postman
- Konsumsi API melalui halaman HTML + Fetch API
- Autentikasi token menggunakan Laravel Sanctum
- Seeder data program studi, mata kuliah, dan akun demo

## Persyaratan

- PHP sesuai versi yang didukung versi Laravel yang dipakai
- Composer
- MySQL/MariaDB
- Node.js dan NPM (opsional jika hanya menggunakan halaman demo sederhana)
- Postman

## C. Konfigurasi database

Buat database MySQL, misalnya `modul4_api`. Sesuaikan `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=modul4_api
DB_USERNAME=root
DB_PASSWORD=
```

Jalankan:

```bash
php artisan migrate
php artisan db:seed
```

Seeder membuat program studi, contoh mata kuliah, dan akun demo. Jangan jalankan seeder berulang kali jika sudah ada data unik yang sama, kecuali seeder menggunakan `updateOrCreate` seperti yang disediakan.

## D. Jalankan aplikasi

```bash
php artisan route:list --path=api
php artisan serve
```

Buka halaman demo:
`http://127.0.0.1:8000/modul4-demo/index.html`

Base URL API:
`http://127.0.0.1:8000/api/v1`

## E. Akun demo

- Email: `admin@example.com`
- Password: `password123`

Akun ini hanya untuk lingkungan lokal praktikum. Jangan gunakan kredensial tersebut di server publik.

## F. Endpoint utama

| Method    | Endpoint                   | Kegunaan                       |
| --------- | -------------------------- | ------------------------------ |
| POST      | `/api/v1/login`            | Login dan mendapatkan token    |
| GET       | `/api/v1/program-studi`    | Mengambil daftar program studi |
| GET       | `/api/v1/mata-kuliah`      | Mengambil semua mata kuliah    |
| POST      | `/api/v1/mata-kuliah`      | Menambah mata kuliah           |
| GET       | `/api/v1/mata-kuliah/{id}` | Melihat detail mata kuliah     |
| PUT/PATCH | `/api/v1/mata-kuliah/{id}` | Mengubah mata kuliah           |
| DELETE    | `/api/v1/mata-kuliah/{id}` | Menghapus mata kuliah          |
| GET       | `/api/v1/me`               | Profil pengguna yang login     |
| POST      | `/api/v1/logout`           | Menghapus token aktif          |

Pada contoh ini, endpoint CRUD dan daftar program studi dibuat publik agar praktikan dapat mempelajari CRUD terlebih dahulu. Endpoint `/me` dan `/logout` dilindungi middleware Sanctum. Jika materi mengharuskan CRUD juga dilindungi, pindahkan route CRUD ke dalam grup `auth:sanctum`.

## G. Contoh body untuk menambah mata kuliah

Gunakan Postman → Body → raw → JSON:

```json
{
  "program_studi_id": 1,
  "kode_mk": "SI204",
  "nama_mk": "Pemrograman API",
  "sks": 3,
  "semester": 4,
  "status_aktif": true
}
```

Pastikan `program_studi_id` merujuk pada data program studi yang tersedia.

## H. Status respons yang diharapkan

- `200 OK`: membaca atau memperbarui data berhasil
- `201 Created`: data baru berhasil dibuat
- `204 No Content`: data berhasil dihapus tanpa body respons
- `401 Unauthorized`: autentikasi tidak ada/tidak valid
- `404 Not Found`: resource tidak ditemukan
- `422 Unprocessable Content`: validasi gagal

## Catatan penting

Kode ini merupakan bahan ajar. Sesuaikan versi PHP/Laravel dan periksa kembali hasilnya di lingkungan praktikum sebelum repository dibagikan ke seluruh kelas.
