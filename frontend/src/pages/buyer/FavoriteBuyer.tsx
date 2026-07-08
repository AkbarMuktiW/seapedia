import { useNavigate } from 'react-router-dom';
import styles from './FavoriteBuyer.module.css';

// Ikon Header
import iconBack from '../../assets/icons/icon-back.svg';

// Ikon Navbar Bawah Pembeli
import homeOutline from '../../assets/icons/home-outline.svg';
import walletOutline from '../../assets/icons/wallet-outline.svg';
import heartFill from '../../assets/icons/heart-fill.svg'; // Aktif
import userOutline from '../../assets/icons/user-outline.svg';

export default function FavoriteBuyer() {
  const navigate = useNavigate();

  // Dummy data array untuk 6 produk favorit sesuai wireframe
  const dummyFavorites = Array.from({ length: 6 });

  return (
    <div className={styles.container}>
      <div className={styles.scrollArea}>
        
        {/* HEADER */}
        <div className={styles.header}>
          <img 
            src={iconBack} 
            alt="Back" 
            className={styles.backIcon} 
            onClick={() => navigate('/beranda-pembeli')} 
          />
          <h2 className={styles.headerTitle}>Favorit Saya</h2>
        </div>

        {/* KONTEN GRID */}
        <div className={styles.contentArea}>
          {dummyFavorites.map((_, index) => (
            <div key={index} className={styles.productCard}>
              <div className={styles.productImage}></div>
              <div className={styles.productInfo}></div>
            </div>
          ))}
        </div>
        
      </div>

      {/* NAVBAR BAWAH (PEMBELI) */}
      <div className={styles.bottomNav}>
        <div className={styles.navItem} onClick={() => navigate('/beranda-pembeli')}>
          <img src={homeOutline} alt="Beranda" className={styles.navIcon} />
          <span>Beranda</span>
        </div>
        
        <div className={styles.navItem} onClick={() => navigate('/dompet-pembeli')}>
          <img src={walletOutline} alt="Dompet" className={styles.navIcon} />
          <span>Dompet</span>
        </div>
        
        {/* Menu Favorit Aktif */}
        <div className={`${styles.navItem} ${styles.active}`}>
          <img src={heartFill} alt="Favorit" className={styles.navIcon} />
          <span>Favorit</span>
        </div>
        
        <div className={styles.navItem} onClick={() => navigate('/profil-pembeli')}>
          <img src={userOutline} alt="Saya" className={styles.navIcon} />
          <span>Saya</span>
        </div>
      </div>
    </div>
  );
}