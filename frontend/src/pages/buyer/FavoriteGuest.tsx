import { useNavigate } from 'react-router-dom';
import styles from './FavoriteGuest.module.css';

import iconBack from '../../assets/icons/icon-back.svg';
import homeOutline from '../../assets/icons/home-outline.svg';
import walletOutline from '../../assets/icons/wallet-outline.svg';
import heartFill from '../../assets/icons/heart-fill.svg';
import userOutline from '../../assets/icons/user-outline.svg';

export default function FavoriteBuyer() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.scrollArea}>
        
        {/* HEADER */}
        <div className={styles.header}>
          <img 
            src={iconBack} 
            alt="Back" 
            className={styles.backIcon} 
            onClick={() => navigate('/')} 
          />
          <h2 className={styles.headerTitle}>Favorit Saya</h2>
        </div>      
      </div>

      <div className={styles.content}>
        <p className={styles.messageText}>
          Anda belum login,<br />
          akses semua fitur aplikasi setelah login ke akunmu
        </p>
        <button className={styles.btnContinue}
          onClick={() => navigate('/login')}
        >Lanjutkan</button>
      </div>

      <div className={styles.bottomNav}>
        <div className={styles.navItem} onClick={() => navigate('/')}>
          <img src={homeOutline} alt="Beranda" className={styles.navIcon} />
          <span>Beranda</span>
        </div>
        
        <div className={styles.navItem} onClick={() => navigate('/dompet')}>
          <img src={walletOutline} alt="Dompet" className={styles.navIcon} />
          <span>Dompet</span>
        </div>
        
        <div className={`${styles.navItem} ${styles.active}`}>
          <img src={heartFill} alt="Favorit" className={styles.navIcon} />
          <span>Favorit</span>
        </div>
        
        <div className={styles.navItem} onClick={() => navigate('/profil')}>
          <img src={userOutline} alt="Saya" className={styles.navIcon} />
          <span>Saya</span>
        </div>
      </div>
    </div>
  );
}