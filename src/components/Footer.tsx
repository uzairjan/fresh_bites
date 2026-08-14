import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, MessageSquare, Clock, Bike, UtensilsCrossed, ExternalLink, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO, LOGO_URL } from '../data/menuData';
import { playSound } from '../utils/sound';
import { defaultViewport, smoothEase, fadeInUp, staggerContainer } from '../utils/animations';

export const Footer: React.FC = () => {
  const [showMapModal, setShowMapModal] = useState(false);

  return (
    <footer id="contact" className="w-full bg-[#0E0E0E] py-12 md:py-16 border-t-2 border-[#D4AF37]/30 relative text-[#F5F5F0]">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6">
        
        {/* Main 4-Column Grid with Staggered Scroll Animation */}
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 pb-12 border-b border-[#2A2A2A]"
        >
          
          {/* Col 1: Brand & Craft Identity */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <img
              src={LOGO_URL}
              alt="Fresh Bites Logo"
              className="h-12 w-auto object-contain"
            />
            <p className="font-body-md text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
              Artisanal wood-fired pizzas, prime smash burgers, and authentic loaded shawarmas crafted nightly in Gondomar.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0A0A0A] border border-[#D4AF37]/40 rounded-[2px] text-xs font-label-caps text-[#D4AF37]">
              <Clock className="w-3.5 h-3.5" />
              <span>12h às 02h • Todos os Dias</span>
            </div>
          </motion.div>

          {/* Col 2: MORADA (Address & Map) */}
          <motion.div variants={fadeInUp} className="space-y-3">
            <h4 className="font-label-caps text-xs text-[#D4AF37] tracking-[0.2em] uppercase">
              MORADA
            </h4>
            <p className="font-body-md text-sm text-[#A0A0A0] leading-relaxed">
              {RESTAURANT_INFO.address}
            </p>
            <p className="text-xs text-[#D4AF37]">
              Gondomar • Grande Porto
            </p>
            <motion.button
              whileHover={{ x: 3 }}
              onClick={() => {
                playSound('click');
                setShowMapModal(true);
              }}
              className="inline-flex items-center gap-1.5 font-label-caps text-xs text-[#D4AF37] hover:underline pt-1 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>VER MAPA & LOCALIZAÇÃO</span>
            </motion.button>
          </motion.div>

          {/* Col 3: CONTATO (Phone & Direct WhatsApp) */}
          <motion.div variants={fadeInUp} className="space-y-3">
            <h4 className="font-label-caps text-xs text-[#D4AF37] tracking-[0.2em] uppercase">
              CONTATO & ENCOMENDAS
            </h4>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="font-price-tag text-xl text-[#F5F5F0] hover:text-[#D4AF37] transition-colors block"
            >
              {RESTAURANT_INFO.phone}
            </a>
            
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={RESTAURANT_INFO.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#141414] hover:bg-[#1C1C1C] border border-[#4ADE80]/50 text-[#4ADE80] font-label-caps text-xs px-3.5 py-2 rounded-[2px] transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>PEDIR VIA WHATSAPP</span>
            </motion.a>

            {/* Delivery icons */}
            <div className="flex gap-4 mt-3 text-[#A0A0A0]">
              <span title="Doorstep delivery" className="hover:text-[#D4AF37] transition-colors">
                <Bike className="w-5 h-5" />
              </span>
              <span title="Dine-in restaurant" className="hover:text-[#D4AF37] transition-colors">
                <UtensilsCrossed className="w-5 h-5" />
              </span>
              <span title="Verified hygiene" className="hover:text-[#4ADE80] transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </span>
            </div>
          </motion.div>

          {/* Col 4: PARCEIROS (Uber Eats, Glovo, Bolt Food) */}
          <motion.div variants={fadeInUp} className="space-y-3">
            <h4 className="font-label-caps text-xs text-[#D4AF37] tracking-[0.2em] uppercase">
              PARCEIROS OFICIAIS
            </h4>
            <div className="flex flex-col gap-2 font-label-caps text-xs text-[#A0A0A0]">
              {RESTAURANT_INFO.partners.map((partner) => (
                <motion.a
                  key={partner.name}
                  whileHover={{ x: 4 }}
                  href={partner.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2 bg-[#0A0A0A] hover:bg-[#141414] border border-[#2A2A2A] hover:border-[#D4AF37] transition-colors rounded-[2px]"
                >
                  <span>{partner.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                </motion.a>
              ))}
            </div>
          </motion.div>

        </motion.div>

        {/* Bottom Copyright Row with scroll fade */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={defaultViewport}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <p className="font-label-caps text-[10px] text-[#A0A0A0] tracking-wider">
            © 2024 FRESH BITES ARTISANAL COMFORT FOOD. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-4 text-[11px] font-label-caps text-[#A0A0A0]">
            <span>Avenida Gen. Humberto Delgado 409B, Gondomar</span>
            <span>•</span>
            <span className="text-[#D4AF37]">Hearth & Grill Crafted</span>
          </div>
        </motion.div>

      </div>

      {/* Interactive Map Modal with AnimatePresence */}
      <AnimatePresence>
        {showMapModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: smoothEase }}
              className="bg-[#141414] border border-[#D4AF37]/50 w-full max-w-lg p-6 rounded-[2px] shadow-2xl relative"
            >
              <button
                onClick={() => setShowMapModal(false)}
                className="absolute top-4 right-4 text-[#A0A0A0] hover:text-[#D4AF37] cursor-pointer"
              >
                ✕
              </button>
              <h3 className="font-display-lg text-lg text-[#F5F5F0] uppercase mb-2">
                Fresh Bites Gondomar Location
              </h3>
              <p className="font-body-md text-xs text-[#A0A0A0] mb-4">
                {RESTAURANT_INFO.address}
              </p>

              {/* Embedded Visual Map Preview */}
              <div className="w-full h-64 bg-[#0A0A0A] border border-[#2A2A2A] rounded-[2px] relative overflow-hidden flex items-center justify-center p-4 text-center">
                <div className="space-y-2">
                  <MapPin className="w-8 h-8 text-[#D4AF37] mx-auto animate-bounce" />
                  <p className="font-menu-item-title text-sm text-[#F5F5F0]">Fresh Bites Gondomar</p>
                  <p className="font-body-md text-xs text-[#A0A0A0]">
                    Avenida Gen. Humberto Delgado 409B, Gondomar
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(RESTAURANT_INFO.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#E5C358] text-[#0A0A0A] font-bold font-label-caps text-xs px-4 py-2 mt-2 rounded-[2px]"
                  >
                    <span>OPEN IN GOOGLE MAPS</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};
