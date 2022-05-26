import styles from '../styles/modules/Button.module.css';

interface IconButtonProps extends React.HTMLProps<HTMLButtonElement> {
  flat?: boolean;
  className?: string;
}

const IconButton = ({
  children,
  onClick,
  flat,
  className,
}: IconButtonProps) => {
  const buttonClasses = () => {
    const classes = [styles.icon_button];

    if (className) {
      classes.push(className);
    }

    if (flat) {
      classes.push(styles.icon_button__flat);
    }

    return classes.join(' ');
  };

  return (
    <button className={buttonClasses()} onClick={onClick}>
      {children}
    </button>
  );
};

export default IconButton;
