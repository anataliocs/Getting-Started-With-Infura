import styles from '../styles/modules/StyleGuide.module.css';
import PrimaryButton from './PrimaryButton';

const StyleGuide = () => {
  return (
    <div className={styles.style_guide}>
      <h1 className={styles.style_guide__header}>Style Guide</h1>
      <section className={styles.style_guide__section}>
        <h2 className={styles.style_guide__section_header}>Buttons</h2>
        <PrimaryButton>
          Primary Button
        </PrimaryButton>
      </section>

      <section className={styles.style_guide__section}>
        <h2 className={styles.style_guide__section_header}>Links</h2>
      </section>
    </div>
  );
};

export default StyleGuide;