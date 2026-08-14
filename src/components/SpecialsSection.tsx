import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Plus, Flame } from 'lucide-react';
import { MenuItem } from '../types';
import { playSound } from '../utils/sound';
import { defaultViewport, smoothEase } from '../utils/animations';

interface SpecialsSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  onViewFullMenu: () => void;
  godfatherPizza: MenuItem;
  doubleSmashBurger: MenuItem;
  loadedShawarmaFries: MenuItem;
}

export const SpecialsSection: React.FC<SpecialsSectionProps> = ({
  onSelectItem,
  onQuickAdd,
  onViewFullMenu,
  godfatherPizza,
  doubleSmashBurger,
  loadedShawarmaFries,
}) => {
  return (
    <section id="special-deals" className="w-full py-12 md:py-16 max-w-[1240px] mx-auto px-4 md:px-6 relative z-10">
      
      {/* Header with scroll animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={defaultViewport}
        transition={{ duration: 0.6, ease: smoothEase }}
        className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-12 gap-4"
      >
        <div>
          <span className="font-label-caps text-xs text-[#D4AF37] tracking-[0.25em] uppercase">
            Limited Time Offers
          </span>
          <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl text-[#F5F5F0] mt-1 uppercase font-bold">
            Today's <span className="text-[#D4AF37] font-headline-script capitalize text-4xl sm:text-5xl">Specials</span>
          </h2>
        </div>

        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            playSound('click');
            onViewFullMenu();
          }}
          className="font-label-caps text-xs sm:text-sm text-[#D4AF37] hover:text-[#F5F5F0] transition-colors flex items-center gap-2 border-b border-[#D4AF37] pb-1 self-start sm:self-auto cursor-pointer tracking-[0.15em]"
        >
          <span>VIEW FULL MENU</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Bento Grid Layout with Scroll Motion */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Large Featured Special: The Godfather Pizza (8 cols) */}
        {godfatherPizza && (
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.7, ease: smoothEase }}
            whileHover={{ y: -4 }}
            className="md:col-span-8 relative bg-[#141414] border border-[#2A2A2A] hover:border-[#D4AF37] p-6 sm:p-8 flex flex-col justify-end overflow-hidden group min-h-[380px] md:min-h-[440px] transition-all rounded-[2px] shadow-2xl"
          >
            
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
              <div
                className="bg-cover bg-center w-full h-full transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-90"
                style={{ backgroundImage: `url('${godfatherPizza.image}')` }}
                aria-label={godfatherPizza.altText}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col items-start w-full">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#141414]/90 text-[#D4AF37] font-label-caps text-xs px-3.5 py-1 shadow-lg border border-[#D4AF37]/50 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  CHEF'S PICK
                </span>
                <span className="bg-[#141414]/90 text-[#4ADE80] font-label-caps text-[11px] px-2.5 py-1 border border-[#4ADE80]/40">
                  WOOD FIRED 450°C
                </span>
              </div>

              <h3 className="font-menu-item-title text-2xl sm:text-3xl md:text-4xl text-[#F5F5F0] mb-2">
                {godfatherPizza.name}
              </h3>

              <p className="font-body-md text-sm sm:text-base text-[#A0A0A0] max-w-xl line-clamp-3 mb-6 leading-relaxed">
                {godfatherPizza.description}
              </p>

              <div className="flex items-center justify-between w-full pt-4 border-t border-[#2A2A2A]">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-price-tag text-2xl sm:text-3xl text-[#D4AF37]">
                    €{godfatherPizza.price.toFixed(2)}
                  </span>
                  {godfatherPizza.originalPrice && (
                    <span className="font-label-caps text-xs text-[#8E8E8E] line-through opacity-75">
                      €{godfatherPizza.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      playSound('click');
                      onSelectItem(godfatherPizza);
                    }}
                    className="font-label-caps text-xs text-[#F5F5F0] hover:text-[#D4AF37] px-3.5 py-2 border border-[#2A2A2A] hover:border-[#D4AF37] transition-colors rounded-[2px] cursor-pointer tracking-wider"
                  >
                    CUSTOMIZE CRUST & TOPPINGS
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      playSound('add');
                      onQuickAdd(godfatherPizza);
                    }}
                    className="w-11 h-11 bg-[#0A0A0A] border border-[#D4AF37] rounded-full flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all cursor-pointer shadow-lg"
                    title="Quick Add to Cart"
                    aria-label="Add The Godfather Pizza to cart"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Secondary Specials (4 cols each) */}
        <div className="md:col-span-4 flex flex-col gap-6">
          
          {/* Secondary Special 1: Double Smash Burger */}
          {doubleSmashBurger && (
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6, delay: 0.15, ease: smoothEase }}
              whileHover={{ y: -3 }}
              className="relative bg-[#141414] border border-[#2A2A2A] hover:border-[#D4AF37] p-5 sm:p-6 flex flex-col justify-between overflow-hidden group transition-all rounded-[2px] flex-1 shadow-xl"
            >
              <div className="absolute right-0 top-0 w-32 h-32 rounded-bl-full bg-gradient-to-bl from-[#D4AF37]/10 to-transparent z-0 pointer-events-none" />
              
              <div className="relative z-10 flex gap-4 h-full items-center">
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    <span className="font-label-caps text-[10px] text-[#4ADE80] tracking-wider uppercase mb-1 block">
                      Smash Special
                    </span>
                    <h3 className="font-menu-item-title text-lg sm:text-xl text-[#F5F5F0] leading-tight mb-1 group-hover:text-[#D4AF37] transition-colors">
                      {doubleSmashBurger.name}
                    </h3>
                    <p className="font-body-md text-xs sm:text-sm text-[#A0A0A0] line-clamp-2">
                      {doubleSmashBurger.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-baseline gap-2">
                      <span className="font-price-tag text-lg text-[#D4AF37]">
                        €{doubleSmashBurger.price.toFixed(2)}
                      </span>
                      {doubleSmashBurger.originalPrice && (
                        <span className="font-label-caps text-xs text-[#8E8E8E] line-through opacity-70">
                          €{doubleSmashBurger.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          playSound('click');
                          onSelectItem(doubleSmashBurger);
                        }}
                        className="text-[11px] font-label-caps text-[#A0A0A0] hover:text-[#D4AF37] underline cursor-pointer"
                      >
                        Options
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.85 }}
                        onClick={() => {
                          playSound('add');
                          onQuickAdd(doubleSmashBurger);
                        }}
                        className="w-9 h-9 bg-[#0A0A0A] border border-[#D4AF37]/70 rounded-full flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all cursor-pointer"
                        aria-label="Add Double Smash Burger to cart"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Circular image with gold border */}
                <div className="w-22 h-22 sm:w-24 sm:h-24 shrink-0 rounded-full border-2 border-[#2A2A2A] overflow-hidden relative shadow-lg group-hover:border-[#D4AF37] transition-colors">
                  <img
                    src={doubleSmashBurger.image}
                    alt={doubleSmashBurger.altText}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Secondary Special 2: Loaded Shawarma Fries */}
          {loadedShawarmaFries && (
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6, delay: 0.3, ease: smoothEase }}
              whileHover={{ y: -3 }}
              className="relative bg-[#141414] border border-[#2A2A2A] hover:border-[#D4AF37] p-5 sm:p-6 flex flex-col justify-between overflow-hidden group transition-all rounded-[2px] flex-1 shadow-xl"
            >
              <div className="relative z-10 flex gap-4 h-full items-center">
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    <span className="font-label-caps text-[10px] text-[#D4AF37] tracking-wider uppercase mb-1 block">
                      Crowd Favorite
                    </span>
                    <h3 className="font-menu-item-title text-lg sm:text-xl text-[#F5F5F0] leading-tight mb-1 group-hover:text-[#D4AF37] transition-colors">
                      {loadedShawarmaFries.name}
                    </h3>
                    <p className="font-body-md text-xs sm:text-sm text-[#A0A0A0] line-clamp-2">
                      {loadedShawarmaFries.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="font-price-tag text-lg text-[#D4AF37]">
                      €{loadedShawarmaFries.price.toFixed(2)}
                    </span>

                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.85 }}
                      onClick={() => {
                        playSound('add');
                        onQuickAdd(loadedShawarmaFries);
                      }}
                      className="w-9 h-9 bg-[#0A0A0A] border border-[#D4AF37]/70 rounded-full flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all cursor-pointer"
                      aria-label="Add Loaded Shawarma Fries to cart"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Circular image with gold border */}
                <div className="w-22 h-22 sm:w-24 sm:h-24 shrink-0 rounded-full border-2 border-[#2A2A2A] overflow-hidden relative shadow-lg group-hover:border-[#D4AF37] transition-colors">
                  <img
                    src={loadedShawarmaFries.image}
                    alt={loadedShawarmaFries.altText}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
};
