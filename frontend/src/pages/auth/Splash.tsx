import styles from './Splash.module.css';
import logoImg from '../../assets/images/logo-seapedia.png';

export default function Splash() {
  return (
    <div className={styles.splashContainer}>
      <img src={logoImg} alt="SEAPEDIA Logo" className={styles.logo} />
    </div>
  );
}