/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import ReturnPolicy from './pages/ReturnPolicy';
import About from './pages/About';

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-brand-cream font-sans flex flex-col">
      <Navbar />
      <CartDrawer />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route 
              path="/" 
              element={
                <motion.div 
                  key="home"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Home />
                </motion.div>
              } 
            />
            <Route 
              path="/product/:id" 
              element={
                <motion.div 
                  key="detail"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductDetail />
                </motion.div>
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <motion.div 
                  key="checkout"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Checkout />
                </motion.div>
              } 
            />
            <Route 
              path="/return-policy" 
              element={
                <motion.div 
                  key="return-policy"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ReturnPolicy />
                </motion.div>
              } 
            />
            <Route 
              path="/about" 
              element={
                <motion.div 
                  key="about"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <About />
                </motion.div>
              } 
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
