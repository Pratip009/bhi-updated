/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function SuccessPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      verifyPayment(sessionId);
    } else {
      setError('No session ID found');
      setLoading(false);
    }
  }, [searchParams]);

  const verifyPayment = async (sessionId: string) => {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment verification failed');
      }

      if (data.status === 'completed') {
        setPaymentStatus('success');
      } else {
        setPaymentStatus('failed');
        setError('Payment was not completed');
      }
    } catch (err: any) {
      console.error('Error verifying payment:', err);
      setError(err.message);
      setPaymentStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'failed' || error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <FaTimesCircle className="w-12 h-12 text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Failed
          </h1>
          <p className="text-gray-600 mb-8">
            {error || 'Unfortunately, your payment could not be processed. Please try again.'}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push(`/course/${params.id}`)}
              className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push('/course')}
              className="w-full py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
            <FaCheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful! 🎉
        </h1>
        <p className="text-gray-600 mb-8">
          Congratulations! You've successfully enrolled in the course. You'll receive a confirmation email shortly.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <p className="text-green-800 font-medium text-sm">
            ✓ Payment confirmed
          </p>
          <p className="text-green-700 text-sm mt-1">
            You now have lifetime access to this course
          </p>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => router.push(`/course/${params.id}`)}
            className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Go to Course
          </button>
          <button
            onClick={() => router.push('/course')}
            className="w-full py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Browse More Courses
          </button>
        </div>
      </div>
    </div>
  );
}