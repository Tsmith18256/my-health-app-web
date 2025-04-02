'use client';

import { useEffect, useState } from 'react';

export const FormActionErrorToast = (props: IFormActionErrorToastProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const message = props.error?.message;

  useEffect(() => {
    setIsVisible(true);

    setTimeout(() => setIsVisible(false), 5000);
  }, [message]);

  if (!isVisible || !message) {
    return null;
  }

  return (
    <div className="bg-red-600 border-3 bottom-8 fixed flex font-bold h-14 inset-x-4 items-center px-4 rounded-lg text-lg z-90">
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
