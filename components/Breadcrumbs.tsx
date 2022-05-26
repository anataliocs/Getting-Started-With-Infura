import styles from '../styles/modules/Breadcrumbs.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface Breadcrumb {
  label: string;
  href: string;
}

const Breadcrumbs = ({
  breadcrumbs,
  ...props
}: {
  breadcrumbs: Breadcrumb[];
  props?: React.HTMLProps<HTMLDivElement>;
}) => {
  const router = useRouter();

  const breadcrumbState = (crumb: Breadcrumb) => {
    if (crumb.href === router.pathname) {
      return styles.breadcrumb__active;
    }
    return styles.breadcrumb;
  };

  return (
    <div className={styles.breadcrumbs} {...props}>
      {breadcrumbs.map((breadcrumb, index) => (
        <Link key={`breadcrumb-${index}`} href={breadcrumb.href}>
          <a className={breadcrumbState(breadcrumb)}>
            <span>{breadcrumb.label}</span>
            {index !== breadcrumbs.length - 1 && (
              <span className={styles.slash}>/</span>
            )}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Breadcrumbs;
