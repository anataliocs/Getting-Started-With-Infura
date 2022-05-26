import styles from '../styles/modules/Input.module.css';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string;
  helperText?: string;
  containerClassName?: string;
  step?: number | string;
  name?: string;
  value?: string | number;
  labelClassName?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  label,
  id,
  type = 'text',
  placeholder,
  helperText,
  containerClassName,
  step,
  name,
  value,
  onChange,
  labelClassName = 'bg-black',
  className,
}: InputProps) => {
  return (
    <div className={`${styles.container} ${containerClassName}`}>
      <div className={styles.inputBorder}>
        <label htmlFor={id} className={`${styles.label} ${labelClassName}`}>
          {label}
        </label>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className={`${styles.input} ${className}`}
          aria-describedby={helperText ? `${id}-helper-text` : ''}
          step={step}
          name={name}
          {...(value !== undefined && { value })}
          {...(onChange !== undefined && { onChange })}
        />
      </div>
      {helperText && (
        <p id={`${id}-helper-text`} className={styles.helperText}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default TextInput;
