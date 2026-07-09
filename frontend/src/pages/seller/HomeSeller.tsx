import { useNavigate } from 'react-router-dom';
import styles from './HomeSeller.module.css';

import iconSeller from '../../assets/icons/icon-seller.svg';
import iconChat from '../../assets/icons/icon-chat.svg';

import homeFill from '../../assets/icons/home-fill.svg';
import navProductOutline from '../../assets/icons/nav-product-outline.svg';
import navOrderOutline from '../../assets/icons/nav-order-outline.svg';
import userOutline from '../../assets/icons/user-outline.svg';

export default function HomeSeller() {
  const navigate = useNavigate();
  const dummyReviews = Array.from({ length: 3 });

  return (
    <div className={styles.container}>
      <div className={styles.scrollArea}>
        <div className={styles.banner}>
          <div className={styles.topRow}>
            <div className={styles.roleBadge}>
              <img src={iconSeller} alt="Seller" className={styles.badgeIcon} />
              <span>Penjual</span>
            </div>
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

        <div className={styles.dashboardSection}>
          <div className={styles.sectionTitle}>Dashboard</div>
          
          <div className={styles.incomeCard}>
            <span className={styles.incomeLabel}>Pendapatan</span>
            <span className={styles.incomeAmount}>Rp999.999.999</span>
            <span className={styles.incomeSub}>Total pendapatan bersih</span>
            <button className={styles.btnWithdraw}>Tarik Dana</button>
          </div>
        </div>

        <div className={styles.contentArea}>
          
          {/* Kartu Statistik */}
          <div className={styles.card}>
            <div className={styles.sectionTitle}>Statistik</div>
            <div className={styles.chartPlaceholder}>
              (Area Grafik dari Backend)
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.sectionTitle}>Ulasan Pelanggan</div>
            
            {dummyReviews.map((_, index) => (
              <div key={index} className={styles.reviewItem}>
                <div className={styles.reviewerHeader}>
                  <div className={styles.reviewerAvatar}></div>
                  <div className={styles.reviewerInfo}>
                    <span className={styles.reviewerName}>Nama Pelanggan</span>
                    <span className={styles.stars}>★★★★★</span>
                  </div>
                </div>
                <p className={styles.reviewText}>
                  Barang sangat bagus, pengemasan rapi dan cepat sampai!
                </p>
              </div>
            ))}
            
          </div>

        </div>
      </div>

      <div className={styles.bottomNav}>
        <div className={`${styles.navItem} ${styles.active}`}>
          <img src={homeFill} alt="Beranda" className={styles.navIcon} />
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
        
        <div className={styles.navItem} onClick={() => navigate('/profil-penjual')}>
          <img src={userOutline} alt="Saya" className={styles.navIcon} />
          <span>Saya</span>
        </div>
      </div>
    </div>
  );
}