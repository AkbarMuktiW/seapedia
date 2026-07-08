import { useNavigate } from 'react-router-dom';
import styles from './ProfileSeller.module.css';

// Ikon Banner
import iconSeller from '../../assets/icons/icon-seller.svg';
import iconChat from '../../assets/icons/icon-chat.svg';

// Ikon Status
import iconDikemas from '../../assets/icons/icon-dikemas.svg';
import iconPickup from '../../assets/icons/icon-pickup.svg';
import iconDikirim from '../../assets/icons/icon-dikirim.svg';
import iconSelesai from '../../assets/icons/icon-selesai.svg';
import iconDiretur from '../../assets/icons/icon-diretur.svg';

// Ikon Menu
import iconThumb from '../../assets/icons/icon-thumb.svg';
import iconLogout from '../../assets/icons/icon-logout.svg';
import iconArrowRight from '../../assets/icons/icon-arrow-right.svg';

// Ikon Navbar
import homeOutline from '../../assets/icons/home-outline.svg';
import navProductOutline from '../../assets/icons/nav-product-outline.svg';
import navOrderOutline from '../../assets/icons/nav-order-outline.svg';
import userFill from '../../assets/icons/user-fill.svg'; // Ikon aktif

export default function ProfileSeller() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logika logout, arahkan kembali ke guest
    navigate('/');
  };

  const dummyReviews = Array.from({ length: 4 });

  return (
    <div className={styles.container}>
      <div className={styles.scrollArea}>
        
        {/* 1. BANNER */}
        <div className={styles.banner}>
          <div className={styles.topRow}>
            <div className={styles.roleBadge}>
              <img src={iconSeller} alt="Seller" className={styles.badgeIcon} />
              <span>Penjual</span>
            </div>
            {/* Ikon Keranjang Dihapus, Hanya Ikon Chat Sesuai Permintaan */}
            <img 
              src={iconChat} 
              alt="Chat" 
              className={styles.chatIcon} 
              onClick={() => navigate('/pesan-pembeli')} 
            />
          </div>
          
          <div className={styles.profileRow}>
            <div className={styles.avatar}></div>
            <div className={styles.profileText}>
              <p>Halo,</p>
              <strong>Nama Toko</strong>
            </div>
          </div>
        </div>

        {/* 2. KONTEN TENGAH */}
        <div className={styles.contentArea}>
          
          {/* Kartu Status Pesanan */}
          <div className={styles.statusCard}>
            <div className={styles.statusItem}>
              <div className={styles.statusIconWrapper}>
                <img src={iconDikemas} alt="Dikemas" className={styles.statusIcon} />
                <span className={styles.statusBadgeCount}>0</span>
              </div>
              <span className={styles.statusText}>Dikemas</span>
            </div>
            <div className={styles.statusItem}>
              <div className={styles.statusIconWrapper}>
                <img src={iconPickup} alt="Pickup" className={styles.statusIcon} />
                <span className={styles.statusBadgeCount}>0</span>
              </div>
              <span className={styles.statusText}>Pickup</span>
            </div>
            <div className={styles.statusItem}>
              <div className={styles.statusIconWrapper}>
                <img src={iconDikirim} alt="Dikirim" className={styles.statusIcon} />
                <span className={styles.statusBadgeCount}>0</span>
              </div>
              <span className={styles.statusText}>Dikirim</span>
            </div>
            <div className={styles.statusItem}>
              <div className={styles.statusIconWrapper}>
                <img src={iconSelesai} alt="Selesai" className={styles.statusIcon} />
                <span className={styles.statusBadgeCount}>0</span>
              </div>
              <span className={styles.statusText}>Selesai</span>
            </div>
            <div className={styles.statusItem}>
              <div className={styles.statusIconWrapper}>
                <img src={iconDiretur} alt="Diretur" className={styles.statusIcon} />
                <span className={styles.statusBadgeCount}>0</span>
              </div>
              <span className={styles.statusText}>Diretur</span>
            </div>
          </div>

          {/* Menu List */}
          <div className={styles.menuCard}>
            <div className={styles.menuItem} onClick={() => navigate('/tulis-ulasan')}>
              <div className={styles.menuLeft}>
                <img src={iconThumb} alt="Ulasan" className={styles.menuIcon} />
                <span>Tulis ulasan anda</span>
              </div>
              <img src={iconArrowRight} alt="Arrow" className={styles.arrowIcon} />
            </div>

            <div className={styles.menuItem} onClick={handleLogout}>
              <div className={styles.menuLeft}>
                <img src={iconLogout} alt="Logout" className={styles.menuIcon} />
                <span>Logout</span>
              </div>
              <img src={iconArrowRight} alt="Arrow" className={styles.arrowIcon} />
            </div>
          </div>

          {/* Daftar Ulasan */}
          <div className={styles.reviewList}>
            {dummyReviews.map((_, index) => (
              <div key={index} className={styles.reviewItem}>
                <div className={styles.reviewerHeader}>
                  <div className={styles.reviewerAvatar}></div>
                  <div className={styles.reviewerInfo}>
                    <span className={styles.reviewerName}>Nama</span>
                    <span className={styles.stars}>★★★★★</span>
                  </div>
                </div>
                <p className={styles.reviewText}>
                  Isi ulasan terhadap aplikasi seapedia
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 3. NAVBAR BAWAH */}
      <div className={styles.bottomNav}>
        <div className={styles.navItem} onClick={() => navigate('/beranda-penjual')}>
          <img src={homeOutline} alt="Beranda" className={styles.navIcon} />
          <span>Beranda</span>
        </div>
        
        <div className={styles.navItem} onClick={() => navigate('/produk-penjual')}>
          <img src={navProductOutline} alt="Produk" className={styles.navIcon} />
          <span>Produk</span>
        </div>
        
        <div className={styles.navItem} onClick={() => navigate('/pesanan-penjual')}>
          <img src={navOrderOutline} alt="Pesanan" className={styles.navIcon} />
          <span>Pesanan</span>
        </div>
        
        {/* Ikon Saya Aktif (Fill) */}
        <div className={`${styles.navItem} ${styles.active}`}>
          <img src={userFill} alt="Saya" className={styles.navIcon} />
          <span>Saya</span>
        </div>
      </div>
    </div>
  );
}