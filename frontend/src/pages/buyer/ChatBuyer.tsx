import { useNavigate } from 'react-router-dom';
import styles from './ChatBuyer.module.css';
import iconBack from '../../assets/icons/icon-back.svg';
import iconSearch from '../../assets/icons/icon-search.svg';

export default function ChatBuyer() {
  const navigate = useNavigate();
  const dummyChats = Array.from({ length: 2 });

  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        <img src={iconBack} alt="Back" className={styles.backIcon} onClick={() => navigate(-1)} />
        <span className={styles.headerTitle}>Pesan</span>
      </div>

      <div className={styles.contentArea}>
        
        <div className={styles.searchWrapper}>
          <div className={styles.searchBox}>
            <img src={iconSearch} alt="Search" className={styles.searchIcon} />
            <input type="text" className={styles.searchInput} placeholder="" />
          </div>
        </div>

        <div className={styles.chatList}>
          {dummyChats.map((_, i) => (
            <div key={i} className={styles.chatItem}>
              <div className={styles.chatAvatar}></div>
              <span className={styles.chatName}>Nama Toko</span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}