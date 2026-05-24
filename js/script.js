// --- LOGIKA INDEX ---
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    // Mencari pengguna di array dataPengguna
    const user = dataPengguna.find(u => u.email === emailInput && u.password === passwordInput);

    if (user) {
        // Simpan data login ke session sementara
        localStorage.setItem('userNama', user.nama);
        localStorage.setItem('userRole', user.role);
        window.location.href = "dashboard.html";
    } else {
        alert("Email atau Password salah!");
    }
});


// --- LOGIKA STOK ---
if (document.getElementById('stockTableBody')) {
    const tbody = document.getElementById('stockTableBody');
    dataBahanAjar.forEach(item => {
        tbody.innerHTML += `
            <tr>
                <td><img src="${item.cover}" width="50" alt="cover"></td>
                <td>${item.kodeBarang}</td>
                <td>${item.namaBarang}</td>
                <td>${item.edisi}</td>
                <td>${item.stok}</td>
                <td>${item.kodeLokasi}</td>
            </tr>
        `;
    });
}


// --- LOGIKA TRACKING ---
function searchTracking() {
    const noDO = document.getElementById('nomorDO').value;
    const resultDiv = document.getElementById('trackingResult');
    
    // Mengambil data dari objek dataTracking berdasarkan key (nomor DO)
    const data = dataTracking[noDO];

    if (data) {
        let historyHTML = '';
        data.perjalanan.forEach(step => {
            historyHTML += `<li><small>${step.waktu}</small><br>${step.keterangan}</li>`;
        });

        resultDiv.innerHTML = `
            <div style="margin-top:20px; border-top: 1px solid #ccc; padding-top:10px;">
                <h4>Hasil Pelacakan: ${data.nomorDO}</h4>
                <p><strong>Penerima:</strong> ${data.nama}</p>
                <p><strong>Status:</strong> ${data.status}</p>
                <p><strong>Ekspedisi:</strong> ${data.ekspedisi}</p>
                <p><strong>Total:</strong> ${data.total}</p>
                <h5>Riwayat Perjalanan:</h5>
                <ul style="font-size: 0.9em; line-height: 1.6;">${historyHTML}</ul>
            </div>
        `;
    } else {
        resultDiv.innerHTML = `<p style="color:red; margin-top:20px;">Nomor DO tidak ditemukan!</p>`;
    }
}