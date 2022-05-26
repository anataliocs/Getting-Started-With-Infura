import Image from 'next/image';
import React from 'react';
import styles from '@styles/modules/HomePage.module.css';

const HomePage = ({ children }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={styles.home}>
      <div>{children}</div>
      <div className={styles.image_wrapper}>
        <Image
          src="/images/bg-haze.png"
          alt="background color haze"
          layout="fill"
        />
      </div>
    </div>
  );
};

export default HomePage;
