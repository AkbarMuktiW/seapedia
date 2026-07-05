import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export default function Button({ text, onClick }: ButtonProps) {
  return (
    <button className={styles.btnPrimary} onClick={onClick}>
      <span className={styles.btnText}>{text}</span>
    </button>
  );
}