import React from 'react';
import Link from 'next/link';
import styles from '../styles/modules/Navbar.module.css';
import InfuraLogo from './icons/InfuraLogo';

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
}

const Navbar = ({ children, href }: NavbarProps) => {
  return (
    <header className={styles.navbar}>
      {href ? (
        <Link href={href} passHref>
          <InfuraLogo className={styles.logo__link} />
        </Link>
      ) : (
        <InfuraLogo className={styles.logo} />
      )}
      <div>{children}</div>
    </header>
  );
};

export default Navbar;
