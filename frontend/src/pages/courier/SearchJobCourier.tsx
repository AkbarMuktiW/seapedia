import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchJobCourier.module.css';

import iconCourier from '../../assets/icons/icon-courier.svg';
import iconChat from '../../assets/icons/icon-chat.svg';
import iconLocation from '../../assets/icons/icon-location.svg';
import iconSearch from '../../assets/icons/icon-search.svg'; 

import homeOutline from '../../assets/icons/home-outline.svg';
import iconSearchJob from '../../assets/icons/icon-search-job-fill.svg';
import historyOutline from '../../assets/icons/history-outline.svg';
import userOutline from '../../assets/icons/user-outline.svg';

interface JobItem {
  id: string;
  shopName: string;
  shopAddress: string;
  buyerName: string;
  buyerAddress: string;
  distance: string;
  earnings: string;
}

export default function SearchJobCourier() {
  const navigate = useNavigate();
  const [availableJobs, setAvailableJobs] = useState<JobItem[]>([
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
      shopName: 'Toko Maju Jaya',
      shopAddress: 'Jl. Pemuda No. 45',
      buyerName: 'Ahmad Santoso',
      buyerAddress: 'Perumahan Asri Blok B2',
      distance: '3.2 km',
      earnings: '+Rp15000'
    },
    {
      id: 'XXX-XXX-125',
      shopName: 'Buku Murah Sentosa',
      shopAddress: 'Jl. Merdeka No. 12',
      buyerName: 'Siti Rahma',
      buyerAddress: 'Apartemen Indah Lt 4',
      distance: '5.1 km',
      earnings: '+Rp22000'
    }
  ]);
  const handleTakeJob = (jobId: string) => {
    setAvailableJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
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

        <div className={styles.searchHeaderSection}>
          <div className={styles.pageTitle}>Cari Pekerjaan</div>
          <div className={styles.searchBox}>
            <img src={iconSearch} alt="Search" className={styles.searchIcon} />
            <input type="text" placeholder="" />
          </div>
        </div>

        <div className={styles.contentArea}>
          <div className={styles.jobList}>
            {availableJobs.map((job) => (
              <div key={job.id} className={styles.jobCard}>
                
                <div className={styles.cardHeader}>
                  <span className={styles.orderId}>{job.id}</span>
                  <span className={styles.badgeWaiting}>Menunggu Kurir</span>
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

                <div className={styles.metaRow}>
                  <div className={styles.distanceBox}>
                    <img src={iconLocation} alt="Location" />
                    <span className={styles.distanceText}>{job.distance}</span>
                  </div>
                  <span className={styles.earningsText}>{job.earnings}</span>
                </div>

                <button 
                  className={styles.btnAction}
                  onClick={() => handleTakeJob(job.id)}
                >
                  Ambil Paket
                </button>

              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottomNav}>
        <div className={styles.navItem} onClick={() => navigate('/beranda-kurir')}>
          <img src={homeOutline} alt="Beranda" className={styles.navIcon} />
          <span>Beranda</span>
        </div>
        
        <div className={`${styles.navItem} ${styles.active}`}>
          <img src={iconSearchJob} alt="Cari Job" className={styles.navIcon} />
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