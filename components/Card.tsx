import styles from '../styles/modules/Card.module.css';

interface CardProps {
  children: React.ReactNode;
  containerClassName?: string;
  props?: React.HTMLProps<HTMLDivElement>;
}

const Card = ({ children, containerClassName, ...props }: CardProps) => {
  return (
    <div className={`${styles.card_border} ${containerClassName}`}>
      <div className={styles.card} {...props}>
        {children}
      </div>
    </div>
  );
};

export default Card;
