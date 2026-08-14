import React from 'react';
import { motion } from 'motion/react';
import { Pizza, Utensils, Sandwich, Sparkles, Clock, Flame, ShieldCheck } from 'lucide-react';
import { playSound } from '../utils/sound';
import { fadeInUp, defaultViewport, staggerContainer } from '../utils/animations';

interface CategoriesBannerProps {
  onSelectCategory: (category: string) => void;
}

export const CategoriesBanner: React.FC<CategoriesBannerProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'pizza',
      title: 'PIZZA',
      subtitle: 'Wood-fired perfection 450°C',
      icon: Pizza,
      rotation: 'rotate-1',
      tag: '48h Ferment',
    },
    {
      id: 'burger',
      title: 'BURGERS',
      subtitle: 'Prime Angus beef smash',
      icon: Utensils,
      rotation: '-rotate-1',
      tag: 'Crispy Edges',
    },
    {
      id: 'shawarma',
      title: 'SHAWARMA',
      subtitle: 'Authentic spices & toum',
      icon: Sandwich,
      rotation: 'rotate-1',
      tag: 'Levantine Recipe',
    },
    {
      id: 'sides',
      title: 'LOADED SIDES',
      subtitle: 'Truffle & shawarma fries',
      icon: Sparkles,
      rotation: '-rotate-1',
      tag: 'Sharing Feasts',
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={defaultViewport}
      transition={{ duration: 0.6 }}
      className="w-full bg-[#111111] border-y border-[#2A2A2A] py-8 relative overflow-hidden"
    >
      {/* Subtle Polka Dot Accent */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#D4AF37 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-[1240px] mx-auto px-4 md:px-6 relative z-10">
        
        {/* Category Clickable Badges with staggered scroll reveal */}
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                variants={fadeInUp}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  playSound('click');
                  onSelectCategory(cat.id);
                }}
                className="flex items-center gap-3.5 text-left p-3.5 md:p-4 bg-[#141414] hover:bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#D4AF37] transition-all group cursor-pointer rounded-[2px] shadow-md"
              >
                <div className={`w-12 h-12 shrink-0 border border-[#D4AF37]/40 flex items-center justify-center bg-[#0A0A0A] group-hover:bg-[#D4AF37]/10 transition-all transform ${cat.rotation} group-hover:rotate-0`}>
                  <Icon className="w-6 h-6 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-label-caps text-xs sm:text-sm text-[#D4AF37] group-hover:text-[#F5F5F0] transition-colors">
                      {cat.title}
                    </h3>
                  </div>
                  <p className="font-body-md text-xs text-[#A0A0A0] line-clamp-1">
                    {cat.subtitle}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Value Highlights Ticker with scroll stagger */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 mt-6 pt-5 border-t border-[#2A2A2A] text-xs font-label-caps text-[#A0A0A0] tracking-wider"
        >
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#D4AF37]" />
            <span>Neapolitan Stone Hearth</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#4ADE80]" />
            <span>100% Certified Fresh Cuts</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#D4AF37]" />
            <span>Late Night Delivery 02:00</span>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};
