import styles from './HomeBuyer.module.css';
import { useNavigate } from 'react-router-dom';

import logoFull from '../../assets/images/logo-seapedia-full.png';
import iconSearch from '../../assets/icons/icon-search.svg';
import iconCart from '../../assets/icons/icon-cart.svg';
import iconChat from '../../assets/icons/icon-chat.svg';

import iconHomeFill from '../../assets/icons/home-fill.svg';
import iconWalletOutline from '../../assets/icons/wallet-outline.svg';
import iconHeartOutline from '../../assets/icons/heart-outline.svg';
import iconUserOutline from '../../assets/icons/user-outline.svg';

export default function HomeBuyer() {
  const navigate = useNavigate();
  const dummyProducts = Array.from({ length: 8 });

  return (
    <div className={styles.homeContainer}>
      <div className={styles.header}>
        <button className={styles.btnPembeli}
        >
           Pembeli
        </button>

        <div className={styles.searchRow}>
          <div className={styles.searchBar}>
            <img src={iconSearch} alt="Search" className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Cari kebutuhanmu..." 
              className={styles.searchInput} 
            />
          </div>
          <img
            src={iconCart} 
            alt="Cart" 
            className={styles.actionIcon} 
            onClick={() => navigate('/keranjang-pembeli')}
          />
          <img
            src={iconChat}
            alt="Chat"
            className={styles.actionIcon}
            onClick={() => navigate('/pesan-pembeli')}
          />
        </div>
      </div>

      <div className={styles.scrollableContent}>
        <div className={styles.bannerBox}>
          <img src={logoFull} alt="Seapedia Logo" className={styles.bannerLogo} />
        </div>

        <div className={styles.productGrid}>
          {dummyProducts.map((_, index) => (
            <div 
              key={index} 
              className={styles.productCard} 
              onClick={() => navigate('/detail-produk')}
              style={{cursor: 'pointer'}}
            >
              <div className={styles.productImagePlaceholder}></div>
              <div className={styles.productInfo}>
                <span className={styles.productName}>Nama Produk {index + 1}</span>
                <span className={styles.productPrice}>Rp99.999</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottomNav}>
        <div className={`${styles.navItem} ${styles.active}`}>
          <img src={iconHomeFill} alt="Beranda" className={styles.navIcon} />
          <span>Beranda</span>
        </div>
        
        <div
          className={styles.navItem}
          onClick={() => navigate('/dompet-pembeli')}
        >
          <img src={iconWalletOutline} alt="Dompet" className={styles.navIcon} />
          <span>Dompet</span>
        </div>
        
        <div className={styles.navItem}
          onClick={() => navigate('/favorit')}>
          <img src={iconHeartOutline} alt="Favorit" className={styles.navIcon} />
          <span>Favorit</span>
        </div>

        <div className={styles.navItem}
          onClick={() => navigate('/profil-pembeli')}
        >
          <img src={iconUserOutline} alt="Saya" className={styles.navIcon} />
          <span>Saya</span>
        </div>
        
      </div>

    </div>
  );
}