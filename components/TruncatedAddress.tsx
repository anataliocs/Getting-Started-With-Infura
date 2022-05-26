import styles from '../styles/modules/Navbar.module.css';

const TruncatedAddress = ({
  address,
  label,
  length = 5,
  ...props
}: {
  address?: string;
  label?: string;
  length?: number;
  props?: React.HTMLProps<HTMLDivElement>;
}) => {
  return (
    <>
      {address && (
        <div className={styles.address} {...props}>
          {label && <span className={styles.address__label}>{label}</span>}
          <div>{`${address.substring(0, length)}...${address.substring(
            address.length - length,
            address.length
          )}`}</div>
        </div>
      )}
    </>
  );
};

export default TruncatedAddress;
