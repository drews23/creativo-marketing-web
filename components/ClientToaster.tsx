'use client';

import { Toaster } from 'react-hot-toast';

export function ClientToaster() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1f2937',
          color: '#fff',
          borderRadius: '0.5rem',
        },
        success: {
          duration: 3000,
          style: {
            background: '#059669',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#059669',
          },
        },
        error: {
          duration: 4000,
          style: {
            background: '#dc2626',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#dc2626',
          },
        },
      }}
    />
  );
}
