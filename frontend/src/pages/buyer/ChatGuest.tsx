import { useNavigate } from 'react-router-dom';
import styles from './ChatGuest.module.css';

import iconBack from '../../assets/icons/icon-back.svg';

export default function ChatGuest() {
  const navigate = useNavigate();

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <img 
          src={iconBack} 
          alt="Kembali" 
          className={styles.backIcon} 
          onClick={() => navigate(-1)}
        />
        <span className={styles.headerTitle}>Pesan</span>
      </div>

      <div className={styles.content}>
        <p className={styles.messageText}>
          Anda belum login,<br />
          akses semua fitur aplikasi setelah login ke akunmu
        </p>
        
        <button className={styles.btnContinue}
          onClick={() => navigate('/login')}
        >
          Lanjutkan
        </button>
      </div>

    </div>
  );
}