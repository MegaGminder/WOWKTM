import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '../components/ToastProvider';

const EmailVerificationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error' | 'expired'>('verifying');
  const [email, setEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const token = searchParams.get('token');
  const emailParam = searchParams.get('email');

  useEffect(() => {
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [emailParam]);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        return;
      }

      try {
        // Mock API call for email verification
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate different outcomes based on token
        if (token === 'expired') {
          setStatus('expired');
        } else if (token === 'invalid') {
          setStatus('error');
        } else {
          setStatus('success');
          showToast('Email verified successfully!', 'success');
          // Auto redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      } catch (error) {
        setStatus('error');
        showToast('Email verification failed', 'error');
      }
    };

    verifyEmail();
  }, [token, navigate, showToast]);

  const handleResendVerification = async () => {
    if (!email) {
      showToast('Email address not found', 'error');
      return;
    }

    setResendLoading(true);
    
    try {
      // Mock API call for resending verification email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showToast('Verification email sent successfully!', 'success');
    } catch (error) {
      showToast('Failed to send verification email', 'error');
    } finally {
      setResendLoading(false);
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Verifying Your Email</h2>
            <p className="text-gray-600 mb-6">
              Please wait while we verify your email address...
            </p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Email Verified!</h2>
            <p className="text-gray-600 mb-6">
              Your email has been successfully verified. You will be redirected to the login page in a few seconds.
            </p>
            <Link
              to="/login"
              className="inline-block bg-gradient-to-r from-wowktm-primary to-wowktm-accent text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Go to Login
            </Link>
          </div>
        );

      case 'expired':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Verification Link Expired</h2>
            <p className="text-gray-600 mb-6">
              This verification link has expired. Please request a new verification email.
            </p>
            {email && (
              <div className="space-y-4">
                <button
                  onClick={handleResendVerification}
                  disabled={resendLoading}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
                    resendLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-wowktm-primary to-wowktm-accent hover:shadow-lg'
                  }`}
                >
                  {resendLoading ? 'Sending...' : 'Resend Verification Email'}
                </button>
              </div>
            )}
          </div>
        );

      case 'error':
      default:
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Verification Failed</h2>
            <p className="text-gray-600 mb-6">
              This verification link is invalid or has already been used.
            </p>
            <div className="space-y-4">
              {email && (
                <button
                  onClick={handleResendVerification}
                  disabled={resendLoading}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
                    resendLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-wowktm-primary to-wowktm-accent hover:shadow-lg'
                  }`}
                >
                  {resendLoading ? 'Sending...' : 'Resend Verification Email'}
                </button>
              )}
              <Link
                to="/signup"
                className="block w-full text-center text-wowktm-primary hover:text-wowktm-accent font-semibold py-2"
              >
                Back to Sign Up
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wowktm-primary/10 via-white to-wowktm-accent/10 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {renderContent()}
        
        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            Need help?{' '}
            <Link to="/contact" className="text-wowktm-primary hover:text-wowktm-accent font-semibold">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
