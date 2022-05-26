import styles from '../styles/modules/Link.module.css';

const Link = ({
  children,
  href,
  target,
  className,
}: React.HTMLProps<HTMLButtonElement>) => {
  return (
    <a href={href} target={target} className={styles.link + ' ' + className}>
      {children}
    </a>
  );
};

export default Link;
