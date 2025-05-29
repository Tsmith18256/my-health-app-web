'use client';

import { useEffect, useState } from 'react';
import styles from './form-action-error-toast.module.css';

export const FormActionErrorToast = (props: IFormActionErrorToastProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const message = props.error?.message;

  useEffect(() => {
    setIsVisible(true);

    setTimeout(() => { setIsVisible(false); }, 5000);
  }, [message]);

  if (!isVisible || !message) {
    return null;
  }

  return (
    <div className={styles.container}>
      {message}
    </div>
  );
}

export interface IFormActionError {
  message: string;
}

export interface IFormActionErrorToastProps {
  error?: IFormActionError;
}
