import { useNavigate } from 'react-router-dom';
import styles from './CartBuyer.module.css';
import iconBack from '../../assets/icons/icon-back.svg';
import iconChat from '../../assets/icons/icon-chat.svg';

export default function CartBuyer() {
  const navigate = useNavigate();
  const dummyProducts = Array.from({ length: 2 });

  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <img src={iconBack} alt="Back" className={styles.backIcon} onClick={() => navigate(-1)} />
          <span className={styles.headerTitle}>Keranjang Saya</span>
        </div>
        <img 
          src={iconChat} 
          alt="Chat" 
          className={styles.chatIcon} 
          onClick={() => navigate('/pesan-pembeli')} 
        />
      </div>

      <div className={styles.scrollArea}>
        <p className={styles.ruleText}>Masukkan produk dari toko yang sama!</p>
        <div className={styles.storeSection}>
          <div className={styles.storeAvatar}></div>
          <span className={styles.storeName}>Nama Toko</span>
        </div>

        {dummyProducts.map((_, i) => (
          <div key={i} className={styles.cartItem}>
            <div className={styles.itemImage}></div>
            <div className={styles.itemDetails}>
              <span className={styles.itemName}>Nama Produk</span>
              <div className={styles.itemBottomRow}>
                <span className={styles.itemPrice}>Rp99999</span>
                <div className={styles.qtyControl}>
                  <span className={styles.qtyBtn}>−</span>
                  <span className={styles.qtyValue}>1</span>
                  <span className={styles.qtyBtn}>+</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.checkoutBar}>
        <div className={styles.totalPriceArea}>Rp99999</div>
        <button className={styles.checkoutBtn} onClick={() => navigate('/checkout')}>Checkout</button>
      </div>

    </div>
  );
}