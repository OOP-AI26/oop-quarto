# Study Case — Tabungan Sederhana (Quarto Slides)

Deck ini menggunakan **Quarto RevealJS** dan menyediakan beberapa Python playground berbasis **Pyodide**.

## Struktur

- `study-case-tabungan-slides.qmd` — slide utama
- `styles.css` — styling RevealJS + code editor playground
- `playground.js` — runtime Pyodide dan editor
- `playground.html` — memuat JavaScript setelah body
- `_quarto.yml` — konfigurasi project

## Menjalankan

Pastikan Quarto sudah terpasang, lalu dari folder ini:

```bash
quarto preview
```

Atau:

```bash
quarto preview study-case-tabungan-slides.qmd
```

Browser perlu koneksi internet ketika playground Pyodide pertama kali dijalankan karena Python WebAssembly diambil dari jsDelivr.

## Catatan

- Playground **sudah berisi kode lengkap** yang sesuai dengan materi pada slide tersebut.
- Mahasiswa tidak diminta melengkapi TODO di playground.
- Playground digunakan untuk menjalankan, membaca, dan memodifikasi contoh.
- Contoh playground sengaja menggunakan class dan konteks berbeda dari `Tabungan`, tetapi pola konsepnya sama.
- Materi tetap mengarahkan mahasiswa kembali ke starter code `Tabungan` untuk implementasi study case.
