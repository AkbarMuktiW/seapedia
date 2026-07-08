import { useNavigate } from 'react-router-dom';
import styles from './ProductSeller.module.css';

import iconSeller from '../../assets/icons/icon-seller.svg';
import iconChat from '../../assets/icons/icon-chat.svg';
import homeOutline from '../../assets/icons/home-outline.svg';
import navProductOutline from '../../assets/icons/product-fill.svg';
import navOrderOutline from '../../assets/icons/nav-order-outline.svg';
import userOutline from '../../assets/icons/user-outline.svg';
import iconPlusCircle from '../../assets/icons/icon-plus-circle.svg';
import iconSearch from '../../assets/icons/icon-search.svg';
import iconEdit from '../../assets/icons/icon-edit.svg';
import iconDelete from '../../assets/icons/icon-delete.svg';

export default function ProductSeller() {
  const navigate = useNavigate();
  const dummyProducts = Array.from({ length: 3 });

  return (
    <div className={styles.container}>
      <div className={styles.scrollArea}>
        <div className={styles.banner}>
          <div className={styles.topRow}>
            <div className={styles.roleBadge}>
              <img src={iconSeller} alt="Shop" className={styles.badgeIcon} />
              <span>Penjual</span>
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
              <p>Halo,</p>
              <strong>Nama Toko</strong>
            </div>
          </div>
        </div>

        <div className={styles.contentArea}>
          <div className={styles.pageTitle}>Manajemen Produk</div>
          <button 
            className={styles.btnAddProduct} 
            onClick={() => navigate('/tambah-produk-penjual')}
          >
            <img src={iconPlusCircle} alt="Plus" style={{ width: 16 }} />
            <span>Tambah Produk Baru</span>
          </button>
          <div className={styles.searchBox}>
            <img src={iconSearch} alt="Search" className={styles.searchIcon} />
            <input type="text" placeholder="" />
          </div>
          <table className={styles.productTable}>
            <thead>
              <tr>
                <th>Gambar</th>
                <th>Nama Produk</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {dummyProducts.map((_, i) => (
                <tr key={i}>
                  <td>
                    <div className={styles.imgPlaceholder}></div>
                  </td>
                  <td>Nama Produk</td>
                  <td>Rp9999</td>
                  <td>9999</td>
                  <td>
                    <div className={styles.actionIcons}>
                      <img src={iconEdit} alt="Edit" />
                      <img src={iconDelete} alt="Delete" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.bottomNav}>
        <div className={styles.navItem} onClick={() => navigate('/beranda-penjual')}>
          <img src={homeOutline} alt="Beranda" className={styles.navIcon} />
          <span>Beranda</span>
        </div>
        <div className={`${styles.navItem} ${styles.active}`}>
          <img src={navProductOutline} alt="Produk" className={styles.navIcon} />
          <span>Produk</span>
        </div>
        <div className={styles.navItem} onClick={() => navigate('/pesanan-penjual')}>
          <img src={navOrderOutline} alt="Pesanan" className={styles.navIcon} />
          <span>Pesanan</span>
        </div>
        <div className={styles.navItem} onClick={() => navigate('/profil-penjual')}>
          <img src={userOutline} alt="Saya" className={styles.navIcon} />
          <span>Saya</span>
        </div>
      </div>
    </div>
  );
}