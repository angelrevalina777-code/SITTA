var dataPengguna = [
    {
        id: 1,
        nama: "Rina Wulandari",
        email: "rina@ut.ac.id",
        password: "rina123",
        role: "UPBJJ-UT",
        lokasi: "UPBJJ Jakarta"
    },
    {
        id: 2,
        nama: "Agus Pranoto",
        email: "agus@ut.ac.id",
        password: "agus123",
        role: "UPBJJ-UT",
        lokasi: "UPBJJ Makassar"
    },
    {
        id: 3,
        nama: "Siti Marlina",
        email: "siti@ut.ac.id",
        password: "siti123",
        role: "Puslaba",
        lokasi: "Pusat"
    },
    {
        id: 4,
        nama: "Doni Setiawan",
        email: "doni@ut.ac.id",
        password: "doni123",
        role: "Fakultas",
        lokasi: "FISIP"
    },
    {
        id: 5,
        nama: "Admin SITTA",
        email: "admin@ut.ac.id",
        password: "admin123",
        role: "Administrator",
        lokasi: "Pusat"
    },
    {
        id: 6,
        nama: "Angel Permata",
        email: "angel@ut.ac.id",
        password: "angel123",
        role: "Mahasiswa",
        lokasi: "Bandung"
    }
];

var dataBahanAjar = [
    {
        kodeLokasi: "0TMP01",
        kodeBarang: "ASIP4301",
        namaBarang: "Pengantar Ilmu Komunikasi",
        jenisBarang: "BMP",
        edisi: "2",
        stok: 548,
        cover: "img/pengantar_komunikasi.jpg"
    },
    {
        kodeLokasi: "0JKT01",
        kodeBarang: "EKMA4216",
        namaBarang: "Manajemen Keuangan",
        jenisBarang: "BMP",
        edisi: "3",
        stok: 392,
        cover: "img/manajemen_keuangan.jpg"
    },
    {
        kodeLokasi: "0SBY02",
        kodeBarang: "EKMA4310",
        namaBarang: "Kepemimpinan",
        jenisBarang: "BMP",
        edisi: "1",
        stok: 278,
        cover: "img/kepemimpinan.jpg"
    },
    {
        kodeLokasi: "0MLG01",
        kodeBarang: "BIOL4211",
        namaBarang: "Mikrobiologi Dasar",
        jenisBarang: "BMP",
        edisi: "2",
        stok: 165,
        cover: "img/mikrobiologi.jpg"
    },
    {
        kodeLokasi: "0UPBJJBDG",
        kodeBarang: "PAUD4401",
        namaBarang: "Perkembangan Anak Usia Dini",
        jenisBarang: "BMP",
        edisi: "4",
        stok: 204,
        cover: "img/paud_perkembangan.jpeg"
    }
];

var dataTracking = {
    "2023001234": {
        nomorDO: "2023001234",
        nama: "Rina Wulandari",
        status: "Dalam Perjalanan",
        ekspedisi: "JNE",
        tanggalKirim: "2025-08-25",
        paket: "0JKT01",
        total: "Rp 180.000",
        perjalanan: [
            {
                waktu: "2025-08-25 10:12:20",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
            },
            {
                waktu: "2025-08-25 14:07:56",
                keterangan: "Tiba di Hub: TANGERANG SELATAN"
            },
            {
                waktu: "2025-08-25 10:12:20",
                keterangan: "Diteruskan ke Kantor Jakarta Selatan"
            },
        ]
    },
    "2023005678": {
        nomorDO: "2023005678",
        nama: "Agus Pranoto",
        status: "Dikirim",
        ekspedisi: "Pos Indonesia",
        tanggalKirim: "2025-08-25",
        paket: "0UPBJJBDG",
        total: "Rp 220.000",
        perjalanan: [
            {
                waktu: "2025-08-25 10:12:20",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
            },
            {
                waktu: "2025-08-25 14:07:56",
                keterangan: "Tiba di Hub: TANGERANG SELATAN"
            },
            {
                waktu: "2025-08-25 16:30:10",
                keterangan: "Diteruskan ke Kantor Kota Bandung"
            },
            {
                waktu: "2025-08-26 12:15:33",
                keterangan: "Tiba di Hub: Kota BANDUNG"
            },
            {
                waktu: "2025-08-26 15:06:12",
                keterangan: "Proses antar ke Cimahi"
            },
            {
                waktu: "2025-08-26 20:00:00",
                keterangan: "Selesai Antar. Penerima: Agus Pranoto"
            }
        ]
    }
};

// Tambahkan mock data ini jika file js/inventoryStore.js Anda masih kosong
window.inventoryStore = window.inventoryStore || {
    getInventory: function() {
        return [
            {
                cover: "img/buku1.jpg", // Ganti dengan path gambar cover yang ada
                namaBarang: "Pemasangan & Jaringan Komputer",
                jenisBarang: "BMP",
                kodeBarang: "MSIM4204",
                edisi: "2",
                kodeLokasi: "LOK-A1",
                region: "Bandung",
                kategori: "Sains",
                stok: 0
            },
            {
                cover: "img/buku2.jpg",
                namaBarang: "Manajemen Strategis",
                jenisBarang: "BMP",
                kodeBarang: "EKMA4414",
                edisi: "1",
                kodeLokasi: "LOK-B3",
                region: "Jakarta",
                kategori: "Manajemen",
                stok: 8
            },
            {
                cover: "img/buku3.jpg",
                namaBarang: "Teori Komunikasi Berkelanjutan",
                jenisBarang: "BMP",
                kodeBarang: "SKOM4315",
                edisi: "3",
                kodeLokasi: "LOK-C2",
                region: "Yogyakarta",
                kategori: "Komunikasi",
                stok: 150
            }
        ];
    },
    getStockStatus: function(stok) {
        if (stok === 0) return { key: 'red', icon: '•', shortLabel: 'Habis' };
        if (stok <= 10) return { key: 'yellow', icon: '•', shortLabel: 'Min' };
        return { key: 'green', icon: '•', shortLabel: 'Aman' };
    }
};

const inventoryData = [
    {
        cover: "img/pengantar_komunikasi.jpg",
        namaBarang: "Pengantar Ilmu Komunikasi",
        jenisBarang: "BMP",
        kodeBarang: "SKOM4101",
        edisi: "1",
        kodeLokasi: "LOK-A01",
        region: "Bandung",
        kategori: "Komunikasi",
        stok: 0
    },
    {
        cover: "img/manajemen_keuangan.jpg",
        namaBarang: "Manajemen Keuangan",
        jenisBarang: "BMP",
        kodeBarang: "EKMA4213",
        edisi: "2",
        kodeLokasi: "LOK-B05",
        region: "Jakarta",
        kategori: "Manajemen",
        stok: 5
    },
    {
        cover: "img/kepemimpinan.jpg",
        namaBarang: "Kepemimpinan Organisasi",
        jenisBarang: "BMP",
        kodeBarang: "ADPU4334",
        edisi: "1",
        kodeLokasi: "LOK-C02",
        region: "Yogyakarta",
        kategori: "Kepemimpinan",
        stok: 120
    },
    {
        cover: "img/mikrobiologi.jpg",
        namaBarang: "Mikrobiologi Dasar",
        jenisBarang: "BMP",
        kodeBarang: "BIOL4211",
        edisi: "3",
        kodeLokasi: "LOK-D03",
        region: "Surabaya",
        kategori: "Sains",
        stok: 85
    },
    {
        cover: "img/paud_perkembangan.jpeg",
        namaBarang: "Perkembangan Anak Usia Dini",
        jenisBarang: "BMP",
        kodeBarang: "PAUD4102",
        edisi: "2",
        kodeLokasi: "LOK-E12",
        region: "Bandung",
        kategori: "PAUD",
        stok: 3
    }
];

window.inventoryStore = {
    getInventory: function() {
        return inventoryData;
    },
    getStockStatus: function(stok) {
        if (stok === 0) return { key: 'red', icon: '•', shortLabel: 'Stok Habis' };
        if (stok <= 10) return { key: 'yellow', icon: '•', shortLabel: 'Stok Minimum' };
        return { key: 'green', icon: '•', shortLabel: 'Stok Aman' };
    },
    findBook: function(kode) {
        return inventoryData.find(b => b.kodeBarang === kode);
    },
    upsertBook: function(book) {
        const index = inventoryData.findIndex(b => b.kodeBarang === book.kodeBarang);
        if (index > -1) {
            inventoryData[index] = book;
        } else {
            inventoryData.push(book);
        }
        return book;
    },
    deleteBook: function(kode) {
        const index = inventoryData.findIndex(b => b.kodeBarang === kode);
        if (index > -1) inventoryData.splice(index, 1);
    }
};

