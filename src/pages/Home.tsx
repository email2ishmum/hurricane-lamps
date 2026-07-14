import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { HERO_IMAGE, ALL_DETAIL_IMAGES } from '../constants';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch(err => console.error('Failed to fetch products:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-20">
      {/* Announcement Bar */}
      <div className="bg-brand-orange overflow-hidden whitespace-nowrap py-2 flex relative">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex gap-12"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <span key={i} className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">
              GET FREE DELIVERY IF YOU BUY 2 ITEMS • LIMITED STOCK AVAILABLE
            </span>
          ))}
        </motion.div>
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex gap-12"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <span key={i} className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">
              GET FREE DELIVERY IF YOU BUY 2 ITEMS • LIMITED STOCK AVAILABLE
            </span>
          ))}
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[42vh] min-h-[280px] md:h-[72vh] lg:h-[82vh] overflow-hidden bg-brand-black">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src={HERO_IMAGE || null} 
            alt="Hurricane Lamps Hero" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
            loading="eager"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent" />
      </section>

     {/* Slogan Section */}
<section className="pt-4 pb-4 md:pt-8 md:pb-8 max-w-7xl mx-auto px-4 border-b border-brand-black/5">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="max-w-4xl"
  >
    <h2 className="text-3xl md:text-8xl font-bold tracking-tighter text-brand-black leading-[0.9] mb-3 md:mb-6 uppercase">
      WHERE LIGHT <br /> MEETS <span className="text-brand-orange italic">EMOTION.</span>
    </h2>
    <p className="text-brand-charcoal/60 text-[10px] md:text-sm max-w-[260px] md:max-w-md font-medium tracking-[0.12em] md:tracking-[0.2em] uppercase leading-relaxed">
      Thoughtful designs that blends aesthetics with functions to brighten your space.
    </p>
  </motion.div>
</section>

      {/* Product Grid */}
      <section id="collection" className="pt-6 pb-12 md:py-24 max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-orange" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                  <Link to={`/product/${product.id}`} className="block rounded-card aspect-square relative shadow-sm hover:shadow-lux hover:-translate-y-1 overflow-hidden">
                    <img 
                      src={product.mainImage || null} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      loading={index < 4 ? "eager" : "lazy"}
                    />
                  </Link>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-widest leading-tight">{product.name}</h3>
                      <p className="text-brand-orange font-bold text-xs md:text-sm">BDT {product.priceDiscount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] md:text-[10px] text-brand-charcoal/40 line-through font-bold">BDT {product.priceOriginal}</p>
                    </div>
                  </div>
                  <Link 
                    to={`/product/${product.id}`}
                    className={`block w-full pt-[12px] h-[38px] ${product.stock === 0 ? 'bg-brand-charcoal' : 'bg-brand-black'} text-brand-cream text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-center rounded-full hover:bg-brand-orange transition-colors`}
                  >
                    {product.stock === 0 ? 'PRE-ORDER' : 'Order Now'}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Scrollable Gallery */}
      <section className="pt-[36px] pb-24 h-[680px] bg-brand-black overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 mb-16 overflow-visible">
          <h2 className="text-brand-cream text-xs uppercase tracking-[0.4em] font-semibold mb-4">Gallery</h2>
          <p className="text-brand-cream text-4xl md:text-5xl font-bold tracking-tighter">THE FINE DETAILS</p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-12 px-4 no-scrollbar scroll-smooth">
          {ALL_DETAIL_IMAGES.map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="flex-none w-[300px] h-[400px] rounded-[2rem] overflow-hidden bg-brand-charcoal/20"
            >
              <img 
                src={img || null} 
                alt={`Detail ${idx}`} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
        
        {/* Custom scroll info */}
        <div className="max-w-7xl mx-auto px-4 flex justify-end">
          <div className="flex items-center gap-4 text-brand-cream/40 text-xs uppercase tracking-widest">
            <span>Scroll horizontally</span>
            <div className="w-12 h-[1px] bg-brand-cream/20" />
          </div>
        </div>
      </section>
      
      
    </div>
  );
}
