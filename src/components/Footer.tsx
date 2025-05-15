import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Image className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-poppins font-bold">
                <span className="text-primary-400">Lazy</span>
                <span className="text-white">Remover</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Effortlessly remove backgrounds from your images with our AI-powered tool. 
              Perfect for professionals, creators, and everyone in between.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/editor" className="text-gray-400 hover:text-white transition-colors">Background Remover</Link></li>
              <li><Link to="/#features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/#how-it-works" className="text-gray-400 hover:text-white transition-colors">How it Works</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>© {new Date().getFullYear()} LazyRemover. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;