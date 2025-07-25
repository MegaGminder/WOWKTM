import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/ToastProvider';
import { getProductById } from '../api/productApi';
import { Product } from '../types/product';
import { DeliveryOptions } from '../components/DeliveryBadge';

interface ProductDetails {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string; // Add image property
  images: string[];
  seller: {
    name: string;
    avatar: string;
    rating: number;
    totalSales: number;
    responseTime: string;
    joinedDate: string;
    location: string;
    bio: string;
  };
  rating: number;
  reviews: number;
  badge?: string;
  inStock: boolean;
  category: string;
  description: string;
  delivery?: {
    sameDayPickup: boolean;
    fastDelivery: boolean;
    estimatedDelivery: string;
    pickupLocation?: string;
  }; // Add delivery property
  longDescription: string;
  materials: string[];
  dimensions: string;
  weight: string;
  shipping: {
    cost: number;
    time: string;
    from: string;
  };
  policies: {
    returns: string;
    exchanges: string;
    customization: string;
  };
  relatedProducts: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
  }>;
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Mock product data - in real app, this would come from API
  useEffect(() => {
    const loadProduct = async () => {
      // Scroll to top when component mounts
      window.scrollTo(0, 0);
      
      try {
        const productId = parseInt(id || '1');
        const basicProduct = await getProductById(productId);
        
        if (basicProduct) {
          // Create detailed product data based on the basic product
          const mockProduct: ProductDetails = {
            id: basicProduct.id,
            name: basicProduct.name,
            price: basicProduct.price,
            originalPrice: basicProduct.originalPrice,
            images: [
              basicProduct.image,
              basicProduct.image.replace('w=400&h=300', 'w=600&h=600'),
              basicProduct.image.replace('400', '500').replace('300', '400'),
              basicProduct.image.replace('400', '600').replace('300', '500')
            ],
            seller: {
              name: basicProduct.category === 'handmade' ? "HandmadeWithLove" : 
                     basicProduct.category === 'vintage' ? "VintageFinds" :
                     basicProduct.category === 'craft' ? "ArtisanSupplies" : "CreativeStudio",
              avatar: "https://images.unsplash.com/photo-1494790108755-2616c64e6a83?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80",
              rating: basicProduct.rating || 4.8,
              totalSales: Math.floor(Math.random() * 2000) + 500,
              responseTime: "Usually responds within 2 hours",
              joinedDate: "2019",
              location: "Portland, Oregon",
              bio: `Specialized in ${basicProduct.category} items. Each piece is crafted with love and attention to detail.`
            },
            rating: basicProduct.rating || 4.8,
            reviews: basicProduct.reviews || 127,
            badge: basicProduct.discount ? "Sale" : "Bestseller",
            inStock: basicProduct.inStock !== false,
            category: basicProduct.category || "General",
            description: basicProduct.description,
            image: basicProduct.image, // Add image property for DeliveryOptions
            delivery: basicProduct.delivery ? {
              sameDayPickup: basicProduct.delivery.sameDayPickup || false,
              fastDelivery: basicProduct.delivery.fastDelivery || false,
              estimatedDelivery: basicProduct.delivery.estimatedDelivery || "3-5 business days",
              pickupLocation: basicProduct.delivery.pickupLocation
            } : undefined, // Add delivery property with proper typing
            longDescription: `${basicProduct.description}\n\nThis ${basicProduct.category || 'beautiful'} item is carefully crafted with attention to detail. Each piece is unique and made with high-quality materials. Perfect for gifting or treating yourself to something special.\n\nMade with premium materials and designed to last, this item represents excellent value and quality craftsmanship.`,
            materials: basicProduct.category === 'handmade' ? ["Natural Materials", "Handcrafted", "Eco-friendly"] :
                      basicProduct.category === 'vintage' ? ["Authentic Materials", "Vintage Quality", "Restored"] :
                      basicProduct.category === 'craft' ? ["Premium Materials", "Professional Grade", "Durable"] :
                      ["Quality Materials", "Carefully Selected", "Long-lasting"],
            dimensions: "Standard size - see description for details",
            weight: `${Math.floor(Math.random() * 500) + 50}g`,
            shipping: {
              cost: 0,
              time: "3-5 business days",
              from: "United States"
            },
            policies: {
              returns: "30-day return policy",
              exchanges: "Free exchanges within 30 days",
              customization: "Contact seller for customization options"
            },
            relatedProducts: [
              { id: basicProduct.id + 10, name: `Related ${basicProduct.category} Item 1`, price: basicProduct.price * 0.8, image: basicProduct.image },
              { id: basicProduct.id + 11, name: `Related ${basicProduct.category} Item 2`, price: basicProduct.price * 1.2, image: basicProduct.image },
              { id: basicProduct.id + 12, name: `Related ${basicProduct.category} Item 3`, price: basicProduct.price * 0.9, image: basicProduct.image },
              { id: basicProduct.id + 13, name: `Related ${basicProduct.category} Item 4`, price: basicProduct.price * 1.1, image: basicProduct.image }
            ]
          };
          setProduct(mockProduct);
        } else {
          // Fallback to default product if not found
          console.log('Product not found, using default');
          const defaultProduct: ProductDetails = {
            id: parseInt(id || '1'),
            name: "Product Not Found",
            price: 0,
            image: "https://via.placeholder.com/600x600?text=Product+Not+Found", // Add image property
            images: ["https://via.placeholder.com/600x600?text=Product+Not+Found"],
            seller: {
              name: "Unknown",
              avatar: "https://via.placeholder.com/80x80",
              rating: 0,
              totalSales: 0,
              responseTime: "Unknown",
              joinedDate: "Unknown",
              location: "Unknown",
              bio: "Product information not available"
            },
            rating: 0,
            reviews: 0,
            inStock: false,
            category: "Unknown",
            description: "Product not found",
            longDescription: "This product could not be found.",
            materials: ["Unknown"],
            dimensions: "Unknown",
            weight: "Unknown",
            shipping: { cost: 0, time: "Unknown", from: "Unknown" },
            policies: { returns: "N/A", exchanges: "N/A", customization: "N/A" },
            relatedProducts: []
          };
          setProduct(defaultProduct);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      seller: product.seller.name,
      shipping: product.shipping.cost === 0 ? "FREE shipping" : `$${product.shipping.cost} shipping`,
      inStock: product.inStock,
      category: product.category,
      description: product.description,
      quantity
    });
    showToast(`${product.name} added to cart!`, 'success');
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-wowktm-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-wowktm-primary">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-wowktm-primary">Products</Link>
            <span>/</span>
            <Link to={`/products?category=${product.category.toLowerCase()}`} className="hover:text-wowktm-primary">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900 truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div 
              className="relative overflow-hidden rounded-2xl shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              {product.badge && (
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${
                  product.badge === 'Bestseller' ? 'bg-orange-500 text-white' :
                  product.badge === 'Sale' ? 'bg-red-500 text-white' :
                  product.badge === 'New' ? 'bg-green-500 text-white' :
                  'bg-blue-500 text-white'
                }`}>
                  {product.badge}
                </div>
              )}
            </motion.div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index 
                      ? 'border-wowktm-primary shadow-lg' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 font-medium text-gray-900">{product.rating}</span>
                  <span className="text-gray-500">({product.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
              {product.originalPrice && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-lg text-sm font-semibold">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-gray-900 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 bg-wowktm-primary text-white py-3 px-6 rounded-xl font-semibold hover:bg-wowktm-secondary transition-colors shadow-lg"
                >
                  Add to Cart
                </motion.button>
                <button className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:border-gray-400 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="mb-6">
              <DeliveryOptions product={product} />
            </div>

            {/* Traditional Shipping Info (fallback) */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-green-800">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z"/>
                </svg>
                <span className="font-semibold">
                  {product.shipping.cost === 0 ? 'FREE shipping' : `$${product.shipping.cost} shipping`}
                </span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                Estimated delivery: {product.shipping.time} from {product.shipping.from}
              </p>
            </div>

            {/* Seller Info */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={product.seller.avatar}
                  alt={product.seller.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{product.seller.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>⭐ {product.seller.rating}</span>
                    <span>•</span>
                    <span>{product.seller.totalSales.toLocaleString()} sales</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{product.seller.responseTime}</p>
              <p className="text-sm text-gray-600">Selling since {product.seller.joinedDate} from {product.seller.location}</p>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'description', label: 'Description' },
                { id: 'details', label: 'Details' },
                { id: 'shipping', label: 'Shipping & Policies' },
                { id: 'reviews', label: 'Reviews' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-wowktm-primary text-wowktm-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="prose max-w-none"
                >
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {showFullDescription 
                      ? product.longDescription 
                      : product.longDescription.substring(0, 300) + '...'
                    }
                  </div>
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="mt-4 text-wowktm-primary hover:underline font-medium"
                  >
                    {showFullDescription ? 'Show Less' : 'Read More'}
                  </button>
                </motion.div>
              )}

              {activeTab === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Materials</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {product.materials.map((material, index) => (
                        <li key={index}>{material}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Dimensions</h3>
                    <p className="text-gray-700">{product.dimensions}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Weight</h3>
                    <p className="text-gray-700">{product.weight}</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Shipping</h3>
                    <p className="text-gray-700">
                      {product.shipping.cost === 0 ? 'FREE shipping' : `$${product.shipping.cost} shipping`} - {product.shipping.time}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Returns & Exchanges</h3>
                    <p className="text-gray-700 mb-2">{product.policies.returns}</p>
                    <p className="text-gray-700">{product.policies.exchanges}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Customization</h3>
                    <p className="text-gray-700">{product.policies.customization}</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="text-center py-12">
                    <p className="text-gray-500">Reviews feature coming soon!</p>
                    <p className="text-sm text-gray-400 mt-2">
                      This product has {product.reviews} reviews with an average rating of {product.rating} stars.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                to={`/product/${relatedProduct.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg font-bold text-gray-900">${relatedProduct.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
