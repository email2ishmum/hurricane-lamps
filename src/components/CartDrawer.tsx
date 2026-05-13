import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, subtotal, totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, setIsOpen]);

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-brand-black/40 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-cream shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-brand-black/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-brand-orange" size={24} />
                <h2 className="text-xl font-bold tracking-tighter uppercase">Shopping Bag ({totalItems})</h2>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-brand-black/5 rounded-full transition-colors"
                id="close-cart"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="text-xs uppercase tracking-[0.3em] font-bold">Your bag is empty</p>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-brand-orange text-[10px] font-bold underline underline-offset-4 uppercase tracking-widest"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.selectedColor}`} className="flex gap-4 group">
                    <div className="w-24 aspect-[4/5] rounded-2xl overflow-hidden bg-brand-black/5 flex-none relative">
                      <img 
                        src={item.mainImage} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-bold uppercase tracking-tight text-brand-black">{item.name}</h3>
                          <button 
                            onClick={() => removeItem(item.id, item.selectedColor)}
                            className="p-1 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                            title="Remove"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest opacity-40 mt-1">{item.selectedColor}</p>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-3 bg-brand-black/5 px-3 py-1 rounded-full">
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity - 1)}
                            className="p-1 hover:text-brand-orange transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity + 1)}
                            className="p-1 hover:text-brand-orange transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-brand-black">BDT {item.priceDiscount * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 md:p-8 bg-white border-t border-brand-black/10 space-y-6">
                {/* Shipping Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span>Free Delivery Progress</span>
                    <span className="text-brand-orange">
                      {totalItems >= 2 ? 'UNLOCKED' : `${2 - totalItems} items to free delivery`}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-brand-black/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-brand-orange"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((totalItems / 2) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs uppercase tracking-widest opacity-40">
                    <span>Subtotal</span>
                    <span>BDT {subtotal}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold tracking-tighter uppercase">
                    <span>Total</span>
                    <span>BDT {totalItems >= 2 ? subtotal : 'Calc at Checkout'}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="pill-btn w-full shadow-xl shadow-brand-orange/20 py-5 flex items-center justify-center gap-3 group"
                  id="checkout-button"
                >
                  Checkout
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
