import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems, setIsOpen: setCartOpen } = useCart();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-brand-cream/80 backdrop-blur-md border-b border-brand-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-2xl font-light tracking-tighter text-brand-black hover:text-brand-orange transition-colors">
            HURRICANE <span className="font-bold">LAMPS</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12">
            <Link to="/" className="text-sm font-medium uppercase tracking-widest hover:text-brand-orange transition-colors">Collection</Link>
            <Link to="/about" className="text-sm font-medium uppercase tracking-widest hover:text-brand-orange transition-colors">About</Link>
            <a href="https://wa.me/8801625456864" target="_blank" rel="noopener noreferrer" className="text-sm font-medium uppercase tracking-widest hover:text-brand-orange transition-colors">Contact</a>
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2 group bg-brand-black/5 hover:bg-brand-black hover:text-white rounded-full transition-all duration-300"
              aria-label="Toggle shopping cart"
            >
              <ShoppingBag size={18} className="group-hover:scale-110 transition-transform duration-300" />
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-brand-orange text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-brand-cream leading-none"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2 bg-brand-black/5 rounded-full"
              aria-label="Toggle shopping cart"
            >
              <ShoppingBag size={20} className="text-brand-black" />
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-brand-orange text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-brand-cream leading-none"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-black">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-brand-cream border-b border-brand-black/10 px-4 pt-2 pb-6 space-y-4"
          >
            <Link to="/" onClick={() => setIsOpen(false)} className="block text-lg font-medium uppercase tracking-widest">Collection</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block text-lg font-medium uppercase tracking-widest">About</Link>
            <a href="https://wa.me/8801625456864" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="block text-lg font-medium uppercase tracking-widest">Contact</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
