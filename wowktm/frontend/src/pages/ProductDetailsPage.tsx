import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/ToastProvider';
import ProductService from '../services/ProductService';
import OptimizedImage from '../components/OptimizedImage';
import { useScrollToTop } from '../hooks/useScrollToTop';

interface DeliveryOption {
  id: string;
  name: string;
  cost: number;
  estimatedDays: string;
  available: boolean;
  description: string;
}

const ProductDetailsPage: React.FC = () => {
  useScrollToTop();
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [product, setProduct] = useState<any>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<string>('standard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        window.scrollTo(0, 0);
        if (id) {
          const result = ProductService.getProduct(id);
          setProduct(result);
        }
      } catch (error) {
        console.error('Error loading product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-wowktm-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-wowktm-primary text-white rounded-lg hover:bg-wowktm-secondary transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  const deliveryOptions: DeliveryOption[] = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      cost: product.delivery?.standardDelivery?.cost || 5.99,
      estimatedDays: product.delivery?.standardDelivery?.estimatedDays || '5-7 business days',
      available: product.delivery?.standardDelivery?.available || true,
      description: 'Regular shipping with tracking'
    },
    {
      id: 'express',
      name: 'Express Delivery',
      cost: product.delivery?.expressDelivery?.cost || 12.99,
      estimatedDays: product.delivery?.expressDelivery?.estimatedDays || '2-3 business days',
      available: product.delivery?.expressDelivery?.available || true,
      description: 'Faster delivery with priority handling'
    },
    {
      id: 'overnight',
      name: 'Overnight Delivery',
      cost: product.delivery?.overnightDelivery?.cost || 25.99,
      estimatedDays: product.delivery?.overnightDelivery?.estimatedDays || '1 business day',
      available: product.delivery?.overnightDelivery?.available || false,
      description: 'Next business day delivery'
    }
  ];

  const selectedDelivery = deliveryOptions.find(option => option.id === selectedDeliveryOption);
  const totalPrice = product.price * quantity + (selectedDelivery?.cost || 0);
  const isFreeShipping = product.delivery?.freeShippingThreshold && totalPrice >= product.delivery.freeShippingThreshold;

  const handleAddToCart = () => {
    const deliveryCost = isFreeShipping ? 0 : (selectedDelivery?.cost || 0);
    
    addItem({
      id: parseInt(product.id.replace(/[^0-9]/g, '')) || Math.floor(Math.random() * 10000),
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.imageUrl,
      seller: product.seller.name,
      shipping: deliveryCost === 0 ? "FREE shipping" : `$${deliveryCost.toFixed(2)} shipping`,
      inStock: product.inStock,
      category: product.category,
      description: product.description,
      quantity: quantity
    });
    
    showToast(`${product.name} added to cart with ${selectedDelivery?.name}!`, 'success');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li><Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li><Link to={`/products?category=${product.category.toLowerCase()}`} className="text-gray-500 hover:text-gray-700">{product.category}</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              <OptimizedImage
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
                width={600}
                height={600}
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index ? 'border-wowktm-primary' : 'border-gray-200'
                  }`}
                >
                  <OptimizedImage
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={150}
                    height={150}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                  <span className="ml-2 text-sm text-gray-600">({product.reviewCount} reviews)</span>
                </div>
                {product.inStock ? (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    In Stock ({product.stockQuantity} available)
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center space-x-3">
                <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                    <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Seller Information */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Seller Information</h3>
              <div className="flex items-center space-x-4">
                {product.seller.avatar && (
                  <img
                    src={product.seller.avatar}
                    alt={product.seller.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900">{product.seller.name}</p>
                  <p className="text-sm text-gray-600">{product.seller.location}</p>
                  <div className="flex items-center mt-1">
                    {renderStars(product.seller.rating)}
                    <span className="ml-2 text-sm text-gray-600">
                      ({product.seller.totalSales || 0} sales)
                    </span>
                  </div>
                </div>
              </div>
              {product.seller.bio && (
                <p className="text-sm text-gray-600 mt-3">{product.seller.bio}</p>
              )}
            </div>

            {/* Delivery Options */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Options</h3>
              <div className="space-y-3">
                {deliveryOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedDeliveryOption === option.id
                        ? 'border-wowktm-primary bg-wowktm-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${!option.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="delivery"
                        value={option.id}
                        checked={selectedDeliveryOption === option.id}
                        onChange={(e) => setSelectedDeliveryOption(e.target.value)}
                        disabled={!option.available}
                        className="w-4 h-4 text-wowktm-primary border-gray-300 focus:ring-wowktm-primary"
                      />
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{option.name}</p>
                        <p className="text-sm text-gray-600">{option.description}</p>
                        <p className="text-sm text-gray-500">{option.estimatedDays}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {isFreeShipping && option.cost > 0 ? (
                        <div>
                          <span className="text-sm text-gray-500 line-through">${option.cost.toFixed(2)}</span>
                          <p className="text-sm font-medium text-green-600">FREE</p>
                        </div>
                      ) : (
                        <span className="font-medium text-gray-900">
                          {option.cost === 0 ? 'FREE' : `$${option.cost.toFixed(2)}`}
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
              
              {product.delivery?.freeShippingThreshold && !isFreeShipping && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 Add ${(product.delivery.freeShippingThreshold - totalPrice + (selectedDelivery?.cost || 0)).toFixed(2)} more to get FREE shipping!
                  </p>
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-16 text-center text-lg font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center text-sm">
                  <span>Product ({quantity}x)</span>
                  <span>${(product.price * quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Shipping</span>
                  <span>
                    {isFreeShipping ? (
                      <span className="text-green-600 font-medium">FREE</span>
                    ) : (
                      `$${(selectedDelivery?.cost || 0).toFixed(2)}`
                    )}
                  </span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Total</span>
                  <span>${(isFreeShipping ? product.price * quantity : totalPrice).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                  product.inStock
                    ? 'bg-wowktm-primary text-white hover:bg-wowktm-secondary transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['description', 'materials', 'shipping', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-wowktm-primary text-wowktm-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
                
                {product.tags && product.tags.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'materials' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Materials & Specifications</h3>
                {product.materials && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Materials:</h4>
                    <ul className="list-disc list-inside text-gray-700">
                      {product.materials.map((material: string, index: number) => (
                        <li key={index}>{material}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.dimensions && (
                    <div>
                      <h4 className="font-medium">Dimensions:</h4>
                      <p className="text-gray-700">{product.dimensions}</p>
                    </div>
                  )}
                  {product.weight && (
                    <div>
                      <h4 className="font-medium">Weight:</h4>
                      <p className="text-gray-700">{product.weight}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Shipping & Returns</h3>
                {product.policies && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Returns:</h4>
                      <p className="text-gray-700">{product.policies.returns}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Exchanges:</h4>
                      <p className="text-gray-700">{product.policies.exchanges}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Customization:</h4>
                      <p className="text-gray-700">{product.policies.customization}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                <div className="text-center py-8 text-gray-500">
                  <p>Reviews feature coming soon...</p>
                  <p className="text-sm mt-2">
                    This product has {product.reviewCount} reviews with an average rating of {product.rating}/5 stars.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
