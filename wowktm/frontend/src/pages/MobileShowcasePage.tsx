import React from 'react';
import ResponsiveProductGrid from '../components/ResponsiveProductGrid';
import ProductImageGallery from '../components/ProductImageGallery';
import ResponsiveForm from '../components/ResponsiveForm';

const MobileShowcasePage: React.FC = () => {
  // Sample product data
  const sampleProducts = [
    {
      id: '1',
      name: 'Traditional Nepali Dhaka Topi - Handwoven Cotton',
      price: 1500,
      originalPrice: 2000,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      rating: 4.8,
      reviews: 124,
      badge: 'Bestseller',
      discount: 25,
      category: 'Traditional Wear',
      seller: 'Nepali Crafts Co.',
    },
    {
      id: '2',
      name: 'Handmade Lokta Paper Notebook - Eco-friendly',
      price: 800,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
      rating: 4.6,
      reviews: 89,
      category: 'Stationery',
      seller: 'Mountain Paper Works',
    },
    {
      id: '3',
      name: 'Tibetan Singing Bowl - Bronze Meditation Bowl',
      price: 3500,
      originalPrice: 4500,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      rating: 4.9,
      reviews: 67,
      badge: 'Premium',
      discount: 22,
      category: 'Spiritual Items',
      seller: 'Himalayan Sounds',
    },
    {
      id: '4',
      name: 'Yak Wool Shawl - Pure Himalayan Warmth',
      price: 5200,
      image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400',
      rating: 4.7,
      reviews: 156,
      category: 'Clothing',
      seller: 'Highland Textiles',
    },
    {
      id: '5',
      name: 'Nepalese Khukuri - Traditional Knife',
      price: 2800,
      originalPrice: 3200,
      image: 'https://images.unsplash.com/photo-1505884065216-2b7e7b00b2dc?w=400',
      rating: 4.5,
      reviews: 93,
      discount: 13,
      category: 'Traditional Tools',
      seller: 'Gurkha Handicrafts',
    },
    {
      id: '6',
      name: 'Hand-carved Wooden Buddha Statue',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      rating: 4.8,
      reviews: 78,
      badge: 'Artisan Made',
      category: 'Spiritual Items',
      seller: 'Sacred Arts Nepal',
    },
  ];

  // Sample product images for gallery
  const sampleImages = [
    {
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      alt: 'Traditional Dhaka Topi - Front View',
      thumb: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150',
    },
    {
      src: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800',
      alt: 'Traditional Dhaka Topi - Side View',
      thumb: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=150',
    },
    {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      alt: 'Traditional Dhaka Topi - Pattern Detail',
      thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150',
    },
    {
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
      alt: 'Traditional Dhaka Topi - Craftsmanship',
      thumb: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150',
    },
  ];

  // Sample form fields
  const contactFormFields = [
    {
      id: 'name',
      type: 'text' as const,
      label: 'Full Name',
      placeholder: 'Enter your full name',
      required: true,
    },
    {
      id: 'email',
      type: 'email' as const,
      label: 'Email Address',
      placeholder: 'your.email@example.com',
      required: true,
    },
    {
      id: 'phone',
      type: 'tel' as const,
      label: 'Phone Number',
      placeholder: '+977-9876543210',
      required: true,
    },
    {
      id: 'category',
      type: 'select' as const,
      label: 'Product Category',
      placeholder: 'Select a category',
      required: true,
      options: [
        { value: 'traditional-wear', label: 'Traditional Wear' },
        { value: 'handicrafts', label: 'Handicrafts' },
        { value: 'spiritual-items', label: 'Spiritual Items' },
        { value: 'textiles', label: 'Textiles' },
        { value: 'jewelry', label: 'Jewelry' },
      ],
    },
    {
      id: 'message',
      type: 'textarea' as const,
      label: 'Message',
      placeholder: 'Tell us about your requirements...',
      required: true,
    },
    {
      id: 'images',
      type: 'file' as const,
      label: 'Product Images',
      placeholder: 'Upload product images',
      accept: 'image/*',
      multiple: true,
    },
  ];

  const handleFormSubmit = (data: Record<string, any>) => {
    console.log('Form submitted:', data);
    alert('Form submitted successfully! Check the console for data.');
  };

  return (
    <div className="mobile-showcase-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-wowktm-primary to-wowktm-secondary text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Mobile-First Experience
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Explore our optimized mobile components with swiper carousels, 
            responsive grids, and touch-friendly forms
          </p>
        </div>
      </section>

      {/* Product Image Gallery Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
            Touch-Enabled Image Gallery
          </h2>
          <div className="max-w-lg mx-auto">
            <ProductImageGallery 
              images={sampleImages}
              showThumbs={true}
              showNavigation={true}
              showPagination={true}
            />
          </div>
          <p className="text-center text-gray-600 mt-6">
            Swipe on mobile, click arrows on desktop, or use thumbnail navigation
          </p>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ResponsiveProductGrid
            products={sampleProducts}
            title="Featured Products"
            showAsList={true}
            enableMobileSwiper={true}
            columns={{ mobile: 2, tablet: 3, desktop: 4 }}
          />
        </div>
      </section>

      {/* Mobile Swiper Only Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
            Mobile Swiper Carousel
          </h2>
          <p className="text-center text-gray-600 mb-8">
            This section shows a swiper on mobile and regular grid on desktop
          </p>
          <ResponsiveProductGrid
            products={sampleProducts.slice(0, 4)}
            enableMobileSwiper={true}
            columns={{ mobile: 1, tablet: 2, desktop: 4 }}
          />
        </div>
      </section>

      {/* Responsive Form Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <ResponsiveForm
            fields={contactFormFields}
            title="Contact Form with Mobile Optimization"
            submitText="Send Message"
            onSubmit={handleFormSubmit}
            layout="two-column"
            showProgress={false}
          />
        </div>
      </section>

      {/* Multi-Step Form Example */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <ResponsiveForm
            fields={contactFormFields}
            title="Multi-Step Form (Mobile)"
            submitText="Complete Registration"
            onSubmit={handleFormSubmit}
            layout="single"
            showProgress={true}
          />
          <p className="text-center text-gray-600 mt-6">
            On mobile, this form breaks into steps for better UX
          </p>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-12 px-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Mobile-First Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-wowktm-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
              <p className="text-gray-300">
                Automatically adapts to screen size with different layouts for mobile and desktop
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-wowktm-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Touch Optimized</h3>
              <p className="text-gray-300">
                Large touch targets, swipe gestures, and mobile-specific interactions
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-wowktm-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Performance</h3>
              <p className="text-gray-300">
                Optimized loading, lazy images, and smooth animations for fast mobile experience
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MobileShowcasePage;
