import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Image } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Image className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-poppins font-bold">
            <span className={scrolled ? 'text-primary-600' : 'text-white'}>Lazy</span>
            <span className={scrolled ? 'text-gray-800' : 'text-white'}>Remover</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`font-medium transition-colors ${
              scrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-200'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/#features" 
            className={`font-medium transition-colors ${
              scrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-200'
            }`}
          >
            Features
          </Link>
          <Link 
            to="/#how-it-works" 
            className={`font-medium transition-colors ${
              scrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-200'
            }`}
          >
            How It Works
          </Link>
          <Link 
            to="/editor" 
            className="btn btn-primary"
          >
            Try It Free
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className={scrolled ? 'text-gray-800' : 'text-white'} size={24} />
          ) : (
            <Menu className={scrolled ? 'text-gray-800' : 'text-white'} size={24} />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link to="/" className="py-2 font-medium text-gray-800 hover:text-primary-600">
              Home
            </Link>
            <Link to="/#features" className="py-2 font-medium text-gray-800 hover:text-primary-600">
              Features
            </Link>
            <Link to="/#how-it-works" className="py-2 font-medium text-gray-800 hover:text-primary-600">
              How It Works
            </Link>
            <Link to="/editor" className="btn btn-primary text-center">
              Try It Free
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;