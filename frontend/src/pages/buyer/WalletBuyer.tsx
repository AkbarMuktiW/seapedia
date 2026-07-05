import { useNavigate } from 'react-router-dom';
import styles from './WalletBuyer.module.css';

import iconBack from '../../assets/icons/icon-back.svg';
import iconWalletBlue from '../../assets/icons/icon-wallet-blue.svg';
import iconTopup from '../../assets/icons/icon-topup.svg';

import iconHomeOutline from '../../assets/icons/home-outline.svg';
import iconWalletFill from '../../assets/icons/wallet-fill.svg';
import iconHeartOutline from '../../assets/icons/heart-outline.svg';
import iconUserOutline from '../../assets/icons/user-outline.svg';

export default function WalletBuyer() {
  const navigate = useNavigate();
  const historyData = [
    { id: 1, amount: "+ Rp9999", type: "Top Up", date: "dd/mm/yyyy" },
    { id: 2, amount: "- Rp9999", type: "Bayar", date: "dd/mm/yyyy" },
    { id: 3, amount: "+ Rp9999", type: "Top Up", date: "dd/mm/yyyy" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img 
          src={iconBack} 
          alt="Kembali" 
          className={styles.backIcon} 
          onClick={() => navigate('/beranda-pembeli')} 
        />
        <span className={styles.headerTitle}>Dompet Saya</span>
      </div>

      <div className={styles.scrollArea}>
        <div className={styles.balanceCard}>
          <div className={styles.balanceSection}>
            <img src={iconWalletBlue} alt="Saldo" className={styles.actionIcon} />
            <span className={styles.actionText}>Rp9999</span>
          </div>
          <div 
            className={styles.topupSection}
            onClick={() => alert('Fitur Isi Saldo akan segera hadir')}
          >
            <img src={iconTopup} alt="Isi Saldo" className={styles.actionIcon} />
            <span className={styles.actionText}>Isi Saldo</span>
          </div>
        </div>

        <div className={styles.historyCard}>
          <h3 className={styles.historyTitle}>Riwayat Penggunaan</h3>
          {historyData.map((item) => (
            <div key={item.id} className={styles.historyItem}>
              <span className={styles.historyCol}>{item.amount}</span>
              <span className={`${styles.historyCol} ${styles.historyCenter}`}>{item.type}</span>
              <span className={`${styles.historyCol} ${styles.historyRight}`}>{item.date}</span>
            </div>
          ))}
        </div>

      </div>

      <div className={styles.bottomNav}>
        <div className={styles.navItem} onClick={() => navigate('/beranda-pembeli')}>
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

        <div className={styles.navItem} onClick={() => navigate('/profil-pembeli')}>
          <img src={iconUserOutline} alt="Saya" className={styles.navIcon} />
          <span>Saya</span>
        </div>
      </div>

    </div>
  );
}