// Pindahkan data inventory ke sini untuk manajemen yang lebih terpusat
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
