import * as React from 'react';
import { toast, ToastBar, Toaster } from 'react-hot-toast';
import { HiX } from 'react-icons/hi';

export default function DismissableToast() {

  return (
    <div>
      <Toaster
        reverseOrder={false}
        position='top-center'
        toastOptions={{
          duration: 3000,
          
          style: {
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#4caf50',
            },
          },

        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <button
                    className='ring-primary-400 rounded-full p-1 transition hover:bg-[#444] focus:outline-none focus-visible:ring'
                    onClick={() => toast.dismiss(t.id)}
                  >
                    <HiX />
                  </button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  );
}
