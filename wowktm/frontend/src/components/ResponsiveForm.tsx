import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'tel' | 'password' | 'textarea' | 'select' | 'file' | 'number';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  accept?: string; // For file inputs
  multiple?: boolean; // For file inputs
  validation?: {
    pattern?: RegExp;
    message?: string;
    minLength?: number;
    maxLength?: number;
  };
}

interface ResponsiveFormProps {
  fields: FormField[];
  title?: string;
  submitText?: string;
  onSubmit: (data: Record<string, any>) => void;
  className?: string;
  layout?: 'single' | 'two-column';
  showProgress?: boolean;
}

const ResponsiveForm: React.FC<ResponsiveFormProps> = ({
  fields,
  title,
  submitText = 'Submit',
  onSubmit,
  className = '',
  layout = 'single',
  showProgress = false,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement>>({});

  const stepsPerPage = 5; // Show 5 fields per step on mobile
  const totalSteps = Math.ceil(fields.length / stepsPerPage);
  const currentFields = showProgress 
    ? fields.slice(currentStep * stepsPerPage, (currentStep + 1) * stepsPerPage)
    : fields;

  const validateField = (field: FormField, value: any): string => {
    if (field.required && (!value || value.toString().trim() === '')) {
      return `${field.label} is required`;
    }

    if (field.validation) {
      if (field.validation.pattern && !field.validation.pattern.test(value)) {
        return field.validation.message || `Invalid ${field.label.toLowerCase()}`;
      }

      if (field.validation.minLength && value.length < field.validation.minLength) {
        return `${field.label} must be at least ${field.validation.minLength} characters`;
      }

      if (field.validation.maxLength && value.length > field.validation.maxLength) {
        return `${field.label} must be no more than ${field.validation.maxLength} characters`;
      }
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    // Phone validation
    if (field.type === 'tel' && value) {
      const phoneRegex = /^[+]?[\d\s\-\(\)]+$/;
      if (!phoneRegex.test(value)) {
        return 'Please enter a valid phone number';
      }
    }

    return '';
  };

  const handleInputChange = (field: FormField, value: any) => {
    setFormData(prev => ({ ...prev, [field.id]: value }));
    
    // Clear error when user starts typing
    if (errors[field.id]) {
      setErrors(prev => ({ ...prev, [field.id]: '' }));
    }
  };

  const handleFileChange = (field: FormField, files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    setFormData(prev => ({ 
      ...prev, 
      [field.id]: field.multiple ? fileArray : fileArray[0] 
    }));

    // Simulate upload progress for demo
    fileArray.forEach((file, index) => {
      const progressKey = `${field.id}_${index}`;
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(prev => ({ ...prev, [progressKey]: progress }));
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 100);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    fields.forEach(field => {
      const error = validateField(field, formData[field.id]);
      if (error) {
        newErrors[field.id] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Scroll to first error on mobile
      const firstErrorField = Object.keys(newErrors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderField = (field: FormField) => {
    const hasError = !!errors[field.id];
    const value = formData[field.id] || '';

    const inputClasses = `
      w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors
      text-base md:text-sm
      ${hasError 
        ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
        : 'border-gray-300 focus:ring-wowktm-primary focus:border-wowktm-primary'
      }
    `;

    const labelClasses = `
      block text-sm font-medium mb-2
      ${hasError ? 'text-red-700' : 'text-gray-700'}
    `;

    switch (field.type) {
      case 'textarea':
        return (
          <div key={field.id} className="space-y-2">
            <label htmlFor={field.id} className={labelClasses}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              id={field.id}
              value={value}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={field.placeholder}
              rows={4}
              className={inputClasses}
              style={{ resize: 'vertical' }}
            />
            {hasError && (
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600"
              >
                {errors[field.id]}
              </motion.span>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="space-y-2">
            <label htmlFor={field.id} className={labelClasses}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <select
              id={field.id}
              value={value}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className={`${inputClasses} cursor-pointer`}
            >
              <option value="">{field.placeholder || `Select ${field.label}`}</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {hasError && (
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600"
              >
                {errors[field.id]}
              </motion.span>
            )}
          </div>
        );

      case 'file':
        return (
          <div key={field.id} className="space-y-2">
            <label htmlFor={field.id} className={labelClasses}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <input
                ref={(el) => {
                  if (el) fileInputRefs.current[field.id] = el;
                }}
                id={field.id}
                type="file"
                accept={field.accept}
                multiple={field.multiple}
                onChange={(e) => handleFileChange(field, e.target.files)}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRefs.current[field.id]?.click()}
                className={`
                  w-full flex items-center justify-center px-4 py-3 border-2 border-dashed rounded-lg
                  transition-colors cursor-pointer
                  ${hasError 
                    ? 'border-red-300 text-red-600 hover:border-red-400' 
                    : 'border-gray-300 text-gray-600 hover:border-wowktm-primary hover:text-wowktm-primary'
                  }
                `}
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                {formData[field.id] 
                  ? `${Array.isArray(formData[field.id]) ? formData[field.id].length : 1} file(s) selected`
                  : field.placeholder || 'Choose files'
                }
              </button>
              
              {/* Upload Progress */}
              {Object.entries(uploadProgress).some(([key]) => key.startsWith(field.id)) && (
                <div className="mt-2 space-y-1">
                  {Object.entries(uploadProgress)
                    .filter(([key]) => key.startsWith(field.id))
                    .map(([key, progress]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-wowktm-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{progress}%</span>
                      </div>
                    ))
                  }
                </div>
              )}
            </div>
            {hasError && (
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600"
              >
                {errors[field.id]}
              </motion.span>
            )}
          </div>
        );

      default:
        return (
          <div key={field.id} className="space-y-2">
            <label htmlFor={field.id} className={labelClasses}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              id={field.id}
              type={field.type}
              value={value}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={field.placeholder}
              className={inputClasses}
              inputMode={field.type === 'tel' ? 'tel' : field.type === 'email' ? 'email' : 'text'}
            />
            {hasError && (
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600"
              >
                {errors[field.id]}
              </motion.span>
            )}
          </div>
        );
    }
  };

  return (
    <div className={`responsive-form max-w-2xl mx-auto ${className}`}>
      {title && (
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          {showProgress && totalSteps > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-4">
              <span className="text-sm text-gray-500">Step {currentStep + 1} of {totalSteps}</span>
              <div className="flex-1 max-w-xs bg-gray-200 rounded-full h-2 ml-4">
                <div
                  className="bg-wowktm-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 md:p-8"
      >
        <AnimatePresence mode="wait">
          <motion.section
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`
              grid gap-6
              ${layout === 'two-column' && !showProgress 
                ? 'md:grid-cols-2' 
                : 'grid-cols-1'
              }
            `}
          >
            {currentFields.map(renderField)}
          </motion.section>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          {showProgress && totalSteps > 1 ? (
            <>
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              {currentStep === totalSteps - 1 ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-wowktm-primary text-white font-medium rounded-lg hover:bg-wowktm-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    submitText
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-wowktm-primary text-white font-medium rounded-lg hover:bg-wowktm-secondary transition-colors"
                >
                  Next
                </button>
              )}
            </>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-3 bg-wowktm-primary text-white font-medium rounded-lg hover:bg-wowktm-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
                  </svg>
                  Submitting...
                </>
              ) : (
                submitText
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ResponsiveForm;
