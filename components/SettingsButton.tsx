import styles from '../styles/modules/Button.module.css';
import InfoIcon from './icons/InfoIcon';

const SettingsButton = ({
  children,
  onClick,
}: React.HTMLProps<HTMLButtonElement>) => {
  return (
    <button className={styles.settings__button} onClick={onClick}>
      <InfoIcon className={styles.settings__button_infoIcon} />
      {children}
    </button>
  );
};

export default SettingsButton;
