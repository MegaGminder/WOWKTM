import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-wowktm-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold">
          WoWKTM
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/products" className="hover:text-wowktm-secondary">
            Products
          </Link>
          <Link to="/login" className="hover:text-wowktm-secondary">
            Login
          </Link>
          <Link to="/signup" className="hover:text-wowktm-secondary">
            Signup
          </Link>
        </div>
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          className="md:hidden bg-wowktm-primary"
        >
          <div className="flex flex-col space-y-4 py-4 px-4">
            <Link to="/products" className="hover:text-wowktm-secondary">
              Products
            </Link>
            <Link to="/login" className="hover:text-wowktm-secondary">
              Login
            </Link>
            <Link to="/signup" className="hover:text-wowktm-secondary">
              Signup
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;