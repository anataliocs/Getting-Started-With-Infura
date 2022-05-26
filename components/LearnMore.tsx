import Link from './Link';

import styles from '@styles/modules/LearnMore.module.css';

interface LearnMoreLink {
  label: string;
  href: string;
}

interface LearnMoreProps {
  links: LearnMoreLink[];
  title?: string;
}

const LearnMore = ({ links, title }: LearnMoreProps) => {
  // Split link list into two columns
  const splitLinks = (links: LearnMoreLink[]): LearnMoreLink[][] => {
    return [
      [...links.slice(0, Math.ceil(links.length / 2))],
      [...links.slice(Math.ceil(links.length / 2))],
    ];
  };

  return (
    <div className={styles['learn-more']}>
      <p className={styles['learn-more__title']}>{title || 'Learn More'}</p>
      <div className={styles['learn-more__container']}>
        {splitLinks(links).map((links, index) => (
          <ul className={styles['learn-more__list']} key={index}>
            {links.map((link, i) => (
              <li key={i}>
                <Link href={link.href}>{link.label + '>'}</Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default LearnMore;
