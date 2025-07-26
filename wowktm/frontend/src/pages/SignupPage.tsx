import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../components/ToastProvider';
import { useScrollToTop } from '../hooks/useScrollToTop';

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  gender: string;
  interests: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  agreeToTerms: boolean;
  agreeToMarketing: boolean;
  agreeToPrivacy: boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

const INTERESTS_OPTIONS = [
  'Fashion & Clothing', 'Electronics & Gadgets', 'Home & Garden', 'Sports & Outdoors',
  'Books & Media', 'Health & Beauty', 'Jewelry & Accessories', 'Art & Collectibles',
  'Automotive', 'Baby & Kids', 'Pet Supplies', 'Food & Beverages'
];

const SignupPage = () => {
  useScrollToTop();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    interests: [],
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Nepal'
    },
    agreeToTerms: false,
    agreeToMarketing: false,
    agreeToPrivacy: false
  });
  
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const { showToast } = useToast();
  const navigate = useNavigate();

  // Memoized validation function to prevent infinite re-renders
  const validateForm = React.useCallback(() => {
    const errors: ValidationErrors = {};

    // Step 1 validations
    if (currentStep >= 1) {
      if (!formData.firstName.trim()) errors.firstName = 'First name is required';
      if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
      
      if (!formData.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
      
      if (!formData.phone.trim()) {
        errors.phone = 'Phone number is required';
      } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
        errors.phone = 'Please enter a valid phone number';
      }
    }

    // Step 2 validations
    if (currentStep >= 2) {
      if (!formData.password) {
        errors.password = 'Password is required';
      } else {
        const strength = calculatePasswordStrength(formData.password);
        if (passwordStrength !== strength) {
          setPasswordStrength(strength);
        }
        if (strength < 3) {
          errors.password = 'Password must be stronger (at least 8 characters with mixed case, numbers, and symbols)';
        }
      }
      
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
      
      if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) errors.gender = 'Please select your gender';
    }

    // Step 3 validations
    if (currentStep >= 3) {
      if (!formData.address.street.trim()) errors.street = 'Street address is required';
      if (!formData.address.city.trim()) errors.city = 'City is required';
      if (!formData.address.state.trim()) errors.state = 'State is required';
      if (!formData.address.zipCode.trim()) errors.zipCode = 'ZIP code is required';
    }

    // Final step validations
    if (currentStep >= 4) {
      if (!formData.agreeToTerms) errors.agreeToTerms = 'You must agree to the terms and conditions';
      if (!formData.agreeToPrivacy) errors.agreeToPrivacy = 'You must agree to the privacy policy';
    }

    // Only update state if errors have actually changed
    const errorKeys = Object.keys(errors).sort();
    const currentErrorKeys = Object.keys(validationErrors).sort();
    const errorsChanged = errorKeys.length !== currentErrorKeys.length || 
                         errorKeys.some((key, index) => key !== currentErrorKeys[index]) ||
                         errorKeys.some(key => errors[key] !== validationErrors[key]);
    
    if (errorsChanged) {
      setValidationErrors(errors);
    }
    
    return Object.keys(errors).length === 0;
  }, [formData, currentStep, passwordStrength, validationErrors]);

  // Real-time validation with debounce
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      validateForm();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [validateForm]);

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof SignupFormData] as any,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const validateCurrentStep = React.useCallback((): boolean => {
    const errors: ValidationErrors = {};

    switch (currentStep) {
      case 1:
        if (!formData.firstName.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
        if (!formData.email.trim()) errors.email = 'Email is required';
        if (!formData.phone.trim()) errors.phone = 'Phone number is required';
        break;
      case 2:
        if (!formData.password) errors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
        if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
        if (!formData.gender) errors.gender = 'Gender is required';
        break;
      case 3:
        if (!formData.address.street.trim()) errors.street = 'Street address is required';
        if (!formData.address.city.trim()) errors.city = 'City is required';
        if (!formData.address.state.trim()) errors.state = 'State is required';
        if (!formData.address.zipCode.trim()) errors.zipCode = 'ZIP code is required';
        break;
    }

    return Object.keys(errors).length === 0;
  }, [currentStep, formData]);

  const handleSubmit = async () => {
    if (!validateForm()) {
      showToast('Please fix all errors before submitting', 'error');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user data (in a real app, this would be sent to backend)
      localStorage.setItem('wowktm_user', JSON.stringify({
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        emailVerified: true,
        phoneVerified: true,
        status: 'active'
      }));

      showToast('Account created successfully! Welcome to WOW KTM!', 'success');
      navigate('/profile', { state: { newUser: true, message: 'Welcome! Your account has been created successfully.' } });
    } catch (error) {
      showToast('Registration failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= step 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {currentStep > step ? '✓' : step}
            </div>
            {step < 4 && (
              <div className={`w-20 h-1 mx-2 ${
                currentStep > step ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Step {currentStep} of 4: {
            currentStep === 1 ? 'Personal Information' :
            currentStep === 2 ? 'Security & Preferences' :
            currentStep === 3 ? 'Address & Interests' :
            'Review & Confirm'
          }
        </p>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <motion.div
      key="step1"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...({ className: "space-y-6" } as any)}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Let's Get Started
        </h2>
        <p className="text-gray-600 mt-2">Tell us about yourself</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              validationErrors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your first name"
          />
          {validationErrors.firstName && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              validationErrors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your last name"
          />
          {validationErrors.lastName && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <div className="relative">
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10 ${
              validationErrors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email address"
          />
          {emailVerified && (
            <div className="absolute right-3 top-3 text-green-500">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        {validationErrors.email && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <div className="relative">
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10 ${
              validationErrors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="+977 98xxxxxxxx"
          />
          {phoneVerified && (
            <div className="absolute right-3 top-3 text-green-500">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        {validationErrors.phone && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
        )}
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      key="step2"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...({ className: "space-y-6" } as any)}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Secure Your Account
        </h2>
        <p className="text-gray-600 mt-2">Create a strong password and tell us more about yourself</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password *
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10 ${
              validationErrors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Create a strong password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? '👁️' : '🙈'}
          </button>
        </div>
        
        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="mt-2">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Password Strength</span>
              <span className={`${
                passwordStrength === 5 ? 'text-green-600' :
                passwordStrength >= 3 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {passwordStrength === 5 ? 'Very Strong' :
                 passwordStrength >= 3 ? 'Good' :
                 'Weak'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  passwordStrength === 5 ? 'bg-green-500' :
                  passwordStrength >= 3 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${(passwordStrength / 5) * 100}%` }}
              />
            </div>
          </div>
        )}
        
        {validationErrors.password && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password *
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10 ${
              validationErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? '👁️' : '🙈'}
          </button>
        </div>
        {validationErrors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.confirmPassword}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              validationErrors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validationErrors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.dateOfBirth}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender *
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              validationErrors.gender ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          {validationErrors.gender && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.gender}</p>
          )}
        </div>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      key="step3"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...({ className: "space-y-6" } as any)}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Where Are You?
        </h2>
        <p className="text-gray-600 mt-2">Help us deliver to you and personalize your experience</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Street Address *
        </label>
        <input
          type="text"
          value={formData.address.street}
          onChange={(e) => handleInputChange('address.street', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            validationErrors.street ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your street address"
        />
        {validationErrors.street && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.street}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            value={formData.address.city}
            onChange={(e) => handleInputChange('address.city', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              validationErrors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your city"
          />
          {validationErrors.city && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State/Province *
          </label>
          <input
            type="text"
            value={formData.address.state}
            onChange={(e) => handleInputChange('address.state', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              validationErrors.state ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your state/province"
          />
          {validationErrors.state && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.state}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ZIP/Postal Code *
          </label>
          <input
            type="text"
            value={formData.address.zipCode}
            onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              validationErrors.zipCode ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter ZIP/Postal code"
          />
          {validationErrors.zipCode && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.zipCode}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            value={formData.address.country}
            onChange={(e) => handleInputChange('address.country', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="Nepal">Nepal</option>
            <option value="India">India</option>
            <option value="China">China</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          What are you interested in? (Optional)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {INTERESTS_OPTIONS.map((interest) => (
            <label
              key={interest}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                formData.interests.includes(interest)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.interests.includes(interest)}
                onChange={() => handleInterestToggle(interest)}
                className="hidden"
              />
              <span className="text-sm">{interest}</span>
            </label>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div
      key="step4"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...({ className: "space-y-6" } as any)}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Almost Done!
        </h2>
        <p className="text-gray-600 mt-2">Review your information and agree to our terms</p>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
          </div>
          <div>
            <p><strong>Location:</strong> {formData.address.city}, {formData.address.state}</p>
            <p><strong>Interests:</strong> {formData.interests.length} selected</p>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-4">
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">
            I agree to the{' '}
            <Link to="/terms" className="text-blue-600 hover:underline" target="_blank">
              Terms and Conditions
            </Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-blue-600 hover:underline" target="_blank">
              Privacy Policy
            </Link>
            *
          </span>
        </label>
        {validationErrors.agreeToTerms && (
          <p className="text-red-500 text-sm">{validationErrors.agreeToTerms}</p>
        )}

        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={formData.agreeToPrivacy}
            onChange={(e) => handleInputChange('agreeToPrivacy', e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">
            I acknowledge that I have read and understood the Privacy Policy *
          </span>
        </label>
        {validationErrors.agreeToPrivacy && (
          <p className="text-red-500 text-sm">{validationErrors.agreeToPrivacy}</p>
        )}

        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={formData.agreeToMarketing}
            onChange={(e) => handleInputChange('agreeToMarketing', e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">
            I would like to receive marketing communications and special offers (Optional)
          </span>
        </label>
      </div>

      {/* Benefits Section */}
      <div className="bg-green-50 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-800 mb-3">🎉 Your WOW KTM Benefits</h3>
        <ul className="space-y-2 text-sm text-green-700">
          <li>✓ Free shipping on orders over Rs. 2,000</li>
          <li>✓ Early access to flash sales and exclusive deals</li>
          <li>✓ Personalized product recommendations</li>
          <li>✓ Priority customer support</li>
          <li>✓ Birthday rewards and special discounts</li>
        </ul>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <img src="/logo.png" alt="WOW KTM" className="h-12 mx-auto" />
            </Link>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Join WOW KTM
            </h1>
            <p className="text-gray-600 mt-2">Start your amazing shopping journey with us</p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {renderProgressBar()}

            <AnimatePresence mode="wait">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <button
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
                >
                  ← Previous
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  disabled={!validateCurrentStep()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !validateForm()}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <span>🚀</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                Sign in here
              </Link>
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-8 mt-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Secure & Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Trusted by 50,000+ Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
              </svg>
              <span>Quick Setup</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;