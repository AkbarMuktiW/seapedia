import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HistoryCourier.module.css';

import iconCourier from '../../assets/icons/icon-courier.svg';
import iconChat from '../../assets/icons/icon-chat.svg';
import iconLocation from '../../assets/icons/icon-location.svg';
import iconSearch from '../../assets/icons/icon-search.svg'; 

import homeOutline from '../../assets/icons/home-outline.svg';
import iconSearchJob from '../../assets/icons/icon-search-job.svg'; 
import historyFill from '../../assets/icons/history-fill.svg';
import userOutline from '../../assets/icons/user-outline.svg';

interface HistoryItem {
  id: string;
  shopName: string;
  shopAddress: string;
  buyerName: string;
  buyerAddress: string;
  distance: string;
  earnings: string;
}

export default function HistoryCourier() {
  const navigate = useNavigate();

  // Data riwayat (sudah selesai)
  const [historyJobs] = useState<HistoryItem[]>([
    {
      id: 'XXX-XXX-123',
      shopName: 'Nama Toko',
      shopAddress: 'Alamat Toko 1234567890',
      buyerName: 'Username Buyer',
      buyerAddress: 'Alamat Buyer 1234567890',
      distance: 'x.x km',
      earnings: '+Rpxxxxx'
    },
    {
      id: 'XXX-XXX-124',
      shopName: 'Toko Elektronik Makmur',
      shopAddress: 'Jl. Merdeka No. 10',
      buyerName: 'Ahmad Faisal',
      buyerAddress: 'Perumahan Indah Blok A1',
      distance: '4.2 km',
      earnings: '+Rp12500'
    },
    {
      id: 'XXX-XXX-125',
      shopName: 'Apotek Sehat Jaya',
      shopAddress: 'Jl. Sudirman No. 88',
      buyerName: 'Siti Rahmawati',
      buyerAddress: 'Apartemen Sentral Lt. 8',
      distance: '7.5 km',
      earnings: '+Rp25000'
    }
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.scrollArea}>
        
        {/* BANNER HEADER */}
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

        {/* HEADER RIWAYAT PEKERJAAN (PUTIH) */}
        <div className={styles.searchHeaderSection}>
          <div className={styles.pageTitle}>Riwayat Pekerjaan</div>
          <div className={styles.searchBox}>
            <img src={iconSearch} alt="Search" className={styles.searchIcon} />
            <input type="text" placeholder="" />
          </div>
        </div>

        {/* DAFTAR RIWAYAT (ABU-ABU) */}
        <div className={styles.contentArea}>
          <div className={styles.jobList}>
            {historyJobs.map((job) => (
              <div key={job.id} className={styles.jobCard}>
                
                <div className={styles.cardHeader}>
                  <span className={styles.orderId}>{job.id}</span>
                  <span className={styles.badgeCompleted}>Selesai</span>
                </div>
                
                <div className={styles.timeline}>
                  <div className={styles.timelineNode}>
                    <span className={styles.nodeTitle}>Pickup:</span>
                    <span className={styles.nodeName}>{job.shopName}</span>
                    <span className={styles.nodeAddress}>{job.shopAddress}</span>
                  </div>
                  
                  <div className={styles.timelineNode}>
                    <span className={styles.nodeTitle}>Drop Off:</span>
                    <span className={styles.nodeName}>{job.buyerName}</span>
                    <span className={styles.nodeAddress}>{job.buyerAddress}</span>
                  </div>
                </div>

                {/* Tanpa Tombol, Hanya Meta Jarak & Penghasilan */}
                <div className={styles.metaRow}>
                  <div className={styles.distanceBox}>
                    <img src={iconLocation} alt="Location" />
                    <span className={styles.distanceText}>{job.distance}</span>
                  </div>
                  <span className={styles.earningsText}>{job.earnings}</span>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NAVBAR BAWAH */}
      <div className={styles.bottomNav}>
        <div className={styles.navItem} onClick={() => navigate('/beranda-kurir')}>
          <img src={homeOutline} alt="Beranda" className={styles.navIcon} />
          <span>Beranda</span>
        </div>
        
        <div className={styles.navItem} onClick={() => navigate('/cari-job')}>
          <img src={iconSearchJob} alt="Cari Job" className={styles.navIcon} />
          <span>Cari Job</span>
        </div>
        
        {/* Ikon Riwayat Aktif */}
        <div className={`${styles.navItem} ${styles.active}`}>
          <img src={historyFill} alt="Riwayat" className={styles.navIcon} />
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