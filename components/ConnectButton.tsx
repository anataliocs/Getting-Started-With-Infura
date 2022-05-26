import styles from '../styles/modules/Button.module.css';

interface ConnectButtonProps extends React.HTMLProps<HTMLButtonElement> {
  className?: string;
}

const ConnectButton = ({
  children,
  onClick,
  className,
  disabled,
}: ConnectButtonProps) => {
  return (
    <button
      className={`${styles.connect_button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ConnectButton;
