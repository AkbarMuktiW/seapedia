import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';

import seahorseImg from '../../assets/images/seahorse-login.png';
import emailIcon from '../../assets/icons/icon-email.svg';
import lockIcon from '../../assets/icons/icon-lock.svg';

export default function Login() {
    const navigate = useNavigate();
  return (
    <div className={styles.loginContainer}>
      <img src={seahorseImg} alt="Seapedia Mascot" className={styles.illustration} />

      <div className={styles.formContainer}>
        <InputField 
          label="Email Address" 
          type="email" 
          placeholder="Enter your email address" 
          iconSrc={emailIcon} 
        />

        <InputField 
          label="Password" 
          type="password" 
          placeholder="Enter your password" 
          iconSrc={lockIcon} 
        />

        <a href="#" className={styles.forgotPassword}>Forget password?</a>

        <Button text="Login"
          onClick={() => navigate('/pilih-peran')} />
      </div>

      <div className={styles.footerText}>
        Don't have an account? 
        <a href="#" className={styles.signUpLink}>Sign Up</a>
      </div>

    </div>
  );
}