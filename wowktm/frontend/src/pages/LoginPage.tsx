import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '../components/ToastProvider';
import { useScrollToTop } from '../hooks/useScrollToTop';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LocationState {
  email?: string;
  message?: string;
  returnUrl?: string;
}

const LoginPage = () => {
  useScrollToTop();
  
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const state = location.state as LocationState;

  const [formData, setFormData] = useState<LoginFormData>({
    email: state?.email || '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  // Show welcome message if coming from signup
  useEffect(() => {
    if (state?.message) {
      showToast(state.message, 'success');
    }
  }, [state?.message, showToast]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Please fix the errors below', 'error');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check if user exists (mock check)
      const existingUser = localStorage.getItem('wowktm_user');
      
      if (existingUser) {
        const userData = JSON.parse(existingUser);
        
        // Mock login validation
        if (userData.email === formData.email) {
          // Store login session
          localStorage.setItem('wowktm_session', JSON.stringify({
            user: userData,
            loginTime: new Date().toISOString(),
            rememberMe: formData.rememberMe
          }));

          showToast(`Welcome back, ${userData.firstName}! 🎉`, 'success');
          
          // Navigate to return URL or profile
          const returnUrl = state?.returnUrl || '/profile';
          navigate(returnUrl, { 
            state: { 
              message: 'Login successful! Welcome back to WOW KTM.',
              user: userData 
            }
          });
        } else {
          setErrors({ email: 'Account not found with this email' });
          showToast('Account not found. Please check your email or sign up.', 'error');
        }
      } else {
        setErrors({ email: 'No account found. Please sign up first.' });
        showToast('No account found. Please create an account first.', 'error');
      }
    } catch (error) {
      showToast('Login failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!forgotEmail.trim()) {
      showToast('Please enter your email address', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setIsResettingPassword(true);

    try {
      // Simulate sending reset email
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showToast('Password reset instructions sent to your email! 📧', 'success');
      setShowForgotPassword(false);
      setForgotEmail('');
    } catch (error) {
      showToast('Failed to send reset email. Please try again.', 'error');
    } finally {
      setIsResettingPassword(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    showToast(`${provider} login will be available soon! 🚀`, 'info');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Link to="/" className="inline-block mb-6">
              <img src="/logo.png" alt="WOW KTM" className="h-12 mx-auto" />
            </Link>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-600 mt-2">Sign in to continue your amazing journey</p>
          </motion.div>

          {/* Main Login Card */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            
            {!showForgotPassword ? (
              /* Login Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Social Login Buttons */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Google')}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all font-medium"
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Facebook')}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all font-medium"
                  >
                    <svg className="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Continue with Facebook
                  </button>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                  </div>
                </div>

                {/* Email Input */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {formData.email && !errors.email && (
                      <div className="absolute right-3 top-3 text-green-500">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </motion.div>

                {/* Password Input */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10 ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? '👁️' : '🙈'}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </motion.div>

                {/* Remember Me & Forgot Password */}
                <motion.div 
                  className="flex items-center justify-between"
                  variants={itemVariants}
                >
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Remember me</span>
                  </label>
                  
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Forgot password?
                  </button>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <span>🚀</span>
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              /* Forgot Password Form */
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Reset Password</h3>
                  <p className="text-gray-600">Enter your email and we'll send you reset instructions</p>
                </div>

                <form onSubmit={handleForgotPassword}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
                    >
                      ← Back to Login
                    </button>
                    
                    <button
                      type="submit"
                      disabled={isResettingPassword}
                      className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium disabled:opacity-50 flex items-center justify-center"
                    >
                      {isResettingPassword ? (
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        'Send Reset Link'
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </motion.div>

          {/* Sign Up Link */}
          <motion.div 
            className="text-center mt-6"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                Create one for free
              </Link>
            </p>
          </motion.div>

          {/* Features */}
          <motion.div 
            className="bg-white rounded-xl p-6 mt-6 border border-gray-100"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Why Choose WOW KTM? 🌟
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-3">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">Free shipping over Rs. 2,000</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">24/7 customer support</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">Easy returns & exchanges</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">Secure payments</span>
              </div>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-8 mt-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Verified Business</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>Privacy Protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;