import { useNavigate } from 'react-router-dom';
import styles from './ProductDetail.module.css';

// Ikon Header
import iconBack from '../../assets/icons/icon-back.svg';
import iconCartWhite from '../../assets/icons/icon-cart.svg';
import iconHeartOutline from '../../assets/icons/heart-outline.svg';

// Ikon Bottom Bar
import iconChatOutline from '../../assets/icons/icon-chat.svg';
import iconAddCart from '../../assets/icons/icon-add-cart.svg';

export default function ProductDetail() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.scrollArea}>
        
        {/* HEADER */}
        <div className={styles.banner}>
          <div 
            className={styles.btnKeluar} 
            onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
          >
            <img src={iconBack} alt="Keluar" className={styles.backIcon} />
            <span>Keluar</span>
          </div>
          <img 
            src={iconCartWhite} 
            alt="Keranjang" 
            className={styles.cartIconWhite} 
            onClick={() => navigate('/keranjang')} // Opsional: Rute ke keranjang jika ada
          />
        </div>

        {/* FOTO PRODUK */}
        <div className={styles.productImage}></div>

        {/* INFO PRODUK */}
        <div className={styles.infoSection}>
          <div className={styles.infoLeft}>
            <p className={styles.priceText}>Rp9999</p>
            <p className={styles.stockText}>Stok tersisa: 99</p>
            <h1 className={styles.titleText}>Nama Produk</h1>
          </div>
          <img src={iconHeartOutline} alt="Favorit" className={styles.favIcon} />
        </div>

        {/* JEDA TEBAL */}
        <div className={styles.dividerThick}></div>

        {/* PROFIL TOKO */}
        <div className={styles.storeSection}>
          <div className={styles.storeAvatar}></div>
          <span className={styles.storeName}>Nama Toko</span>
        </div>

        {/* DESKRIPSI PRODUK */}
        <div className={styles.descSection}>
          <div className={styles.descTitle}>Deskripsi</div>
          <div className={styles.descContent}>
            Deskripsi Produk
          </div>
        </div>

      </div>

      {/* BOTTOM ACTION BAR */}
      <div className={styles.bottomBar}>
        
        <div className={styles.iconButton} onClick={() => navigate('/pesan-pembeli')}>
          <img src={iconChatOutline} alt="Chat" />
        </div>
        
        <div className={styles.verticalDivider}></div>
        
        <div className={styles.iconButton}>
          <img src={iconAddCart} alt="Tambah ke Keranjang" />
        </div>
        
        <button 
          className={styles.btnBuy} 
          onClick={() => navigate('/checkout')}
        >
          Beli Sekarang
        </button>

      </div>
    </div>
  );
}