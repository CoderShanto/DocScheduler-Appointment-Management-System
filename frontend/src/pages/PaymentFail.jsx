import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentFail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tran_id = searchParams.get('tran_id');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
          <svg
            className="h-10 w-10 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Failed
        </h2>
        
        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed. Please try again.
        </p>
        
        {tran_id && (
          <p className="text-sm text-gray-500 mb-6">
            Transaction ID: <span className="font-mono">{tran_id}</span>
          </p>
        )}
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/my-appointments')}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition-all"
          >
            View Appointments
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;