import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeCourier.module.css';

import iconCourier from '../../assets/icons/icon-courier.svg';
import iconChat from '../../assets/icons/icon-chat.svg';
import iconLocation from '../../assets/icons/icon-location.svg';

import homeFill from '../../assets/icons/home-fill.svg';
import searchJobOutline from '../../assets/icons/icon-search-job.svg';
import historyOutline from '../../assets/icons/history-outline.svg';
import userOutline from '../../assets/icons/user-outline.svg';

interface JobItem {
  id: string;
  shopName: string;
  shopAddress: string;
  buyerName: string;
  buyerAddress: string;
  distance: string;
  isCompleted: boolean;
}

export default function HomeCourier() {
  const navigate = useNavigate();

  // Menyiapkan beberapa data pekerjaan agar halaman bisa di-scroll
  const [jobs, setJobs] = useState<JobItem[]>([
    {
      id: 'xxx-xxx-xxx',
      shopName: 'Nama Toko',
      shopAddress: 'Alamat Toko',
      buyerName: 'Username Pembeli',
      buyerAddress: 'Alamat Pembeli',
      distance: '5.4 Km',
      isCompleted: false
    },
    {
      id: 'yyy-yyy-yyy',
      shopName: 'Toko Segar Jaya',
      shopAddress: 'Jl. Merdeka No. 45',
      buyerName: 'Budi Santoso',
      buyerAddress: 'Perumahan Asri Blok C2',
      distance: '2.1 Km',
      isCompleted: false
    },
    {
      id: 'zzz-zzz-zzz',
      shopName: 'Toko Maju Terus',
      shopAddress: 'Jl. Sudirman No. 10',
      buyerName: 'Siti Aminah',
      buyerAddress: 'Apartemen Sentosa Tower B',
      distance: '8.2 Km',
      isCompleted: true // Diset true untuk mendemonstrasikan status yang sudah selesai
    }
  ]);

  const handleFinishJob = (jobId: string) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === jobId ? { ...job, isCompleted: true } : job
      )
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.scrollArea}>
        
        <div className={styles.banner}>
          <div className={styles.topRow}>
            <div className={styles.roleBadge}>
              <img src={iconCourier} alt="Courier" className={styles.badgeIcon} />
              <span>Kurir</span>
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
              <strong>Nama Kurir</strong>
            </div>
          </div>
        </div>

        <div className={styles.dashboardSection}>
          <div className={styles.sectionTitle}>Dashboard</div>
          <div className={styles.incomeCard}>
            <span className={styles.incomeLabel}>Pendapatan</span>
            <span className={styles.incomeAmount}>Rp999.999.999</span>
            <span className={styles.incomeSub}>Total pendapatan bersih</span>
            <button className={styles.btnWithdraw}>Tarik Dana</button>
          </div>
        </div>

        <div className={styles.activeJobSection}>
          <div className={styles.sectionTitle}>Pekerjaan Aktif</div>
          
          <div className={styles.jobList}>
            {jobs.map((job) => (
              <div key={job.id} className={styles.jobCard}>
                <div className={styles.orderId}>ID: {job.id}</div>
                
                <div className={styles.timeline}>
                  <div className={styles.timelineNode}>
                    <span className={styles.nodeTitle}>Pickup</span>
                    <span className={styles.nodeName}>{job.shopName}</span>
                    <span className={styles.nodeAddress}>{job.shopAddress}</span>
                  </div>
                  
                  <div className={styles.timelineNode}>
                    <span className={styles.nodeTitle}>Titik Antar</span>
                    <span className={styles.nodeName}>{job.buyerName}</span>
                    <span className={styles.nodeAddress}>{job.buyerAddress}</span>
                  </div>
                </div>

                <div className={styles.distanceRow}>
                  <img src={iconLocation} alt="Location" />
                  <span className={styles.distanceText}>{job.distance}</span>
                </div>

                {!job.isCompleted ? (
                  <button 
                    className={`${styles.btnAction} ${styles.btnPrimary}`}
                    onClick={() => handleFinishJob(job.id)}
                  >
                    Konfirmasi Selesai
                  </button>
                ) : (
                  <button 
                    className={`${styles.btnAction} ${styles.btnDisabled}`}
                    disabled
                  >
                    Selesai
                  </button>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* NAVBAR BAWAH - DIPERBARUI */}
      <div className={styles.bottomNav}>
        <div className={`${styles.navItem} ${styles.active}`}>
          <img src={homeFill} alt="Beranda" className={styles.navIcon} />
          <span>Beranda</span>
        </div>
        
        <div className={styles.navItem} onClick={() => navigate('/cari-job')}>
          <img src={searchJobOutline} alt="Cari Job" className={styles.navIcon} />
          <span>Cari Job</span>
        </div>
        
        <div className={styles.navItem} onClick={() => navigate('/riwayat-kurir')}>
          <img src={historyOutline} alt="Riwayat" className={styles.navIcon} />
          <span>Riwayat</span>
        </div>
        
        <div className={styles.navItem} onClick={() => navigate('/profil-kurir')}>
          <img src={userOutline} alt="Saya" className={styles.navIcon} />
          <span>Saya</span>
        </div>
      </div>
    </div>
  );
}