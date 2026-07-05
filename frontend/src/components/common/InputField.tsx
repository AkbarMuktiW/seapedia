import styles from './InputField.module.css';

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  iconSrc: string;
}

export default function InputField({ label, type, placeholder, iconSrc }: InputFieldProps) {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputContainer}>
        <img src={iconSrc} alt="icon" className={styles.icon} />
        <input 
          type={type} 
          placeholder={placeholder} 
          className={styles.inputElement} 
        />
      </div>
    </div>
  );
}