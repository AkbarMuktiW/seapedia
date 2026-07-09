import { useNavigate } from 'react-router-dom';
import styles from './ProfileGuest.module.css';

import iconHomeOutline from '../../assets/icons/home-outline.svg';
import iconWalletOutline from '../../assets/icons/wallet-outline.svg';
import iconHeartOutline from '../../assets/icons/heart-outline.svg';
import iconUserFill from '../../assets/icons/user-fill.svg';
import iconThumb from '../../assets/icons/icon-thumb.svg';
import iconArrowRight from '../../assets/icons/icon-arrow-right.svg';

export default function ProfileGuest() {
  const navigate = useNavigate();
  const dummyReviews = Array.from({ length: 6 });

  return (
    <div className={styles.profileContainer}>
      <div className={styles.scrollArea}>
        <div className={styles.guestNotice}>
          <p className={styles.noticeText}>
            Anda belum login,<br />
            akses semua fitur aplikasi setelah login ke akunmu
          </p>
          <button className={styles.btnLanjutkan}
            onClick={() => navigate('/login')}
          >Lanjutkan</button>
        </div>

        <div className={styles.writeReviewMenu}
          onClick={() => navigate('/tulis-ulasan')}
        >
          <div className={styles.writeReviewLeft}>
            <img src={iconThumb} alt="Thumb" className={styles.iconThumb} />
            <span>Tulis ulasan anda</span>
          </div>
          <img src={iconArrowRight} alt="Arrow" className={styles.iconArrow} />
        </div>

        <div className={styles.reviewList}>
          {dummyReviews.map((_, index) => (
            <div key={index} className={styles.reviewCard}>
              <div className={styles.reviewerProfile}>
                <div className={styles.avatar}></div>
                <div className={styles.reviewerInfo}>
                  <span className={styles.reviewerName}>Nama</span>
                  <span className={styles.stars}>
                    {index % 2 === 0 ? '★★★★★' : '★★★★☆'}
                  </span>
                </div>
              </div>
              <p className={styles.reviewText}>
                Isi ulasan terhadap aplikasi seapedia
              </p>
              
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottomNav}>
        <div className={styles.navItem} onClick={() => navigate('/')}>
          <img src={iconHomeOutline} alt="Beranda" className={styles.navIcon} />
          <span>Beranda</span>
        </div>
        
        <div className={styles.navItem} onClick={() => navigate('/dompet')}>
          <img src={iconWalletOutline} alt="Dompet" className={styles.navIcon} />
          <span>Dompet</span>
        </div>
        
        <div 
          className={styles.navItem}
          onClick={() => navigate('/favorit-guest')}>
          <img src={iconHeartOutline} alt="Favorit" className={styles.navIcon} />
          <span>Favorit</span>
        </div>

        <div className={`${styles.navItem} ${styles.active}`}>
          <img src={iconUserFill} alt="Saya" className={styles.navIcon} />
          <span>Saya</span>
        </div>
      </div>

    </div>
  );
}