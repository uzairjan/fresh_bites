import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Users, Check, ArrowRight } from 'lucide-react';
import { SPECIAL_DEALS } from '../data/menuData';
import { SpecialDeal } from '../types';
import { playSound } from '../utils/sound';
import { defaultViewport, smoothEase, fadeInUp, staggerContainer } from '../utils/animations';

interface SpecialDealsSectionProps {
  onClaimDeal: (deal: SpecialDeal) => void;
}

export const SpecialDealsSection: React.FC<SpecialDealsSectionProps> = ({ onClaimDeal }) => {
  return (
    <section className="w-full py-16 bg-[#111111] border-y border-[#2A2A2A] relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6">
        
        {/* Header with scroll animation */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#D4AF37]/40 text-[#D4AF37] font-label-caps text-xs tracking-[0.2em] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SAVINGS COMBOS & PLATTERS</span>
            </div>
            <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl text-[#F5F5F0] uppercase font-bold tracking-tight">
              Late-Night & <span className="text-[#D4AF37] font-headline-script capitalize">Feast Bundles</span>
            </h2>
          </div>
          <p className="font-body-md text-sm text-[#A0A0A0] max-w-md">
            Engineered for parties, gaming marathons, and midnight cravings with maximum culinary variety and bundled savings.
          </p>
        </motion.div>

        {/* Deals Cards Grid with Staggered Scroll Motion */}
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {SPECIAL_DEALS.map((deal) => (
            <motion.div
              key={deal.id}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="bg-[#141414] border border-[#2A2A2A] hover:border-[#D4AF37] p-6 rounded-[2px] flex flex-col justify-between transition-all duration-300 relative group shadow-xl"
            >
              {/* Savings Badge Top Right with subtle pop */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={defaultViewport}
                transition={{ delay: 0.3, type: 'spring' }}
                className="absolute top-4 right-4 bg-[#D4AF37] text-[#0A0A0A] font-label-caps text-xs px-3 py-1 font-bold rounded-[2px] shadow-lg tracking-wider z-20"
              >
                SAVE €{deal.savings.toFixed(2)}
              </motion.div>

              <div>
                {/* Deal Image Banner with hover zoom */}
                <div className="w-full h-44 rounded-[2px] overflow-hidden mb-5 border border-[#2A2A2A] relative">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 bg-[#141414]/90 px-2.5 py-1 text-[11px] font-label-caps text-[#4ADE80] border border-[#4ADE80]/30">
                    <Users className="w-3 h-3 inline mr-1" />
                    {deal.serves}
                  </div>
                </div>

                <h3 className="font-menu-item-title text-xl sm:text-2xl text-[#F5F5F0] mb-1">
                  {deal.title}
                </h3>
                <p className="font-headline-script text-[#D4AF37] text-base mb-4">
                  {deal.tagline}
                </p>

                {/* Included Items Checklist */}
                <div className="space-y-2 mb-6 bg-[#0A0A0A] p-4 border border-[#2A2A2A] rounded-[2px]">
                  <p className="font-label-caps text-[11px] text-[#A0A0A0] uppercase tracking-wider mb-2">
                    FEAST INCLUDES:
                  </p>
                  {deal.itemsIncluded.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-body-md text-[#F5F5F0]">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Claim Action */}
              <div className="pt-4 border-t border-[#2A2A2A] flex items-center justify-between mt-auto">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-price-tag text-2xl text-[#D4AF37]">
                      €{deal.price.toFixed(2)}
                    </span>
                    <span className="font-label-caps text-xs text-[#8E8E8E] line-through opacity-70">
                      €{deal.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  <span className="text-[10px] font-label-caps text-[#4ADE80]">
                    Free Sauce Included
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    playSound('add');
                    onClaimDeal(deal);
                  }}
                  className="bg-[#D4AF37] hover:bg-[#E5C358] text-[#0A0A0A] font-bold font-label-caps text-xs px-5 py-3 rounded-[2px] transition-all red-brutal-shadow cursor-pointer flex items-center gap-1.5 tracking-wider"
                >
                  <span>CLAIM FEAST</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
