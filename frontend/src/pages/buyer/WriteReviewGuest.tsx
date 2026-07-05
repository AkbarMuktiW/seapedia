import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WriteReviewGuest.module.css';

import iconBack from '../../assets/icons/icon-back.svg';
import iconStarOutline from '../../assets/icons/star-outline.svg';
import iconStarFill from '../../assets/icons/star-fill.svg';

export default function WriteReviewGuest() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img 
          src={iconBack} 
          alt="Kembali" 
          className={styles.backIcon} 
          onClick={() => navigate(-1)}
        />
        <span className={styles.headerTitle}>Tulis Ulasan</span>
      </div>

      <div className={styles.contentArea}>
        <div className={styles.reviewCard}>
          <div className={styles.reviewerProfile}>
            <div className={styles.avatar}></div>
            <span className={styles.reviewerName}>Nama</span>
          </div>

          <div className={styles.starsContainer}>
            {stars.map((starNum) => (
              <img
                key={starNum}
                src={starNum <= rating ? iconStarFill : iconStarOutline}
                alt={`Star ${starNum}`}
                className={styles.starIcon}
                onClick={() => setRating(starNum)}
              />
            ))}
          </div>

          <textarea 
            className={styles.reviewInput}
            placeholder="Deskripsikan pengalaman anda (opsional)"
          />

          <button 
            className={styles.btnUnggah}
            onClick={() => {
              alert(`Ulasan sebesar ${rating} Bintang berhasil (Simulasi)`);
              navigate(-1);
            }}
          >
            Unggah
          </button>
        </div>
      </div>
    </div>
  );
}