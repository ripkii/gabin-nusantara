// --- SISTEM CUSTOM TOAST ---
function showToast(message) {
    const toast = document.getElementById("custom-toast");
    toast.innerText = message;
    toast.classList.add("show");
    setTimeout(() => { toast.classList.remove("show"); }, 3000); 
}

// --- NAVIGASI ANTAR MENU ---
function pindahTab(viewId, navId) {
    document.querySelectorAll('.section-view').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    
    document.getElementById(viewId).classList.add('active');
    document.getElementById(navId).classList.add('active');
    
    window.scrollTo(0, 0);
}

// --- PEMESANAN VIA GOOGLE FORM ---
function pesanViaGForm() {
    // ⚠️ Ganti link ini dengan Link Google Form Klien Lu ⚠️
    const linkGForm = "https://forms.gle/CONTOH_LINK_FORM_KAMU_DISINI";
    
    // Ini buat buka tab baru ke GForm
    window.open(linkGForm, '_blank');
}


// --- RATING & REVIEW (Tersimpan di Browser) ---
let bintangPilihan = 0;

function setBintang(angka) {
    bintangPilihan = angka;
    let stars = document.getElementById('star-rating').children;
    for (let i = 0; i < 5; i++) {
        stars[i].style.transform = 'scale(0.8)';
        setTimeout(() => stars[i].style.transform = 'scale(1)', 150);
        stars[i].style.color = i < angka ? '#FFB800' : '#e4d5cc';
    }
}

function submitReview() {
    const nama = document.getElementById('reviewer-name').value;
    const teks = document.getElementById('review-text').value;

    if (bintangPilihan === 0 || nama === "") {
        showToast("Tolong isi nama dan pencet bintangnya dulu ya!");
        return;
    }

    let reviews = JSON.parse(localStorage.getItem('gabinReviewsNew')) || [];
    reviews.unshift({ nama: nama, bintang: bintangPilihan, teks: teks });
    localStorage.setItem('gabinReviewsNew', JSON.stringify(reviews));

    showToast("Terima kasih! Review kamu berhasil dikirim. ❤️");
    
    document.getElementById('reviewer-name').value = "";
    document.getElementById('review-text').value = "";
    setBintang(0);
    tampilkanReview();
}

function tampilkanReview() {
    const reviewList = document.getElementById('review-list');
    let reviews = JSON.parse(localStorage.getItem('gabinReviewsNew')) || [];
    reviewList.innerHTML = "";

    reviews.slice(0, 5).forEach(rev => {
        let starsHTML = '★'.repeat(rev.bintang) + '☆'.repeat(5 - rev.bintang);
        reviewList.innerHTML += `
            <div class="review-item">
                <h4>${rev.nama}</h4>
                <div class="stars-given">${starsHTML}</div>
                <p>"${rev.teks}"</p>
            </div>
        `;
    });
}


// --- VOTING FLAVOR LAB (Tersimpan di Browser) ---
let voteData = JSON.parse(localStorage.getItem('gabinVotesNew')) || { straw: 15, choco: 10 };

function prosesVote(pilihan) {
    voteData[pilihan] += 1;
    localStorage.setItem('gabinVotesNew', JSON.stringify(voteData));
    updateVoteUI();
    showToast('Yay! Pilihanmu berhasil disave. 💡');
}

function updateVoteUI() {
    let totalVotes = voteData.straw + voteData.choco;
    if(totalVotes === 0) return; 

    let percentStraw = Math.round((voteData.straw / totalVotes) * 100);
    let percentChoco = 100 - percentStraw; 

    const barStraw = document.getElementById('bar-straw');
    const barChoco = document.getElementById('bar-choco');

    barStraw.style.width = percentStraw + '%';
    barStraw.innerText = percentStraw + '%';
    
    barChoco.style.width = percentChoco + '%';
    barChoco.innerText = percentChoco + '%';
}

// Render Review dan Vote pas pertama web dibuka
window.onload = () => {
    tampilkanReview();
    updateVoteUI();
};
// --- HUBUNGI ADMIN VIA WA ---
function hubungiAdmin() {
    const noWA = "6282320060075"; // Ganti dengan nomor Admin
    
    // Kode \uD83D\uDE0A adalah sistem baca untuk emoji 😊 (dijamin gak akan error  lagi)
    const pesan = "Halo Admin Gabin Nusantara!\nSaya mau tanya tentang menu dan promo Gabin Nusantara, yaa \uD83D\uDE0A";
    
    const url = `https://api.whatsapp.com/send?phone=${noWA}&text=${encodeURIComponent(pesan)}`;
    
    window.open(url, '_blank');
}
