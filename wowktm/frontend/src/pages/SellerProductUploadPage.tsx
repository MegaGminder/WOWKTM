import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastProvider';
import { motion } from 'framer-motion';
import OptimizedImage from '../components/OptimizedImage';
import ProductService from '../services/ProductService';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  images: string[];
  category: string;
  subcategory: string;
  stockQuantity: number;
  tags: string[];
  materials: string[];
  dimensions: string;
  weight: string;
  policies: {
    returns: string;
    exchanges: string;
    customization: string;
  };
  delivery: {
    standardDelivery: {
      available: boolean;
      cost: number;
      estimatedDays: string;
    };
    expressDelivery: {
      available: boolean;
      cost: number;
      estimatedDays: string;
    };
    overnightDelivery: {
      available: boolean;
      cost: number;
      estimatedDays: string;
    };
    freeShippingThreshold?: number;
  };
}

const categories = [
  'Fashion', 'Spiritual', 'Home Decor', 'Collectibles', 'Art', 'Jewelry',
  'Textiles', 'Kitchenware', 'Beauty', 'Stationery', 'Food & Beverage'
];

const SellerProductUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    originalPrice: undefined,
    imageUrl: '',
    images: [''],
    category: '',
    subcategory: '',
    stockQuantity: 1,
    tags: [],
    materials: [],
    dimensions: '',
    weight: '',
    policies: {
      returns: '30-day return policy',
      exchanges: 'Free exchanges within 30 days',
      customization: 'Contact seller for customization options'
    },
    delivery: {
      standardDelivery: {
        available: true,
        cost: 5.99,
        estimatedDays: '5-7 business days'
      },
      expressDelivery: {
        available: true,
        cost: 12.99,
        estimatedDays: '2-3 business days'
      },
      overnightDelivery: {
        available: false,
        cost: 25.99,
        estimatedDays: '1 business day'
      },
      freeShippingThreshold: 50
    }
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (parent: string, field: string, value: any) => {
    setFormData(prev => {
      const parentObj = prev[parent as keyof ProductFormData] as any;
      return {
        ...prev,
        [parent]: {
          ...parentObj,
          [field]: value
        }
      };
    });
  };

  const handleDeliveryChange = (deliveryType: string, field: string, value: any) => {
    setFormData(prev => {
      const deliveryObj = prev.delivery[deliveryType as keyof typeof prev.delivery] as any;
      return {
        ...prev,
        delivery: {
          ...prev.delivery,
          [deliveryType]: {
            ...deliveryObj,
            [field]: value
          }
        }
      };
    });
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const updateImageField = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addMaterial = (material: string) => {
    if (material && !formData.materials.includes(material)) {
      setFormData(prev => ({
        ...prev,
        materials: [...prev.materials, material]
      }));
    }
  };

  const removeMaterial = (materialToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.filter(material => material !== materialToRemove)
    }));
  };

  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        return formData.name.trim() !== '' && 
               formData.description.trim() !== '' && 
               formData.price > 0 && 
               formData.imageUrl.trim() !== '';
      case 2:
        return formData.category !== '' && 
               formData.stockQuantity > 0;
      case 3:
        return true; // Optional step
      case 4:
        return true; // Optional step
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    } else {
      showToast('Please fill in all required fields', 'error');
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call to create product
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new product object
      const newProduct = ProductService.addProduct({
        name: formData.name,
        description: formData.description,
        price: formData.price,
        originalPrice: formData.originalPrice,
        imageUrl: formData.imageUrl,
        images: formData.images.filter(img => img.trim() !== ''),
        category: formData.category,
        subcategory: formData.subcategory,
        stockQuantity: formData.stockQuantity,
        tags: formData.tags,
        inStock: true,
        seller: {
          id: 'current-seller',
          name: 'Your Store',
          rating: 4.8,
          location: 'Your Location',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
          bio: 'Passionate about creating quality handcrafted items',
          totalSales: 0,
          responseTime: 'Usually responds within 2 hours',
          joinedDate: '2024'
        },
        delivery: formData.delivery,
        materials: formData.materials,
        dimensions: formData.dimensions,
        weight: formData.weight,
        policies: formData.policies
      });

      // In a real app, this would make an API call to save the product
      console.log('New product created:', newProduct);
      
      showToast('Product uploaded successfully! Your product page has been created.', 'success');
      
      // Redirect to the new product page
      navigate(`/product/${newProduct.id}`);
      
    } catch (error) {
      console.error('Error uploading product:', error);
      showToast('Failed to upload product. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Basic Product Information</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
          placeholder="Enter product name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
          placeholder="Describe your product"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price * ($)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Original Price ($)</label>
          <input
            type="number"
            value={formData.originalPrice || ''}
            onChange={(e) => handleInputChange('originalPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
            placeholder="Optional - for discounts"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Main Product Image URL *</label>
        <input
          type="url"
          value={formData.imageUrl}
          onChange={(e) => handleInputChange('imageUrl', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
          placeholder="https://example.com/image.jpg"
        />
        {formData.imageUrl && (
          <div className="mt-2">
            <OptimizedImage
              src={formData.imageUrl}
              alt="Product preview"
              className="w-32 h-32 object-cover rounded-lg"
              width={128}
              height={128}
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Images</label>
        {formData.images.map((image, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="url"
              value={image}
              onChange={(e) => updateImageField(index, e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
            {formData.images.length > 1 && (
              <button
                type="button"
                onClick={() => removeImageField(index)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addImageField}
          className="mt-2 px-4 py-2 text-sm text-wowktm-primary border border-wowktm-primary rounded-lg hover:bg-wowktm-primary hover:text-white transition-colors"
        >
          Add Another Image
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Category & Inventory</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
          <input
            type="text"
            value={formData.subcategory}
            onChange={(e) => handleInputChange('subcategory', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
            placeholder="Optional subcategory"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
        <input
          type="number"
          value={formData.stockQuantity}
          onChange={(e) => handleInputChange('stockQuantity', parseInt(e.target.value) || 1)}
          min="1"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
          placeholder="How many do you have in stock?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-wowktm-primary text-white text-sm rounded-full flex items-center"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 text-white hover:text-gray-200"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTag(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
          placeholder="Type a tag and press Enter"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Materials</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.materials.map(material => (
            <span
              key={material}
              className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center"
            >
              {material}
              <button
                type="button"
                onClick={() => removeMaterial(material)}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addMaterial(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
          placeholder="Type a material and press Enter"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions</label>
          <input
            type="text"
            value={formData.dimensions}
            onChange={(e) => handleInputChange('dimensions', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
            placeholder="e.g., 10 x 5 x 3 inches"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
          <input
            type="text"
            value={formData.weight}
            onChange={(e) => handleInputChange('weight', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
            placeholder="e.g., 500g or 1.2 lbs"
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Shipping & Policies</h2>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Options</h3>
        
        {/* Standard Delivery */}
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Standard Delivery</h4>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.delivery.standardDelivery.available}
                onChange={(e) => handleDeliveryChange('standardDelivery', 'available', e.target.checked)}
                className="w-4 h-4 text-wowktm-primary border-gray-300 rounded focus:ring-wowktm-primary"
              />
              <span className="ml-2 text-sm">Available</span>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Cost ($)</label>
              <input
                type="number"
                value={formData.delivery.standardDelivery.cost}
                onChange={(e) => handleDeliveryChange('standardDelivery', 'cost', parseFloat(e.target.value) || 0)}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Estimated Days</label>
              <input
                type="text"
                value={formData.delivery.standardDelivery.estimatedDays}
                onChange={(e) => handleDeliveryChange('standardDelivery', 'estimatedDays', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Express Delivery */}
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Express Delivery</h4>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.delivery.expressDelivery.available}
                onChange={(e) => handleDeliveryChange('expressDelivery', 'available', e.target.checked)}
                className="w-4 h-4 text-wowktm-primary border-gray-300 rounded focus:ring-wowktm-primary"
              />
              <span className="ml-2 text-sm">Available</span>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Cost ($)</label>
              <input
                type="number"
                value={formData.delivery.expressDelivery.cost}
                onChange={(e) => handleDeliveryChange('expressDelivery', 'cost', parseFloat(e.target.value) || 0)}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Estimated Days</label>
              <input
                type="text"
                value={formData.delivery.expressDelivery.estimatedDays}
                onChange={(e) => handleDeliveryChange('expressDelivery', 'estimatedDays', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Overnight Delivery */}
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Overnight Delivery</h4>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.delivery.overnightDelivery.available}
                onChange={(e) => handleDeliveryChange('overnightDelivery', 'available', e.target.checked)}
                className="w-4 h-4 text-wowktm-primary border-gray-300 rounded focus:ring-wowktm-primary"
              />
              <span className="ml-2 text-sm">Available</span>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Cost ($)</label>
              <input
                type="number"
                value={formData.delivery.overnightDelivery.cost}
                onChange={(e) => handleDeliveryChange('overnightDelivery', 'cost', parseFloat(e.target.value) || 0)}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Estimated Days</label>
              <input
                type="text"
                value={formData.delivery.overnightDelivery.estimatedDays}
                onChange={(e) => handleDeliveryChange('overnightDelivery', 'estimatedDays', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Free Shipping Threshold ($)</label>
          <input
            type="number"
            value={formData.delivery.freeShippingThreshold || ''}
            onChange={(e) => handleInputChange('delivery', {
              ...formData.delivery,
              freeShippingThreshold: e.target.value ? parseFloat(e.target.value) : undefined
            })}
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
            placeholder="Optional - e.g., 50.00"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Policies</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Returns Policy</label>
            <textarea
              value={formData.policies.returns}
              onChange={(e) => handleNestedInputChange('policies', 'returns', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Exchanges Policy</label>
            <textarea
              value={formData.policies.exchanges}
              onChange={(e) => handleNestedInputChange('policies', 'exchanges', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Customization Options</label>
            <textarea
              value={formData.policies.customization}
              onChange={(e) => handleNestedInputChange('policies', 'customization', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload New Product</h1>
            <p className="text-gray-600">Create a new product listing that will automatically generate its own product page</p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= stepNumber
                        ? 'bg-wowktm-primary text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div
                      className={`w-full h-1 mx-4 ${
                        step > stepNumber ? 'bg-wowktm-primary' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Basic Info</span>
              <span>Category</span>
              <span>Details</span>
              <span>Shipping</span>
            </div>
          </div>

          {/* Form Content */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-8">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              {step === 4 && renderStep4()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handlePrevious}
                  disabled={step === 1}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    step === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Previous
                </button>

                {step < 4 ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-wowktm-primary text-white rounded-lg font-medium hover:bg-wowktm-secondary transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`px-8 py-2 rounded-lg font-medium transition-colors ${
                      loading
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating Product...
                      </div>
                    ) : (
                      'Create Product & Page'
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SellerProductUploadPage;
