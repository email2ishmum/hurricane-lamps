import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { setOGTags } from '../utils/seo';

export default function About() {
  const navigate = useNavigate();

  useEffect(() => {
    setOGTags({
      title: 'About Us | Hurricane Lamps',
      description: 'Learn about Hurricane Lamps - where light meets emotion. Handcrafted hurricane lamps designed for modern spaces.',
      image: 'https://i.ibb.co.com/8nJtYy5j/hero-1.webp',
      url: 'https://hurricane-lamps.com/about',
      type: 'website',
    });
  }, []);

  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-4">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-orange mb-12 hover:gap-4 transition-all"
      >
        <ArrowLeft size={16} /> Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-16 rounded-[3rem] shadow-xl border border-brand-black/5"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-6 text-brand-black">About Us</h1>
        
        <div className="prose prose-sm md:prose-base max-w-none space-y-8 text-brand-charcoal">
          <section>
            <p className="text-lg md:text-xl font-medium leading-relaxed italic border-l-4 border-brand-orange pl-6">
              At Hurricane Lamps, we believe lighting is more than brightness — it’s atmosphere, focus, and identity.
            </p>
          </section>

          <section className="space-y-4">
            <p>
              Our lamps are designed to transform ordinary desks and spaces into environments that feel inspiring, calm, and modern. Whether you're working late, studying, creating, or simply relaxing, the right light changes the entire experience.
            </p>
            <p>
              We create desk and decorative lamps that combine clean aesthetics, functionality, and personality — because your space should reflect who you are.
            </p>
            <p className="font-bold text-brand-black">
              Hurricane Lamps is built for people who value design, comfort, and the feeling of a beautifully lit space.
            </p>
          </section>

          <section className="pt-8 border-t border-brand-black/5">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-brand-black mb-8">Our Philosophy</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Clean and modern aesthetics",
                "Functional everyday lighting",
                "Warm and comfortable ambiance",
                "Products that elevate your workspace",
                "Affordable premium design"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 bg-brand-cream/30 p-4 rounded-2xl border border-brand-black/5">
                  <div className="w-2 h-2 rounded-full bg-brand-orange flex-none" />
                  <span className="text-xs md:text-sm font-bold uppercase tracking-widest">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
