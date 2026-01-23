import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { assets } from '../assets/assets';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  const tran_id = searchParams.get('tran_id');

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/my-appointments');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <svg
            className="h-10 w-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h2>
        
        <p className="text-gray-600 mb-4">
          Your appointment has been confirmed and paid.
        </p>
        
        {tran_id && (
          <p className="text-sm text-gray-500 mb-6">
            Transaction ID: <span className="font-mono">{tran_id}</span>
          </p>
        )}
        
        <div className="mb-6">
          <p className="text-gray-700">
            Redirecting to your appointments in <span className="font-bold text-primary">{countdown}</span> seconds...
          </p>
        </div>
        
        <button
          onClick={() => navigate('/my-appointments')}
          className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-all"
        >
          Go to Appointments Now
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;