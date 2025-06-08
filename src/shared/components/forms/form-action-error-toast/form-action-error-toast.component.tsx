"use client";

import { useEffect, useState } from "react";
import styles from "./form-action-error-toast.module.css";

export const FormActionErrorToast = ({
  message,
}: IFormActionErrorToastProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  }, [message]);

  if (!isVisible || !message) {
    return null;
  }

  return <div className={styles.container}>{message}</div>;
};

interface IFormActionErrorToastProps {
  message?: string;
}
