import { Instagram, Facebook, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-cream py-16 px-4 h-[696px]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-xl font-bold tracking-tighter mb-6 underline decoration-brand-orange underline-offset-8">HURRICANE LAMPS</h3>
          <p className="text-brand-cream/60 text-sm leading-relaxed max-w-xs">
            Crafting light into art. Our hurricane lamps are designed for those who appreciate the intersection of minimalism and bold expression.
          </p>
        </div>
        
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6 opacity-50">Shop</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-brand-orange transition-colors">New Arrivals</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Best Sellers</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Exclusives</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6 opacity-50">Support</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="https://wa.me/8801625456864" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">Shipping Policy</a></li>
            <li><a href="/return-policy" className="hover:text-brand-orange transition-colors">Returns & Exchanges</a></li>
            <li><a href="/about" className="hover:text-brand-orange transition-colors">About Us</a></li>
            <li><a href="https://wa.me/8801625456864" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-brand-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs opacity-40">© 2026 HURRICANE LAMPS. All over Bangladesh delivery.</p>
        <div className="flex gap-6 items-center">
          <a href="https://www.instagram.com/hurricane_lamps/" target="_blank" rel="noopener noreferrer" className="text-brand-cream/40 hover:text-brand-orange transition-colors">
            <Instagram size={20} />
          </a>
          <a href="https://www.facebook.com/HurricaneLampsStore" target="_blank" rel="noopener noreferrer" className="text-brand-cream/40 hover:text-brand-orange transition-colors">
            <Facebook size={20} />
          </a>
          <a href="https://wa.me/8801625456864" target="_blank" rel="noopener noreferrer" className="text-brand-cream/40 hover:text-brand-orange transition-colors">
            <MessageCircle size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
