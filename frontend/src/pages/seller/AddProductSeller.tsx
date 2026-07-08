import { useRef, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddProductSeller.module.css';

import iconSeller from '../../assets/icons/icon-seller.svg';
import iconChat from '../../assets/icons/icon-chat.svg';
import iconBack from '../../assets/icons/icon-back.svg';
import iconCamera from '../../assets/icons/icon-camera.svg';

export default function AddProductSeller() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
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

        <div className={styles.formArea}>
          <div className={styles.headerTitle}>
            <img 
              src={iconBack} 
              alt="Back" 
              className={styles.backIcon} 
              onClick={() => navigate('/produk-penjual')} 
            />
            <span>Tambah produk baru</span>
          </div>

          <div className={styles.uploadBox} onClick={handleBoxClick}>
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className={styles.previewImage} />
            ) : (
              <>
                <img src={iconCamera} alt="Camera" className={styles.uploadIcon} />
                <span>Unggah Gambar</span>
              </>
            )}
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*"
            style={{ display: 'none' }} 
          />

          <div className={styles.inputGroup}>
            <label>Nama Produk</label>
            <input type="text" className={styles.inputField} />
          </div>

          <div className={styles.inputGroup}>
            <label>Kategori Produk</label>
            <input type="text" className={styles.inputField} />
          </div>

          <div className={styles.rowSplit}>
            <div className={styles.inputGroup}>
              <label>Harga</label>
              <input type="text" className={styles.inputField} placeholder="Rp" />
            </div>
            
            <div className={styles.inputGroup}>
              <label>Stok</label>
              <input type="text" className={styles.inputField} />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Deskripsi</label>
            <textarea className={styles.textAreaField}></textarea>
          </div>

          <button 
            className={styles.btnSimpan} 
            onClick={() => navigate('/produk-penjual')}
          >
            Simpan
          </button>
        </div>

      </div>
    </div>
  );
}