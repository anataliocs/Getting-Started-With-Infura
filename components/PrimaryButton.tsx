import Link from 'next/link';
import styles from '../styles/modules/Button.module.css';
import LoadingSpinner from './LoadingSpinner';

interface PrimaryButtonProps extends React.HTMLProps<HTMLButtonElement> {
  href?: string;
  isLoading?: boolean;
}

const PrimaryButton = ({
  children,
  onClick,
  href,
  className,
  isLoading,
  disabled,
}: PrimaryButtonProps) => {
  if (href) {
    return (
      <Link href={href}>
        <a className={`${styles.primary_button} ${className}`}>{children}</a>
      </Link>
    );
  }

  return (
    <button
      className={`${styles.primary_button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? (
        <LoadingSpinner className="mx-auto -my-1 text-black w-7 h-7 animate-spin" />
      ) : (
        children
      )}
    </button>
  );
};

export default PrimaryButton;
