import styles from '../styles/modules/Input.module.css';
interface SelectInputProps {
  label: string;
  options: string[];
  id: string;
  helperText?: string;
  containerClassName?: string;
  props?: React.HTMLAttributes<HTMLSelectElement>;
}
const SelectInput = ({
  label,
  options,
  id,
  helperText,
  containerClassName,
  props,
}: SelectInputProps) => {
  return (
    <div className={`${styles.container} ${containerClassName}`}>
      <div className={styles.inputBorder}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <select
          id={id}
          className={styles.select}
          defaultValue={options[0]}
          aria-describedby={helperText ? `${id}-helper-text` : ''}
          {...props}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {helperText && (
        <p id={`${id}-helper-text`} className={styles.helperText}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default SelectInput;
