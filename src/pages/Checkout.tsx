import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, ChevronLeft, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, totalItems, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    shippingLocation: 'dhaka' as 'dhaka' | 'outside'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderedItems, setOrderedItems] = useState(items);

  useEffect(() => {
    if (items.length === 0 && !isSuccess) {
      navigate('/');
    }
    window.scrollTo(0, 0);
  }, [items.length, navigate, isSuccess]);

  const hasFreeDelivery = totalItems >= 2;
  const shippingCost = hasFreeDelivery ? 0 : (formData.shippingLocation === 'dhaka' ? 80 : 120);
  const finalTotal = subtotal + shippingCost;

    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_name: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          shippingLocation: formData.shippingLocation,
          cartItems: items.map(item => ({
            id: item.id,
            product_name: `${item.name} (${item.selectedColor})`,
            quantity: item.quantity,
            price: item.priceDiscount
          }))
        }),
      });

if (response.ok) {
  setOrderedItems([...items]);

  // Track dynamic purchase event in Zaraz safely for TypeScript
  if (typeof window !== 'undefined' && (window as any).zaraz) {
    (window as any).zaraz.track("Purchase", {
      value: finalTotal,
      currency: "BDT"
    });
  }

  setIsSuccess(true);
  clearCart();
} else {
        const errData = await response.json().catch(() => ({}));
        alert(`Order failed: ${errData.error || 'Please try again later'}`);
      }
    } catch (error) {
      console.error('Order Error:', error);
      alert('An error occurred while placing your order. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white p-12 rounded-[3rem] text-center shadow-2xl border border-brand-orange/10"
        >
          <div className="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="text-brand-orange" size={40} />
          </div>
          <h2 className="text-4xl font-bold tracking-tighter uppercase mb-4 text-brand-black">ধন্যবাদ / THANK YOU</h2>
          <p className="text-brand-charcoal/60 mb-2 text-sm uppercase tracking-widest leading-relaxed">
            আপনার অর্ডারটি গ্রহণ করা হয়েছে। <br />
            যাচাইকরণের জন্য আমরা আপনাকে কল করব। <br />
            We will call you for verification.
          </p>
          <p className="text-brand-orange font-bold text-xs uppercase tracking-widest mb-10">
            Order confirmed for: {formData.phone}
          </p>

          <div className="bg-brand-black/5 p-6 rounded-2xl mb-10 text-left">
            <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-4 px-2">Order Details</h3>
            <div className="space-y-4">
              {orderedItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center px-2">
                  <div className="flex gap-4 items-center">
                    <span className="text-xs font-bold w-4">{item.quantity}x</span>
                    <div>
                      <p className="text-xs font-bold uppercase">{item.name}</p>
                      <p className="text-[9px] opacity-50 uppercase tracking-widest">{item.selectedColor}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold">BDT {item.priceDiscount * item.quantity}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-brand-black/10 flex justify-between px-2">
                <span className="text-xs font-bold uppercase opacity-60">Total Paid</span>
                <span className="text-lg font-bold text-brand-orange">BDT {finalTotal}</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/')}
            className="w-full py-5 bg-brand-black text-brand-cream text-xs font-bold uppercase tracking-[0.3em] rounded-full hover:bg-brand-orange transition-all duration-300"
          >
            হোমে ফিরে যান / Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4">
      <div className="flex items-center gap-2 mb-12">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-brand-black/5 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase">অর্ডার সম্পন্ন করুন / COMPLETE ORDER</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-brand-black/5"
        >
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-brand-black/5">
            <div className="space-y-1">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Cash on Delivery</h2>
              <p className="text-[9px] font-bold text-brand-orange font-bengali tracking-widest">( ক্যাশ অন ডেলিভারি )</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-orange rounded-full" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">Priority Order</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] block text-brand-charcoal opacity-50">
                পুরো নাম / Full Name
              </label>
              <input 
                required
                type="text" 
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
                placeholder="Ex. Rahat Ahmed"
                className="w-full border-b border-gray-300 py-3 text-sm focus:border-brand-orange outline-none transition-colors bg-transparent"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] block text-brand-charcoal opacity-50">
                ফোন নম্বর / Phone Number
              </label>
              <input 
                required
                type="tel" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                placeholder="+880 1XXX-XXXXXX"
                className="w-full border-b border-gray-300 py-3 text-sm focus:border-brand-orange outline-none transition-colors bg-transparent"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] block text-brand-charcoal opacity-50">
                ঠিকানা / Full Address
              </label>
              <textarea 
                required
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                placeholder="Street, City, Zela/District"
                rows={2}
                className="w-full border-b border-gray-300 py-3 text-sm focus:border-brand-orange outline-none transition-colors bg-transparent resize-none"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] block text-brand-charcoal opacity-50 ml-1">
                ডেলিভারি এরিয়া / Shipping Area
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, shippingLocation: 'dhaka'})}
                  className={`py-4 rounded-2xl border text-[10px] font-bold uppercase tracking-widest transition-all ${formData.shippingLocation === 'dhaka' ? 'bg-brand-black text-brand-cream border-brand-black' : 'border-gray-200 hover:border-brand-black opacity-60'}`}
                >
                  Dhaka (80 BDT)
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, shippingLocation: 'outside'})}
                  className={`py-4 rounded-2xl border text-[10px] font-bold uppercase tracking-widest transition-all ${formData.shippingLocation === 'outside' ? 'bg-brand-black text-brand-cream border-brand-black' : 'border-gray-200 hover:border-brand-black opacity-60'}`}
                >
                  Outside (120 BDT)
                </button>
              </div>
            </div>

            <div className={`p-6 rounded-2xl border border-dashed transition-all duration-500 ${hasFreeDelivery ? 'bg-brand-orange/10 border-brand-orange' : 'bg-brand-black/5 border-brand-black/10 opacity-50'}`}>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-center">
                {hasFreeDelivery ? '🎉 FREE DELIVERY APPLIED FOR BUYING 2+ ITEMS' : `ADD ${2 - totalItems} MORE ITEM(S) TO GET FREE DELIVERY`}
              </p>
            </div>

            <button 
              disabled={isSubmitting || !formData.phone || !formData.address || !formData.fullName}
              className="pill-btn w-full shadow-2xl shadow-brand-orange/20 py-5 text-sm tracking-[0.4em] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4"
            >
              {isSubmitting ? 'PROCESSING...' : `অর্ডার করুন - BDT ${finalTotal}`}
            </button>
          </form>
        </motion.div>

        {/* Summary Section */}
        <aside className="lg:sticky lg:top-32 space-y-12">
          <div className="bg-brand-black text-brand-cream p-8 md:p-12 rounded-[3.5rem] relative overflow-hidden shadow-2xl">
             <div className="relative z-10">
               <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-10 opacity-40">Order Summary</h3>
               
               <div className="max-h-[300px] overflow-y-auto space-y-6 pr-2 mb-10 scrollbar-thin scrollbar-thumb-brand-cream/10">
                 {items.map((item, idx) => (
                   <div key={idx} className="flex gap-4 pb-6 border-b border-brand-cream/10 last:border-0 last:pb-0">
                     <div className="w-16 h-20 rounded-xl overflow-hidden bg-brand-charcoal flex-none shadow-lg">
                        <img src={item.mainImage} alt={item.name} className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-tight">{item.name}</h4>
                          <p className="text-[9px] uppercase tracking-widest opacity-50">{item.selectedColor}</p>
                        </div>
                        <div className="flex justify-between items-end">
                          <p className="text-[9px] opacity-30 tracking-widest uppercase">Qty: {item.quantity}</p>
                          <span className="text-xs font-bold text-brand-orange">BDT {item.priceDiscount * item.quantity}</span>
                        </div>
                     </div>
                   </div>
                 ))}
               </div>

               <div className="space-y-4 pt-6 border-t border-brand-cream/20">
                  <div className="flex justify-between text-[10px] tracking-widest uppercase">
                    <span className="opacity-40">Subtotal</span>
                    <span className="font-bold">BDT {subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[10px] tracking-widest uppercase">
                    <span className="opacity-40">Shipping</span>
                    <span className={`font-bold ${hasFreeDelivery ? 'text-brand-orange' : ''}`}>
                      {hasFreeDelivery ? 'FREE' : `BDT ${shippingCost}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold tracking-tighter pt-8 uppercase">
                    <span>Total</span>
                    <span>BDT {finalTotal}</span>
                  </div>
               </div>
             </div>
             
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-orange/10 rounded-full blur-[80px]" />
          </div>

          <div className="bg-brand-cream/10 p-8 rounded-[2.5rem] border border-brand-black/5 flex items-start gap-4">
             <ShoppingBag className="text-brand-orange mt-1 flex-none" size={20} />
             <p className="text-[9px] uppercase tracking-[0.2em] opacity-60 leading-relaxed italic">
               "Your collection grows, and soon your space will glow with Hurricane's warmth."
             </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
