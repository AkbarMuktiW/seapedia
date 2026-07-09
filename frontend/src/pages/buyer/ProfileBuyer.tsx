import { useNavigate } from 'react-router-dom';
import styles from './ProfileBuyer.module.css';

import iconCartWhite from '../../assets/icons/icon-cart.svg';
import iconChatWhite from '../../assets/icons/icon-chat.svg';
import iconBagBlue from '../../assets/icons/icon-bag-blue.svg';
import iconDikemas from '../../assets/icons/icon-dikemas.svg';
import iconPickup from '../../assets/icons/icon-pickup.svg';
import iconDikirim from '../../assets/icons/icon-dikirim.svg';
import iconSelesai from '../../assets/icons/icon-selesai.svg';
import iconDiretur from '../../assets/icons/icon-diretur.svg';

import iconHistoryOrder from '../../assets/icons/icon-history-order.svg';
import iconThumb from '../../assets/icons/icon-thumb.svg';
import iconLogout from '../../assets/icons/icon-logout.svg';
import iconArrowRight from '../../assets/icons/icon-arrow-right.svg';

import iconHomeOutline from '../../assets/icons/home-outline.svg';
import iconWalletOutline from '../../assets/icons/wallet-outline.svg';
import iconHeartOutline from '../../assets/icons/heart-outline.svg';
import iconUserFill from '../../assets/icons/user-fill.svg';

export default function ProfileBuyer() {
  const navigate = useNavigate();
  const dummyReviews = Array.from({ length: 4 });

  const handleLogout = () => {
    alert('Anda telah logout.');
    navigate('/');
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.scrollArea}>
        <div className={styles.bannerSection}>
          <div className={styles.topBannerRow}>
            <div className={styles.buyerBadge}>
              <img src={iconBagBlue} alt="Bag" className={styles.badgeIcon} />
              Pembeli
            </div>
            <div className={styles.bannerIcons}>
              <img src={iconCartWhite} alt="Cart" className={styles.bannerActionIcon} onClick={() => navigate('/keranjang-pembeli')} />
              <img src={iconChatWhite} alt="Chat" className={styles.bannerActionIcon} onClick={() => navigate('/pesan-pembeli')} />
            </div>
          </div>
          <div className={styles.userInfoRow}>
            <div className={styles.userAvatar}></div>
            <span className={styles.userName}>Nama</span>
          </div>
        </div>

        <div className={styles.orderStatusCard}>
          <div className={styles.statusItem}>
            <img src={iconDikemas} alt="Dikemas" className={styles.statusIcon} />
            <span className={styles.statusText}>Dikemas</span>
          </div>
          <div className={styles.statusItem}>
            <img src={iconPickup} alt="Pickup" className={styles.statusIcon} />
            <span className={styles.statusText}>Pickup</span>
          </div>
          <div className={styles.statusItem}>
            <img src={iconDikirim} alt="Dikirim" className={styles.statusIcon} />
            <span className={styles.statusText}>Dikirim</span>
          </div>
          <div className={styles.statusItem}>
            <img src={iconSelesai} alt="Selesai" className={styles.statusIcon} />
            <span className={styles.statusText}>Selesai</span>
          </div>
          <div className={styles.statusItem}>
            <img src={iconDiretur} alt="Diretur" className={styles.statusIcon} />
            <span className={styles.statusText}>Diretur</span>
          </div>
        </div>

        <div className={styles.menuListCard}>
          <div className={styles.menuListItem}>
            <div className={styles.menuLeft}>
              <img src={iconHistoryOrder} alt="Riwayat" className={styles.menuIcon} />
              <span>Riwayat pesanan</span>
            </div>
            <img src={iconArrowRight} alt="Arrow" className={styles.arrowIcon} />
          </div>
          
          <div className={styles.menuListItem} onClick={() => navigate('/tulis-ulasan')}>
            <div className={styles.menuLeft}>
              <img src={iconThumb} alt="Ulasan" className={styles.menuIcon} />
              <span>Tulis ulasan anda</span>
            </div>
            <img src={iconArrowRight} alt="Arrow" className={styles.arrowIcon} />
          </div>

          <div className={styles.menuListItem} onClick={handleLogout}>
            <div className={styles.menuLeft}>
              <img src={iconLogout} alt="Logout" className={styles.menuIcon} />
              <span>Logout</span>
            </div>
            <img src={iconArrowRight} alt="Arrow" className={styles.arrowIcon} />
          </div>
        </div>

        <div className={styles.reviewList}>
          {dummyReviews.map((_, index) => (
            <div key={index} className={styles.reviewCard}>
              <div className={styles.reviewerProfile}>
                <div className={styles.avatarSmall}></div>
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

      <div className={styles.bottomNav}>
        <div className={styles.navItem} onClick={() => navigate('/beranda-pembeli')}>
          <img src={iconHomeOutline} alt="Beranda" className={styles.navIcon} />
          <span>Beranda</span>
        </div>
        
        <div className={styles.navItem} onClick={() => navigate('/dompet-pembeli')}>
          <img src={iconWalletOutline} alt="Dompet" className={styles.navIcon} />
          <span>Dompet</span>
        </div>
        
        <div className={styles.navItem}
          onClick={() => navigate('/favorit')}>
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