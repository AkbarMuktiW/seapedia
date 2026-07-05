import styles from './WalletGuest.module.css';
import { useNavigate } from 'react-router-dom';

import iconBack from '../../assets/icons/icon-back.svg';

import iconHomeOutline from '../../assets/icons/home-outline.svg';
import iconWalletFill from '../../assets/icons/wallet-fill.svg'; // Ikon Dompet sekarang Fill
import iconHeartOutline from '../../assets/icons/heart-outline.svg';
import iconUserOutline from '../../assets/icons/user-outline.svg';

export default function WalletGuest() {
  const navigate = useNavigate();
  return (
    <div className={styles.walletContainer}>
      <div className={styles.header}>
        <img 
          src={iconBack}
          alt="Kembali"
          className={styles.backIcon}
          onClick={() => navigate(-1)}
        />
        <span className={styles.headerTitle}>Dompet Saya</span>
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
        <div
          className={styles.navItem}
          onClick={() => navigate('/')}
        >
          <img src={iconHomeOutline} alt="Beranda" className={styles.navIcon} />
          <span>Beranda</span>
        </div>
        
        <div className={`${styles.navItem} ${styles.active}`}>
          <img src={iconWalletFill} alt="Dompet" className={styles.navIcon} />
          <span>Dompet</span>
        </div>
        
        <div className={styles.navItem}>
          <img src={iconHeartOutline} alt="Favorit" className={styles.navIcon} />
          <span>Favorit</span>
        </div>

        <div className={styles.navItem}
          onClick={() => navigate('/profil')}
        >
          <img src={iconUserOutline} alt="Saya" className={styles.navIcon} />
          <span>Saya</span>
        </div>
      </div>
    </div>
  );
}