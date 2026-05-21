import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { HERO_IMAGE, ALL_DETAIL_IMAGES } from '../constants';
import { ArrowRight } from 'lucide-react';
import { setOGTags } from '../utils/seo';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set OG tags for home page
    setOGTags({
      title: 'Hurricane Lamps | Modern Illumination',
      description: 'Distinctive hurricane lamps for modern spaces. Handcrafted elegance delivered across Bangladesh.',
      image: 'https://i.ibb.co.com/8nJtYy5j/hero-1.webp',
      url: 'https://hurricane-lamps.com',
      type: 'website',
    });

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
      <div className="bg-brand-orange overflow-hidden whitespace-nowrap py-3 md:py-4 flex relative">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
          className="flex gap-8 md:gap-16"
        >
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-white flex-shrink-0">
              ✨ GET FREE DELIVERY IF YOU BUY 2 ITEMS • LIMITED STOCK
            </span>
          ))}
        </motion.div>
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
          className="flex gap-8 md:gap-16"
        >
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-white flex-shrink-0">
              ✨ GET FREE DELIVERY IF YOU BUY 2 ITEMS • LIMITED STOCK
            </span>
          ))}
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden bg-brand-black">
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
      <section className="pt-[40px] h-[230px] max-w-7xl mx-auto px-4 border-b border-brand-black/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <h2 className="text-4xl md:text-8xl font-bold tracking-tighter text-brand-black leading-[0.9] mb-6 uppercase">
            WHERE LIGHT <br /> MEETS <span className="text-brand-orange italic">EMOTION.</span>
          </h2>
          <p className="text-brand-charcoal/60 text-xs md:text-sm max-w-xs md:max-w-md font-medium tracking-[0.2em] uppercase leading-relaxed">
            Thoughtful designs that blends aesthetics with functions to brighten your space.
          </p>
        </motion.div>
      </section>

      {/* Product Grid */}
      <section id="collection" className="py-24 max-w-7xl mx-auto px-4">
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
      
      {/* Newsletter / CTA */}
      <section className="pt-[18px] pb-24 h-[464px] max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="pt-6 bg-brand-charcoal text-brand-cream p-12 md:p-24 rounded-[4rem] relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="w-[232px] mx-auto text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-none">JOIN THE <br /> UNDERGROUND</h2>
            <p className="text-brand-cream/60 max-w-md mx-auto mb-10 text-sm md:text-base leading-relaxed uppercase tracking-wider">
              Subscribe to get notified about new limited editions and exclusive drops.
            </p>
            <form className="max-w-md mx-auto flex flex-col md:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="flex-1 bg-brand-black/20 border border-brand-cream/20 px-6 py-4 rounded-full text-xs tracking-widest focus:border-brand-orange outline-none transition-colors"
                required
              />
              <button className="bg-brand-orange text-brand-black font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-brand-cream transition-colors text-xs whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
          <div className="absolute top-0 right-0 w-64 h-[252px] bg-brand-orange/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/5 blur-[100px] rounded-full" />
        </motion.div>
      </section>
    </div>
  );
}
