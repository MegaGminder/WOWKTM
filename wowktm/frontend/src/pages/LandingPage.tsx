import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const categories = [
    { name: 'Handmade Goods', image: 'https://source.unsplash.com/300x200/?handmade', fallback: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80', path: '/products?category=handmade' },
    { name: 'Vintage Finds', image: 'https://source.unsplash.com/300x200/?vintage', fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80', path: '/products?category=vintage' },
    { name: 'Craft Supplies', image: 'https://demo-source.imgix.net/sneakers.jpg', fallback: 'https://demo-source.imgix.net/sneakers.jpg', path: '/products?category=craft' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with New Image Background */}
      <div
        className="relative bg-cover bg-c h-96 flex items-center justify-center text-center text-white"
        style={{ backgroundImage: 'url(/images/hero-banner.jpg)' }} // Replace with the path to your saved image
      >
        <div className="absolute inset-0 bg-black opacity-45"></div> {/* Overlay for text readability */}
        <div className="relative z-10 container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-extrabold drop-shadow-lg"
          >
            Discover Unique Treasures at WoWKTM
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg mt-4"
          >
            Shop handmade, vintage, and one-of-a-kind items from creators worldwide.
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Link
              to="/products"
              className="mt-6 inline-block bg-white text-wowktm-primary px-6 py-3 rounded-xl font-semibold shadow hover:bg-wowktm-secondary hover:text-white transition"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </div>

{/* Etsy-like Promo Section with Smooth 3D Hover Effects */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {/* Left Card - Text with Button */}
          <motion.div
            whileHover={{ scale: 1.05, rotateX: 5 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }} // Smooth spring animation
            className="flex-1 bg-yellow-50 p-6 rounded-lg shadow-md hover:animate-card-hover"
          >
            <h2 className="text-3xl font-bold text-black">Handicraft Highlights</h2>
            <p className="text-lg text-gray-700 mt-2">Shop unique self-made products and affordable handicrafts</p>
            <Link
              to="/products?category=handicrafts"
              className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition"
            >
              Shop Now
            </Link>
          </motion.div>

          {/* Middle Card - Image */}
          <motion.div
            whileHover={{ scale: 1.05, rotateX: 5 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }} // Smooth spring animation
            className="flex-1 bg-gray-100 p-4 rounded-lg shadow-md overflow-hidden hover:animate-card-hover"
          >
            <img
              src="https://source.unsplash.com/random/400x200?handicraft" // Placeholder for handicraft image
              alt="Handicrafts"
              className="w-full h-auto object-cover rounded-lg"
            />
          </motion.div>

          {/* Right Card - Small Product Card */}
          <motion.div
            whileHover={{ scale: 1.05, rotateX: 5 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }} // Smooth spring animation
            className="flex-1 bg-gray-100 p-4 rounded-lg shadow-md hover:animate-card-hover"
          >
            <img
              src="https://source.unsplash.com/random/300x200?self-made-product" // Placeholder for product image
              alt="Personalized Crafts"
              className="w-full h-auto object-cover rounded-lg mb-2"
            />
            <h3 className="text-xl font-semibold text-black">Personalized Crafts Under $30</h3>
            <Link
              to="/products?category=self-made"
              className="mt-2 inline-block text-blue-600 hover:underline"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Featured Categories with Smooth 3D Hover Effects */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-extrabold text-wowktm-primary mb-8 text-center">
          Explore Our Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05, rotateX: 5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:animate-card-hover"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = category.fallback || 'https://via.placeholder.com/300x200?text=No+Image';
                }}
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-wowktm-primary">
                  {category.name}
                </h3>
                <Link
                  to={category.path}
                  className="mt-2 inline-block text-wowktm-secondary hover:underline"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-wowktm-secondary text-white py-6 text-center">
        <p className="text-lg font-semibold">
          Free Shipping on Orders Over $50! Shop Today.
        </p>
        <Link
          to="/products"
          className="mt-2 inline-block text-white underline hover:text-yellow-300"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;



