import { useNavigate } from 'react-router-dom';
import styles from './ProductDetailGuest.module.css';

import iconBack from '../../assets/icons/icon-back.svg';
import iconCartWhite from '../../assets/icons/icon-cart.svg';
import iconHeartOutline from '../../assets/icons/heart-outline.svg';

import iconChatOutline from '../../assets/icons/icon-chat-blue.svg';
import iconAddCart from '../../assets/icons/icon-add-cart.svg';

export default function ProductDetailGuest() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.scrollArea}>
        <div className={styles.banner}>
          <div 
            className={styles.btnKeluar} 
            onClick={() => navigate(-1)}
          >
            <img src={iconBack} alt="Keluar" className={styles.backIcon} />
            <span>Keluar</span>
          </div>
          <img 
            src={iconCartWhite} 
            alt="Keranjang" 
            className={styles.cartIconWhite} 
            onClick={() => navigate('/keranjang')}
          />
        </div>

        <div className={styles.productImage}></div>

        <div className={styles.infoSection}>
          <div className={styles.infoLeft}>
            <p className={styles.priceText}>Rp9999</p>
            <p className={styles.stockText}>Stok tersisa: 99</p>
            <h1 className={styles.titleText}>Nama Produk</h1>
          </div>
          <img src={iconHeartOutline} alt="Favorit" className={styles.favIcon} />
        </div>

        <div className={styles.dividerThick}></div>

        <div className={styles.storeSection}>
          <div className={styles.storeAvatar}></div>
          <span className={styles.storeName}>Nama Toko</span>
        </div>

        <div className={styles.descSection}>
          <div className={styles.descTitle}>Deskripsi</div>
          <div className={styles.descContent}>
            Deskripsi Produk
          </div>
        </div>

      </div>

      <div className={styles.bottomBar}>
        
        <div className={styles.iconButton} onClick={() => navigate('/pesan')}>
          <img src={iconChatOutline} alt="Chat" />
        </div>
        
        <div className={styles.verticalDivider}></div>
        
        <div className={styles.iconButton}>
          <img src={iconAddCart} alt="Tambah ke Keranjang" />
        </div>
        
        <button 
          className={styles.btnBuy} 
          onClick={() => navigate('/checkout-guest')}
        >
          Beli Sekarang
        </button>

      </div>
    </div>
  );
}