import { useNavigate } from 'react-router-dom';
import styles from './ProfileCourier.module.css';

import iconCourier from '../../assets/icons/icon-courier.svg';
import iconChat from '../../assets/icons/icon-chat.svg';

import iconThumb from '../../assets/icons/icon-thumb.svg';
import iconLogout from '../../assets/icons/icon-logout.svg';
import iconArrowRight from '../../assets/icons/icon-arrow-right.svg';

import homeOutline from '../../assets/icons/home-outline.svg';
import iconSearchJob from '../../assets/icons/icon-search.svg'; 
import historyOutline from '../../assets/icons/history-outline.svg';
import userFill from '../../assets/icons/user-fill.svg'; // Ikon menu "Saya" aktif

export default function ProfileCourier() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
  };
  const dummyReviews = Array.from({ length: 2 });

  return (
    <div className={styles.container}>
      <div className={styles.scrollArea}>
        <div className={styles.banner}>
          <div className={styles.topRow}>
            <div className={styles.roleBadge}>
              <img src={iconCourier} alt="Courier" className={styles.badgeIcon} />
              <span>Kurir</span>
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
              <strong>Nama Kurir</strong>
            </div>
          </div>
        </div>

        <div className={styles.contentArea}>
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

      <div className={styles.bottomNav}>
        <div className={styles.navItem} onClick={() => navigate('/beranda-kurir')}>
          <img src={homeOutline} alt="Beranda" className={styles.navIcon} />
          <span>Beranda</span>
        </div>
        
        <div className={styles.navItem} onClick={() => navigate('/cari-job')}>
          <img src={iconSearchJob} alt="Cari Job" className={styles.navIcon} />
          <span>Cari Job</span>
        </div>
        
        <div className={styles.navItem} onClick={() => navigate('/riwayat-kurir')}>
          <img src={historyOutline} alt="Riwayat" className={styles.navIcon} />
          <span>Riwayat</span>
        </div>
        
        <div className={`${styles.navItem} ${styles.active}`}>
          <img src={userFill} alt="Saya" className={styles.navIcon} />
          <span>Saya</span>
        </div>
      </div>
    </div>
  );
}