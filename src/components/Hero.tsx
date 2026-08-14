import React from 'react';
import { motion } from 'motion/react';
import { Star, Flame, Sparkles } from 'lucide-react';
import { HERO_PLATTER_URL, CUSTOMER_REVIEWS } from '../data/menuData';
import { playSound } from '../utils/sound';
import { fadeInUp, staggerContainer, smoothEase } from '../utils/animations';

interface HeroProps {
  onOrderClick: () => void;
  onViewMenuClick: () => void;
  onOpenBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOrderClick,
  onViewMenuClick,
  onOpenBuilder,
}) => {
  return (
    <section className="relative w-full pt-12 pb-16 md:pt-20 md:pb-28 px-4 md:px-6 lg:px-8 flex flex-col items-center justify-center -mt-20 overflow-hidden">
      {/* Background Radial Glow & Gradient */}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-[#141414]/90 via-[#0E0E0E]/95 to-[#0A0A0A] pointer-events-none" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: smoothEase }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[520px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="max-w-[1240px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 pt-20">
        
        {/* Left Column: Headline, Description & Calls to Action */}
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-4 order-2 lg:order-1 text-center lg:text-left mx-auto lg:mx-0 max-w-xl"
        >
          
          {/* Opening Status Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-[2px] border border-[#D4AF37]/40 bg-[#141414] text-[#D4AF37] font-label-caps text-[11px] uppercase tracking-[0.2em] mx-auto lg:mx-0 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span>Aberto Todos os Dias: 12h às 02h</span>
          </motion.div>

          {/* Main Display Typography with staggered lines */}
          <motion.h1
            variants={fadeInUp}
            className="font-display-lg text-4xl sm:text-5xl md:text-6xl text-[#F5F5F0] uppercase tracking-wide leading-none mt-2 drop-shadow-xl"
          >
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
              className="block text-[#D4AF37]"
            >
              Artisanal
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1.05 }}
              transition={{ duration: 0.7, delay: 0.35, ease: smoothEase }}
              className="block font-headline-script text-[#F5F5F0] transform -rotate-1 origin-left my-2 sm:my-3 text-5xl sm:text-6xl md:text-7xl"
            >
              Comfort Food
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: smoothEase }}
              className="block text-[#F5F5F0]"
            >
              Done Right.
            </motion.span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeInUp}
            className="font-body-md text-base md:text-lg text-[#A0A0A0] max-w-md mx-auto lg:mx-0 mt-2 leading-relaxed"
          >
            Wood-fired pizzas, smash burgers, and loaded shawarmas crafted with uncompromising quality. Late night cravings sorted.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto mx-auto lg:mx-0"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                playSound('click');
                onOrderClick();
              }}
              className="bg-[#D4AF37] hover:bg-[#E5C358] text-[#0A0A0A] font-bold font-label-caps text-xs sm:text-sm py-4 px-8 tracking-[0.2em] transition-all red-brutal-shadow cursor-pointer flex items-center justify-center gap-2 rounded-[2px]"
            >
              <span>ORDER DELIVERY</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                playSound('click');
                onViewMenuClick();
              }}
              className="bg-transparent border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37]/10 font-label-caps text-xs sm:text-sm py-4 px-8 tracking-[0.2em] transition-all cursor-pointer flex items-center justify-center gap-2 rounded-[2px]"
            >
              <span>VIEW MENU</span>
            </motion.button>
          </motion.div>

          {/* Craving Studio Banner Pill */}
          <motion.div variants={fadeInUp} className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                playSound('click');
                onOpenBuilder();
              }}
              className="w-full sm:w-auto mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#141414] hover:bg-[#1C1C1C] border border-[#2A2A2A] hover:border-[#D4AF37] text-[#D4AF37] text-xs font-label-caps tracking-[0.15em] transition-all cursor-pointer rounded-[2px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>CUSTOMIZE YOUR DREAM PIZZA OR SMASH BURGER →</span>
            </motion.button>
          </motion.div>

          {/* Customer Proof & Uber Eats Rating */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-4 mt-6 pt-6 border-t border-[#2A2A2A] w-full justify-center lg:justify-start"
          >
            <div className="flex -space-x-3">
              {CUSTOMER_REVIEWS.map((review, i) => (
                <motion.img
                  key={review.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1, type: 'spring', stiffness: 300 }}
                  className="w-10 h-10 rounded-full border-2 border-[#0A0A0A] object-cover"
                  src={review.avatar}
                  alt={review.name}
                />
              ))}
            </div>
            <div className="flex flex-col text-left">
              <div className="flex text-[#D4AF37] items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.08, type: 'spring' }}
                  >
                    <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                  </motion.div>
                ))}
              </div>
              <span className="font-label-caps text-[10px] text-[#A0A0A0] mt-0.5 tracking-wider">
                4.8 / 5.0 ON UBER EATS • 1,400+ GONDOMAR REVIEWS
              </span>
            </div>
          </motion.div>

        </motion.div>

        {/* Right Column: Hero Imagery Platter with Floating Tags */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: smoothEase }}
          className="relative order-1 lg:order-2 w-full h-[380px] sm:h-[460px] lg:h-[560px] flex items-center justify-center"
        >
          
          {/* Subtle Ambient Backing Glow */}
          <div className="absolute inset-0 bg-[#D4AF37]/10 rounded-full blur-3xl scale-75 animate-pulse-glow" />

          {/* Main Food Collage with gentle float loop */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full h-full max-w-[580px] mx-auto flex items-center justify-center"
          >
            <img
              src={HERO_PLATTER_URL}
              alt="Artisanal food platter with wood-fired pizza, smash burger, and loaded shawarma"
              className="w-full h-full object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-10 relative select-none pointer-events-none"
            />

            {/* Floating Banner 1: Fresh Ingredients */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: -6 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 15 }}
              whileHover={{ scale: 1.1, rotate: -2 }}
              className="absolute top-6 sm:top-10 -left-2 sm:left-4 md:left-8 bg-[#141414] text-[#D4AF37] font-headline-script text-xl sm:text-2xl py-2 px-5 sm:px-6 shadow-2xl z-20 whitespace-nowrap border border-[#D4AF37]/60 cursor-default"
            >
              Fresh Ingredients!
            </motion.div>

            {/* Floating Banner 2: Wood Fired */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.75, type: 'spring', stiffness: 200, damping: 15 }}
              whileHover={{ scale: 1.08 }}
              className="absolute bottom-6 sm:bottom-10 right-0 sm:right-4 bg-[#141414] text-[#D4AF37] font-label-caps text-[11px] sm:text-xs p-3 sm:px-4 border border-[#D4AF37] shadow-2xl z-20 flex items-center gap-2 cursor-default"
            >
              <Flame className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
              <span>WOOD FIRED 450°C</span>
            </motion.div>

            {/* Floating Banner 3: Halal & Local */}
            <motion.div
              initial={{ opacity: 0, scale: 0, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.9, type: 'spring', stiffness: 200, damping: 15 }}
              whileHover={{ scale: 1.08, rotate: 0 }}
              className="absolute top-1/2 -right-3 sm:-right-4 bg-[#141414]/95 backdrop-blur-sm text-[#4ADE80] font-label-caps text-[10px] sm:text-[11px] py-1.5 px-3 border border-[#4ADE80]/50 shadow-xl z-20 hidden sm:flex items-center gap-1.5 transform rotate-3 cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
              <span>100% FRESH DAILY</span>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
