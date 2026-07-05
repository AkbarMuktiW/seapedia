import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RoleSelection.module.css';

import iconBuyer from '../../assets/icons/icon-buyer.svg';
import iconSeller from '../../assets/icons/icon-seller.svg';
import iconCourier from '../../assets/icons/icon-courier.svg';

export default function RoleSelection() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const roles = [
    {
      id: 'pembeli',
      name: 'Pembeli',
      desc: 'Temukan barang kebutuhanmu tanpa harus keluar rumah',
      icon: iconBuyer
    },
    {
      id: 'penjual',
      name: 'Penjual',
      desc: 'Jual produkmu lebih mudah dan jangkau lebih banyak pelanggan',
      icon: iconSeller
    },
    {
      id: 'kurir',
      name: 'Kurir',
      desc: 'Antarkan pesanan dengan aman dan tepat waktu',
      icon: iconCourier
    }
  ];

  return (
    <div className={styles.container}>
      
      <div className={styles.contentArea}>
        <h1 className={styles.headerTitle}>
          Hai SEAPEDIA'S,<br />
          Pilih Peran Anda Saat Ini
        </h1>

        <div className={styles.cardList}>
          {roles.map((role) => (
            <div
              key={role.id}
              className={`${styles.roleCard} ${selectedRole === role.id ? styles.active : ''}`}
              onClick={() => setSelectedRole(role.id)}
            >
              <img src={role.icon} alt={role.name} className={styles.roleIcon} />
              <span className={styles.roleName}>{role.name}</span>
              <span className={styles.roleDesc}>{role.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottomContainer}>
        <button
          className={styles.btnLanjutkan}
          disabled={!selectedRole}
          onClick={() => {
            if (selectedRole === 'pembeli') {
              navigate('/beranda-pembeli');
            } else if (selectedRole === 'penjual') {
              navigate('/beranda-penjual');
            } else if (selectedRole === 'kurir') {
              navigate('/beranda-kurir');
            }
          }}
        >
          Lanjutkan
        </button>
      </div>

    </div>
  );
}