import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../constants';
import { ShoppingBag, ChevronRight, ArrowLeft, Info, CheckCircle2 } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: any) => p.id === id || String(p.id) === id);
        if (found) {
          setProduct(found);
          setActiveImage(found.mainImage);
          setSelectedColor(found.colors[0]);
        }
      })
      .catch(err => console.error('Error fetching product:', err))
      .finally(() => setLoading(false));
    
    window.scrollTo(0, 0);
  }, [id]);

  const handleOrderNow = () => {
    if (product) {
      addItem(product, selectedColor);
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-orange" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Product not found</h2>
          <button onClick={() => navigate('/')} className="text-brand-orange uppercase tracking-widest font-bold flex items-center gap-2 mx-auto">
            <ArrowLeft size={16} /> Back to Collection
          </button>
        </div>
      </div>
    );
  }

  // Gallery includes main image + details
  const allImages = [product.mainImage, ...product.detailImages];

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Navigation Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] mb-12 opacity-50">
        <button onClick={() => navigate('/')} className="hover:text-brand-orange transition-colors">Collection</button>
        <ChevronRight size={12} />
        <span className="text-brand-black">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Gallery Section */}
        <div className="space-y-6">
          <motion.div 
            layoutId={`product-image-${product.id}`}
            className="aspect-[4/5] rounded-card shadow-xl group relative"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={activeImage || null}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="eager"
              />
            </AnimatePresence>
          </motion.div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`flex-none w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 relative ${activeImage === img ? 'border-brand-orange shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img 
                  src={img || null} 
                  alt={`${product.name} ${idx}`} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer" 
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:sticky lg:top-32 space-y-10">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase text-brand-black mb-2">{product.name}</h1>
                <p className="text-brand-orange font-medium text-sm tracking-wide">Available in {product.colors.join(', ')}</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-brand-orange block">BDT {product.priceDiscount}</span>
                <p className="text-[15px] text-black/30 line-through font-bold">BDT {product.priceOriginal}</p>
              </div>
            </div>
            <p className="text-brand-charcoal leading-relaxed text-sm opacity-90">
              {product.description}
            </p>
          </div>

          {/* Color Selection */}
          <div className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Choose Finish</h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${selectedColor === color ? 'border-brand-orange ring-2 ring-offset-2 ring-brand-orange' : 'border-transparent'}`}
                  title={color}
                >
                   <div className={`w-full h-full rounded-full ${
                     color === 'White' ? 'bg-white border border-gray-100' : 
                     color === 'Black' ? 'bg-black' : 
                     color === 'Golden' ? 'bg-[#D4AF37]' : 
                     color === 'Silver' ? 'bg-[#C0C0C0]' : 
                     color === 'Rose Gold' ? 'bg-[#B76E79]' : 
                     color === 'Sea Green' ? 'bg-[#2E8B57]' : 
                     color === 'Orange' ? 'bg-brand-orange' : 'bg-gray-400'
                   }`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Specs / Info */}
          <div className="grid grid-cols-2 gap-8 py-8 border-y border-brand-black/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={16} className="text-brand-orange" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal">Available</span>
              </div>
              <p className={`text-base font-bold uppercase tracking-widest ${product.stock < 10 ? 'text-red-500 animate-pulse' : 'opacity-60'}`}>
                {product.stock < 10 ? `Only ${product.stock} left in stock!` : `${product.stock} units in stock`}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Info size={16} className="text-brand-charcoal" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal">Heritage</span>
              </div>
              <p className="text-[10px] opacity-60 uppercase tracking-widest">Hand-crafted series</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => product && addItem(product, selectedColor)}
              className="flex-1 py-5 bg-brand-cream border-2 border-brand-black text-brand-black text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-brand-black hover:text-brand-cream transition-all duration-300 flex items-center justify-center gap-3"
            >
              {product.stock === 0 ? 'PRE-ORDER' : 'Add to Bag'}
              <ShoppingBag size={16} />
            </button>
            <button 
              onClick={handleOrderNow}
              className="flex-1 pill-btn shadow-xl shadow-brand-orange/20 flex items-center justify-center gap-3 group"
            >
              {product.stock === 0 ? 'PRE-ORDER NOW' : 'Order Now'}
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="pt-8">
            <p className="text-[10px] text-center opacity-30 uppercase tracking-[0.2em] leading-relaxed">
              Global shipping available. <br /> Each lamp is hand-tested and packaged for safe delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
