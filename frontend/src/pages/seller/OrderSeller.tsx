import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OrderSeller.module.css';

import iconSeller from '../../assets/icons/icon-seller.svg';
import iconChat from '../../assets/icons/icon-chat.svg';
import iconSearch from '../../assets/icons/icon-search.svg';

import homeOutline from '../../assets/icons/home-outline.svg';
import navProductOutline from '../../assets/icons/nav-product-outline.svg';
import navOrderFill from '../../assets/icons/nav-order-fill.svg';
import userOutline from '../../assets/icons/user-outline.svg';

type OrderStatus = 'dikemas' | 'diproses';

interface ProductItem {
  name: string;
  qty: number;
}

interface OrderItem {
  id: string;
  buyerName: string;
  date: string;
  products: ProductItem[];
  total: string;
  status: OrderStatus;
}

export default function OrderSeller() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: 'xxx-xxx-xxx',
      buyerName: 'xxxx',
      date: 'dd/mm/yyyy',
      products: [
        { name: 'produk1', qty: 1 }
      ],
      total: 'Rp999999',
      status: 'dikemas'
    },
    {
      id: 'yyy-yyy-yyy',
      buyerName: 'xxxx',
      date: 'dd/mm/yyyy',
      products: [
        { name: 'produk1', qty: 1 },
        { name: 'produk2', qty: 1 }
      ],
      total: 'Rp999999',
      status: 'dikemas'
    },
    {
      id: 'zzz-zzz-zzz',
      buyerName: 'xxxx',
      date: 'dd/mm/yyyy',
      products: [
        { name: 'produk1', qty: 1 }
      ],
      total: 'Rp999999',
      status: 'diproses'
    }
  ]);

  const handleProcessOrder = (orderId: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: 'diproses' } : order
      )
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.scrollArea}>
        
        <div className={styles.banner}>
          <div className={styles.topRow}>
            <div className={styles.roleBadge}>
              <img src={iconSeller} alt="Seller" className={styles.badgeIcon} />
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

        <div className={styles.titleHeader}>
          <h2 className={styles.pageTitle}>Pesanan Masuk</h2>
        </div>

        <div className={styles.contentArea}>
          
          <div className={styles.searchBox}>
            <img src={iconSearch} alt="Search" className={styles.searchIcon} />
            <input type="text" placeholder="" />
          </div>

          <div className={styles.orderList}>
            {orders.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                
                <div className={styles.cardHeader}>
                  <div className={styles.orderMeta}>
                    <span>Order ID: {order.id}</span>
                    <span>Buyer: {order.buyerName}</span>
                    <span>Order Date: {order.date}</span>
                  </div>
                  <div className={styles.statusBadge}>
                    {order.status === 'dikemas' ? (
                      'Dikemas'
                    ) : (
                      <>
                        Menunggu<br />Kurir
                      </>
                    )}
                  </div>
                </div>

                <div className={styles.productWrapper}>
                  {order.products.map((product, index) => (
                    <div key={index} className={styles.productRow}>
                      <div className={styles.productImage}></div>
                      <div className={styles.productInfo}>
                        <span>{product.name}</span>
                        <span>x{product.qty}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.totalText}>Total Bayar: {order.total}</span>
                  {order.status === 'dikemas' ? (
                    <button 
                      className={`${styles.btnProcess} ${styles.btnPrimary}`}
                      onClick={() => handleProcessOrder(order.id)}
                    >
                      Proses Pesanan
                    </button>
                  ) : (
                    <button 
                      className={`${styles.btnProcess} ${styles.btnDisabled}`} 
                      disabled
                    >
                      Diproses
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>

      <div className={styles.bottomNav}>
        <div className={styles.navItem} onClick={() => navigate('/beranda-penjual')}>
          <img src={homeOutline} alt="Beranda" className={styles.navIcon} />
          <span>Beranda</span>
        </div>
        
        <div className={styles.navItem} onClick={() => navigate('/produk-penjual')}>
          <img src={navProductOutline} alt="Produk" className={styles.navIcon} />
          <span>Produk</span>
        </div>
        
        <div className={`${styles.navItem} ${styles.active}`}>
          <img src={navOrderFill} alt="Pesanan" className={styles.navIcon} />
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