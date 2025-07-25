import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastProvider';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  subscribeNewsletter: boolean;
}

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      showToast('First name is required', 'error');
      return false;
    }
    if (!formData.lastName.trim()) {
      showToast('Last name is required', 'error');
      return false;
    }
    if (!formData.email.trim()) {
      showToast('Email is required', 'error');
      return false;
    }
    if (formData.password.length < 8) {
      showToast('Password must be at least 8 characters long', 'error');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return false;
    }
    if (!formData.agreeToTerms) {
      showToast('Please agree to the terms and conditions', 'error');
      return false;
    }
    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Mock signup - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showToast('Account created successfully! Welcome to WoWKTM!', 'success');
      navigate('/');
    } catch (error) {
      showToast('Registration failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = async (provider: string) => {
    showToast(`${provider} registration coming soon!`, 'info');
  };

  const socialProviders = [
    {
      name: 'Google',
      id: 'google',
      color: 'bg-red-500 hover:bg-red-600',
      icon: '🔍'
    },
    {
      name: 'Facebook',
      id: 'facebook',
      color: 'bg-blue-600 hover:bg-blue-700',
      icon: '📘'
    },
    {
      name: 'Apple',
      id: 'apple',
      color: 'bg-gray-900 hover:bg-black',
      icon: '🍎'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-wowktm-primary/10 via-white to-wowktm-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-wowktm-primary to-wowktm-secondary p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Join WoWKTM</h1>
          <p className="text-white/80">Create your account and start selling</p>
        </div>

        <div className="p-8">
          {/* Social Signup Buttons */}
          <div className="space-y-3 mb-6">
            {socialProviders.map((provider) => (
              <button
                key={provider.id}
                onClick={() => handleSocialSignup(provider.name)}
                className={`w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-105 ${provider.color}`}
              >
                <span className="text-xl">{provider.icon}</span>
                <span>Sign up with {provider.name}</span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or create account with email</span>
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent transition-all duration-300 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent transition-all duration-300 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Terms and Newsletter */}
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-wowktm-primary focus:ring-wowktm-primary border-gray-300 rounded"
                  required
                />
                <label className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-wowktm-primary hover:text-wowktm-accent">
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-wowktm-primary hover:text-wowktm-accent">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="subscribeNewsletter"
                  checked={formData.subscribeNewsletter}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-wowktm-primary focus:ring-wowktm-primary border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-600">
                  Subscribe to our newsletter for updates and exclusive offers
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-wowktm-primary to-wowktm-secondary text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-wowktm-primary hover:text-wowktm-accent font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
