import { useState } from 'react';
import IconButton from './IconButton';
import ClipboardIcon from './icons/ClipboardIcon';
import Check from './icons/Check';
import BN from 'bn.js';

import styles from '@styles/modules/ReadOnly.module.css';
import LinkStyles from '@styles/modules/Link.module.css';

interface ReadOnlyProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number | BN | null;
  hideable?: boolean;
  copyable?: boolean;
}

const ReadOnly = ({
  label,
  value,
  hideable = false,
  copyable,
  className,
}: ReadOnlyProps) => {
  const [isHidden, setIsHidden] = useState(hideable);
  const [isCopied, setIsCopied] = useState(false);

  const toggleShowHide = () => {
    setIsHidden(!isHidden);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${value}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className={className}>
      <label className={styles.label}>{label}</label>
      <div className={styles.container}>
        {isHidden ? (
          <p className={styles.dots}>•••••••••••••••••••••••••••••••</p>
        ) : (
          <p className={styles.value}>{value}</p>
        )}
        {copyable && (
          <IconButton
            flat
            onClick={copyToClipboard}
            className={styles.copy__button}
          >
            {isCopied ? (
              <Check className={styles.check__icon} />
            ) : (
              <ClipboardIcon />
            )}
          </IconButton>
        )}
      </div>
      {hideable && (
        <button
          onClick={toggleShowHide}
          className={`${LinkStyles.link} text-xs`}
        >
          Show/Hide
        </button>
      )}
    </div>
  );
};

export default ReadOnly;
