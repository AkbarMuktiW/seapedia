import { useNavigate } from 'react-router-dom';
import styles from './CheckoutBuyer.module.css';

import iconBack from '../../assets/icons/icon-back.svg';
import iconLocation from '../../assets/icons/icon-location.svg';
import iconVoucher from '../../assets/icons/icon-voucher.svg';

export default function CheckoutBuyer() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={iconBack} onClick={() => navigate(-1)} alt="Back" style={{cursor: 'pointer'}} />
        <span style={{marginLeft: 15, fontWeight: 'bold'}}>Checkout</span>
      </div>

      <div className={styles.scrollArea}>
        <div className={styles.sectionCard}>
          <div className={styles.addressRow}>
            <img src={iconLocation} alt="Location" style={{width: 20}} />
            <div>
              <strong>Penerima</strong> 08123456789
              <p className={styles.textSmall}>Keterangan alamat pengiriman jalan, desa, kecamatan, kabupaten, provinsi, rt/rw, kode pos</p>
            </div>
            <span style={{marginLeft: 'auto'}}>&gt;</span>
          </div>
        </div>

        <div className={styles.sectionCard}>
          <strong>Nama Toko</strong>
          <div style={{margin: '15px 0'}}>
            <div style={{display: 'flex', gap: 10, marginBottom: 15}}>
              <div style={{width: 60, height: 60, background: '#EEE', borderRadius: 4}} />
              <div style={{flex: 1}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <span>Nama Produk</span> <span>x1</span>
                </div>
                <div style={{color: '#64819D', fontWeight: 'bold', marginTop: 5}}>Rp99999</div>
              </div>
            </div>

            <div style={{display: 'flex', gap: 10}}>
              <div style={{width: 60, height: 60, background: '#EEE', borderRadius: 4}} />
              <div style={{flex: 1}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <span>Nama Produk</span> <span>x1</span>
                </div>
                <div style={{color: '#64819D', fontWeight: 'bold', marginTop: 5}}>Rp99999</div>
              </div>
            </div>
          </div>
          
          <div style={{display: 'flex', alignItems: 'center', gap: 10, marginTop: 10}}>
            <img src={iconVoucher} alt="Voucher" style={{width: 20}} />
            <input placeholder="Masukkan kode voucher:" style={{flex: 1, border: 'none', borderBottom: '1px solid #CCC'}} />
            <button style={{background: '#64819D', color: 'white', border: 'none', padding: '5px 15px', borderRadius: 4}}>Pakai</button>
          </div>
        </div>

        <div className={styles.sectionCard}>
          <strong>Opsi Pengiriman</strong>
          {['Instant', 'Next Day', 'Regular'].map(opt => (
            <div key={opt} className={styles.shippingOption}>
              <span>{opt}</span> <span style={{fontWeight: 'bold'}}>Rp99999</span>
            </div>
          ))}
        </div>

        <div className={styles.sectionCard} style={{marginBottom: 20}}>
          <strong>Rincian Pembayaran</strong>
          <div className={styles.paymentRow}><span>Subtotal Pesanan:</span> <span>Rp.999999</span></div>
          <div className={styles.paymentRow}><span>Diskon (Voucher/Promo):</span> <span style={{color: '#64819D'}}>-Rp.999999</span></div>
          <div className={styles.paymentRow}><span>Biaya Pengiriman:</span> <span>Rp.999999</span></div>
          <div className={styles.paymentRow}><span>PPN (12%):</span> <span>Rp.999999</span></div>
        </div>
      </div>

      <div className={styles.footer}>
        <div style={{flex: 1, display: 'flex', alignItems: 'center', paddingLeft: 20, fontSize: 18, fontWeight: 'bold'}}>Rp99999</div>
        <button style={{flex: 1, border: 'none', background: '#64819D', color: 'white', fontWeight: 'bold'}}>Bayar Sekarang</button>
      </div>
    </div>
  );
}