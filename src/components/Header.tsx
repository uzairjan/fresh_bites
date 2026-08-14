import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { ShoppingBag, Menu as MenuIcon, X, Phone, Flame, Sparkles } from 'lucide-react';
import { LOGO_URL, USER_AVATAR_URL, RESTAURANT_INFO } from '../data/menuData';
import { ActiveTab, CartItem } from '../types';
import { playSound } from '../utils/sound';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cart,
  setIsCartOpen,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleNavClick = (tab: ActiveTab) => {
    playSound('click');
    setActiveTab(tab);
    setMobileMenuOpen(false);
    
    // Smooth scroll to relevant section if already on home
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const section = document.getElementById(tab);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 w-full z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#2A2A2A] shadow-2xl"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] origin-left z-50"
        style={{ scaleX }}
      />

      <div className="h-20 max-w-[1240px] mx-auto px-4 md:px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            aria-label="Fresh Bites Home"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              src={LOGO_URL}
              alt="Fresh Bites Logo"
              className="h-11 md:h-12 w-auto object-contain transition-transform"
            />
          </button>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {[
            { id: 'home', label: 'HOME' },
            { id: 'menu', label: 'MENU' },
            { id: 'special-deals', label: 'SPECIAL DEALS', icon: Flame },
            { id: 'builder', label: 'CRAVING STUDIO', icon: Sparkles },
            { id: 'reviews', label: 'REVIEWS' },
            { id: 'contact', label: 'CONTACT' },
          ].map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + idx * 0.05 }}
                onClick={() => handleNavClick(item.id as ActiveTab)}
                className={`font-label-caps text-xs tracking-[0.2em] transition-all relative pb-1 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#D4AF37] font-bold'
                    : 'text-[#A0A0A0] hover:text-[#D4AF37]'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5 text-[#D4AF37]" />}
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-3 md:gap-4"
        >
          {/* Cart Trigger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playSound('click');
              setIsCartOpen(true);
            }}
            className="relative flex items-center gap-2 bg-[#141414] hover:bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#D4AF37] text-[#F5F5F0] px-3.5 py-2.5 transition-all rounded-[2px] cursor-pointer"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
            {totalCartCount > 0 && (
              <span className="font-price-tag text-xs text-[#D4AF37]">
                €{cartSubtotal.toFixed(2)}
              </span>
            )}
            <AnimatePresence>
              {totalCartCount > 0 && (
                <motion.span
                  key={totalCartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#0A0A0A] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-[#0A0A0A]"
                >
                  {totalCartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Primary ORDER NOW button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              playSound('click');
              handleNavClick('menu');
            }}
            className="bg-[#D4AF37] hover:bg-[#E5C358] text-[#0A0A0A] font-bold font-label-caps text-xs px-4 md:px-5 py-3 tracking-[0.2em] transition-all red-brutal-shadow cursor-pointer hidden sm:block"
          >
            ORDER NOW
          </motion.button>

          {/* User Profile Avatar with tooltip */}
          <div className="relative group cursor-pointer hidden md:block">
            <motion.img
              whileHover={{ scale: 1.08 }}
              alt="Customer Profile"
              className="w-9 h-9 rounded-full object-cover border border-[#D4AF37] hover:ring-2 hover:ring-[#D4AF37]/50 transition-all"
              src={USER_AVATAR_URL}
            />
            <div className="absolute right-0 top-11 hidden group-hover:block bg-[#141414] border border-[#2A2A2A] p-3 rounded shadow-2xl min-w-[200px] z-50">
              <p className="font-label-caps text-[10px] text-[#D4AF37] tracking-wider">FRESH BITES CLUB</p>
              <p className="font-menu-item-title text-sm text-[#F5F5F0] mt-0.5">Diner Member</p>
              <p className="font-body-md text-xs text-[#A0A0A0] mt-1">Gondomar VIP Loyalty: 240 pts</p>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#F5F5F0] hover:text-[#D4AF37] focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-[#111111] border-b border-[#2A2A2A] px-6 py-5 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {[
                { id: 'home', label: 'HOME' },
                { id: 'menu', label: 'FULL MENU' },
                { id: 'special-deals', label: 'SPECIAL DEALS', badge: 'SAVE' },
                { id: 'builder', label: 'CRAVING STUDIO (CUSTOM)', icon: Sparkles },
                { id: 'reviews', label: 'CUSTOMER REVIEWS' },
                { id: 'contact', label: 'LOCATION & CONTACT' },
              ].map((item, i) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleNavClick(item.id as ActiveTab)}
                    className={`text-left font-label-caps text-sm py-2 border-b border-[#2A2A2A] flex items-center justify-between ${
                      isActive ? 'text-[#D4AF37] font-bold' : 'text-[#A0A0A0]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="bg-[#D4AF37] text-[#0A0A0A] text-[10px] px-2 py-0.5 font-bold rounded">
                        {item.badge}
                      </span>
                    )}
                    {Icon && <Icon className="w-4 h-4 text-[#D4AF37]" />}
                  </motion.button>
                );
              })}

              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={() => {
                    playSound('click');
                    handleNavClick('menu');
                  }}
                  className="w-full bg-[#D4AF37] hover:bg-[#E5C358] text-[#0A0A0A] font-bold font-label-caps text-xs py-3 tracking-widest rounded-[2px]"
                >
                  ORDER DELIVERY NOW
                </button>
                <div className="text-center mt-2">
                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="inline-flex items-center gap-2 font-label-caps text-xs text-[#A0A0A0] hover:text-[#D4AF37]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {RESTAURANT_INFO.phone} (12h - 02h)
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
