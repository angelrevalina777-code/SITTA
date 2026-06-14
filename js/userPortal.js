window.userPortal = (function () {
    // Teks deskripsi dan ringkas disamakan untuk semua kategori buku
    const bookDescriptions = {
        ASIP4301: {
            kategori: 'Komunikasi',
            ringkas: 'Bahan ajar Universitas Terbuka.',
            deskripsi: 'Bahan ajar Universitas Terbuka.'
        },
        EKMA4216: {
            kategori: 'Manajemen',
            ringkas: 'Bahan ajar Universitas Terbuka.',
            deskripsi: 'Bahan ajar Universitas Terbuka.'
        },
        EKMA4310: {
            kategori: 'Kepemimpinan',
            ringkas: 'Bahan ajar Universitas Terbuka.',
            deskripsi: 'Bahan ajar Universitas Terbuka.'
        },
        BIOL4211: {
            kategori: 'Sains',
            ringkas: 'Bahan ajar Universitas Terbuka.',
            deskripsi: 'Bahan ajar Universitas Terbuka.'
        },
        PAUD4401: {
            kategori: 'PAUD',
            ringkas: 'Bahan ajar Universitas Terbuka.',
            deskripsi: 'Bahan ajar Universitas Terbuka.'
        }
    };

    const trackingStatusMap = {
        'Menunggu Diproses': 15,
        'Diproses': 35,
        'Dikemas': 55,
        'Dalam Perjalanan': 70,
        'Dikirim': 85,
        'Selesai': 100
    };

    function getTimeGreeting() {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 11) {
            return 'Selamat Pagi';
        }

        if (hour >= 11 && hour < 15) {
            return 'Selamat Siang';
        }

        if (hour >= 15 && hour < 18) {
            return 'Selamat Sore';
        }

        return 'Selamat Malam';
    }

    function getUserSession() {
        return {
            nama: localStorage.getItem('userNama') || 'Mahasiswa UT',
            role: localStorage.getItem('userRole') || 'Mahasiswa',
            lokasi: localStorage.getItem('userLokasi') || '',
            email: localStorage.getItem('userEmail') || ''
        };
    }

    function formatCurrency(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(amount);
    }

    function getBooks() {
        return inventoryStore.getInventory().map(function (item, index) {
            const extra = bookDescriptions[item.kodeBarang] || {};
            const harga = 45000 + (index * 12000);
            const statusObj = inventoryStore.getStockStatus(item.stok);

            return {
                kodeBarang: item.kodeBarang,
                kodeLokasi: item.kodeLokasi,
                namaBarang: item.namaBarang,
                jenisBarang: item.jenisBarang,
                edisi: item.edisi,
                stok: item.stok,
                cover: item.cover,
                kategori: extra.kategori || 'Umum',
                ringkas: extra.ringkas || 'Bahan ajar Universitas Terbuka.',
                deskripsi: extra.deskripsi || 'Bahan ajar Universitas Terbuka.',
                harga: harga,
                hargaLabel: formatCurrency(harga),
                stockStatus: statusObj,
                // FIX: Menambahkan properti .status berupa string teks langsung ("Stok Aman", dll)
                // agar dibaca dengan benar oleh modal popup di halaman HTML utama
                status: statusObj ? statusObj.label : 'Stok Aman'
            };
        });
    }

    function getSavedOrders() {
        try {
            return JSON.parse(localStorage.getItem('userOrders') || '[]');
        } catch (error) {
            return [];
        }
    }

    function saveOrders(orders) {
        localStorage.setItem('userOrders', JSON.stringify(orders));
    }

    function buildOrderNumber(existingCount) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const sequence = String(existingCount + 1).padStart(3, '0');
        return 'UT' + year + month + day + sequence;
    }

    function normalizeTrackingData() {
        const savedOrders = getSavedOrders();
        const legacyOrders = Object.keys(dataTracking).map(function (no) {
            const item = dataTracking[no];
            const progress = trackingStatusMap[item.status] || 65;

            return {
                nomor: no,
                nama: item.nama,
                status: item.status,
                ekspedisi: item.ekspedisi,
                tanggal: item.tanggalKirim,
                paket: item.paket,
                total: item.total,
                alamat: 'Alamat mengikuti data pengiriman UT.',
                persentase: progress,
                perjalanan: item.perjalanan.map(function (step) {
                    return '<b>' + step.waktu + '</b><br>' + step.keterangan;
                })
            };
        });

        return legacyOrders.concat(savedOrders);
    }

    function populateOrderOptions(selectElement, selectedCode) {
        const books = getBooks();
        selectElement.innerHTML = books.map(function (book) {
            const selected = book.kodeBarang === selectedCode ? ' selected' : '';
            return '<option value="' + book.kodeBarang + '"' + selected + '>' + book.kodeBarang + ' - ' + book.namaBarang + '</option>';
        }).join('');
    }

    function renderCatalog(config) {
        const books = getBooks();
        const keyword = (config.keyword || '').toLowerCase().trim();
        const filteredBooks = books.filter(function (book) {
            const haystack = [
                book.kodeBarang,
                book.namaBarang,
                book.kategori,
                book.jenisBarang
            ].join(' ').toLowerCase();
            return !keyword || haystack.includes(keyword);
        });

        config.grid.innerHTML = filteredBooks.map(function (book) {
            return '' +
                '<article class="catalog-card">' +
                    '<img src="' + book.cover + '" alt="' + book.namaBarang + '" class="catalog-cover">' +
                    '<div class="catalog-content">' +
                        '<span class="catalog-chip">' + book.kategori + '</span>' +
                        '<h3>' + book.namaBarang + '</h3>' +
                        '<p class="catalog-code">' + book.kodeBarang + ' • Edisi ' + book.edisi + '</p>' +
                        '<div class="catalog-stock-line">' +
                            '<span class="stock-indicator stock-indicator-' + book.stockStatus.key + '">' +
                                '<span class="stock-indicator-icon">' + book.stockStatus.icon + '</span>' +
                                '<span>' + book.stockStatus.label + '</span>' +
                            '</span>' +
                            '<span class="catalog-stock-count">Jumlah: ' + book.stok + '</span>' +
                        '</div>' +
                        '<p class="catalog-copy">' + book.ringkas + '</p>' +
                        '<div class="catalog-footer">' +
                            '<strong>' + book.hargaLabel + '</strong>' +
                            '<span class="catalog-region-tag">' + (book.kodeLokasi || 'Lokasi belum diisi') + '</span>' +
                        '</div>' +
                        '<div class="catalog-actions">' +
                            '<button type="button" class="btn-secondary" data-detail="' + book.kodeBarang + '">Detail</button>' +
                            '<button type="button" class="btn-search catalog-order-btn" data-order="' + book.kodeBarang + '">Pesan</button>' +
                        '</div>' +
                    '</div>' +
                '</article>';
        }).join('');

        if (config.count) {
            config.count.textContent = String(filteredBooks.length);
        }

        if (config.empty) {
            config.empty.hidden = filteredBooks.length !== 0;
        }
    }

    function renderTrackingResult(orderNo, elements) {
        const match = normalizeTrackingData().find(function (item) {
            return item.nomor.toLowerCase() === orderNo.toLowerCase();
        });

        if (!match) {
            elements.card.hidden = true;
            if (elements.feedback) {
                elements.feedback.textContent = 'Nomor pesanan tidak ditemukan.';
            }
            if (elements.timeline) {
                elements.timeline.innerHTML = '';
            }
            return false;
        }

        if (elements.feedback) {
            elements.feedback.textContent = '';
        }

        elements.nomor.textContent = match.nomor;
        elements.nama.textContent = match.nama;
        elements.status.textContent = match.status;
        elements.ekspedisi.textContent = match.ekspedisi;
        elements.tanggal.textContent = match.tanggal;
        elements.total.textContent = match.total;
        elements.paket.textContent = match.paket;
        elements.alamat.textContent = match.alamat;
        elements.timeline.innerHTML = match.perjalanan.map(function (item) {
            return '<li>' + item + '</li>';
        }).join('');
        elements.progress.style.width = match.persentase + '%';
        elements.progress.textContent = match.persentase + '%';
        elements.card.hidden = false;
        return true;
    }

    function getLatestOrderNumber() {
        const orders = getSavedOrders();
        return orders.length ? orders[orders.length - 1].nomor : '';
    }

    function createOrder(formData) {
        const books = getBooks();
        const selectedBook = books.find(function (book) {
            return book.kodeBarang === formData.kodeBarang;
        });

        if (!selectedBook) {
            return null;
        }

        const savedOrders = getSavedOrders();
        const orderNumber = buildOrderNumber(savedOrders.length);
        const totalPrice = Number(formData.qty) * selectedBook.harga;
        const orderDate = new Date().toISOString().slice(0, 10);
        const noteEntry = formData.catatan
            ? '<b>' + orderDate + ' 08:20:00</b><br>Catatan pemesan: ' + formData.catatan
            : '<b>' + orderDate + ' 08:20:00</b><br>Menunggu proses verifikasi pembayaran dan pengemasan.';

        const newOrder = {
            nomor: orderNumber,
            nama: formData.nama,
            nim: formData.nim,
            lokasi: formData.lokasi,
            status: 'Menunggu Diproses',
            ekspedisi: formData.ekspedisi,
            tanggal: orderDate,
            paket: selectedBook.kodeBarang + ' - ' + selectedBook.namaBarang + ' x' + formData.qty,
            total: formatCurrency(totalPrice),
            alamat: formData.alamat,
            persentase: 15,
            perjalanan: [
                '<b>' + orderDate + ' 08:00:00</b><br>Pesanan dibuat melalui portal mahasiswa.',
                '<b>' + orderDate + ' 08:15:00</b><br>Admin menerima permintaan bahan ajar.',
                noteEntry
            ]
        };

        savedOrders.push(newOrder);
        saveOrders(savedOrders);
        return newOrder;
    }

    function fillUserGreeting(greetingElement, summaryElement) {
        const session = getUserSession();
        greetingElement.textContent = getTimeGreeting() + ', ' + session.nama;
        summaryElement.textContent = session.role + (session.lokasi ? ' - ' + session.lokasi : '') + '. Gunakan portal ini untuk memilih bahan ajar, membuat pesanan, dan memantau pengiriman.';
    }

    return {
        getTimeGreeting: getTimeGreeting,
        getUserSession: getUserSession,
        getBooks: getBooks,
        getSavedOrders: getSavedOrders,
        populateOrderOptions: populateOrderOptions,
        renderCatalog: renderCatalog,
        renderTrackingResult: renderTrackingResult,
        getLatestOrderNumber: getLatestOrderNumber,
        createOrder: createOrder,
        fillUserGreeting: fillUserGreeting
    };
})();