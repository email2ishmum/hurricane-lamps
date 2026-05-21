import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { setOGTags } from '../utils/seo';

export default function ReturnPolicy() {
  const navigate = useNavigate();

  useEffect(() => {
    setOGTags({
      title: 'Return Policy | Hurricane Lamps',
      description: 'Read our return policy for Hurricane Lamps products. Easy returns and customer satisfaction guaranteed.',
      image: 'https://i.ibb.co.com/8nJtYy5j/hero-1.webp',
      url: 'https://hurricane-lamps.com/return-policy',
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
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-2">Exchange Policy</h1>
        <p className="text-brand-orange font-bold uppercase tracking-[0.2em] mb-12 text-sm">Hassle-Free Exchange & Replacement</p>

        <div className="prose prose-sm md:prose-base max-w-none space-y-8 text-brand-charcoal">
          <section>
            <p className="font-medium">We aim to make your shopping experience completely worry-free. If there’s an issue with your order, we’re here to help.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-tight text-brand-black">You’re eligible for a replacement if:</h2>
            <ul className="space-y-4 list-none p-0">
              <li className="flex items-baseline gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-none" />
                <p><strong>Damaged Product:</strong> If your item arrives damaged, we’ll replace it.</p>
              </li>
              <li className="flex items-baseline gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-none" />
                <p><strong>Incorrect Item:</strong> If you received the wrong product, we’ll send the correct one at no extra cost.</p>
              </li>
              <li className="flex items-baseline gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-none" />
                <p><strong>Missing Items:</strong> If any items are missing from your shipment.</p>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-tight text-brand-black">To qualify for a replacement:</h2>
            <ul className="space-y-4 list-none p-0">
              <li className="flex items-baseline gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-none" />
                <p>Please contact us within 3 days of delivery at <strong>+8801625456864</strong> or <strong>hurricanelamps.store@gmail.com</strong>.</p>
              </li>
              <li className="flex items-baseline gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-none" />
                <div>
                  <p className="mb-2">Share a mandatory video clearly showing:</p>
                  <ul className="list-disc ml-6 opacity-70">
                    <li>The product concern</li>
                    <li>The invoice</li>
                    <li>The outer packaging with the shipping label visible</li>
                  </ul>
                </div>
              </li>
              <li className="flex items-baseline gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-none" />
                <p>The product must be unused, in its original packaging, and include all accessories and the invoice.</p>
              </li>
              <li className="flex items-baseline gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-none" />
                <p>Once verified, your replacement will be arranged within 7 business days.</p>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-tight text-brand-black">Not eligible for replacement:</h2>
            <ul className="space-y-4 list-none p-0">
              <li className="flex items-baseline gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-none" />
                <p>Complaints reported after 3 days of delivery.</p>
              </li>
              <li className="flex items-baseline gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-none" />
                <p>Items damaged due to improper handling or use after delivery.</p>
              </li>
            </ul>
          </section>

          <section className="bg-brand-orange/5 p-6 rounded-2xl border border-brand-orange/20">
            <h2 className="text-lg font-bold uppercase tracking-tight text-brand-black mb-4">Unreceived orders:</h2>
            <p className="text-sm opacity-80 decoration-brand-orange">If your order is marked as delivered but hasn’t been received, please inform us within 24 hours so we can investigate and assist you promptly.</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
