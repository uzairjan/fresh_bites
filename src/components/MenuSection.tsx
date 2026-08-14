import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Flame, Leaf, ShieldCheck, Clock, Sparkles, X } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData';
import { MenuItem } from '../types';
import { playSound } from '../utils/sound';
import { defaultViewport, smoothEase, fadeInUp, staggerContainer } from '../utils/animations';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItem,
  onQuickAdd,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDietaryFilter, setActiveDietaryFilter] = useState<'all' | 'veg' | 'spicy' | 'halal' | 'popular'>('all');

  const categories = [
    { id: 'all', label: 'ALL ITEMS' },
    { id: 'pizza', label: 'WOOD-FIRED PIZZA' },
    { id: 'burger', label: 'SMASH BURGERS' },
    { id: 'shawarma', label: 'LOADED SHAWARMA' },
    { id: 'sides', label: 'LOADED SIDES' },
    { id: 'desserts', label: 'SWEETS & DESSERTS' },
    { id: 'drinks', label: 'CRAFT DRINKS' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search match
      if (
        searchQuery.trim() &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ) {
        return false;
      }
      // Dietary filter match
      if (activeDietaryFilter === 'veg' && !item.isVegetarian) return false;
      if (activeDietaryFilter === 'spicy' && !item.isSpicy) return false;
      if (activeDietaryFilter === 'halal' && !item.isHalal) return false;
      if (activeDietaryFilter === 'popular' && !item.isPopular) return false;

      return true;
    });
  }, [selectedCategory, searchQuery, activeDietaryFilter]);

  return (
    <section id="menu" className="w-full py-12 md:py-20 bg-[#0A0A0A] border-t border-[#2A2A2A] relative">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6">
        
        {/* Section Heading with scroll animation */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#D4AF37]/40 text-[#D4AF37] font-label-caps text-xs tracking-[0.2em] mb-3 rounded-[2px]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ARTISANAL KITCHEN MENU</span>
          </div>
          <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl text-[#F5F5F0] uppercase font-bold tracking-tight">
            Crafted for <span className="text-[#D4AF37] font-headline-script capitalize">Obsessive Taste</span>
          </h2>
          <p className="font-body-md text-sm sm:text-base text-[#A0A0A0] mt-2 leading-relaxed">
            Every dish is made from scratch with genuine slow-fermented dough, 100% prime meats, and handcrafted artisanal sauces.
          </p>
        </motion.div>

        {/* Search & Dietary Filter Controls Bar with scroll animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.5, delay: 0.15, ease: smoothEase }}
          className="bg-[#141414] border border-[#2A2A2A] p-4 md:p-5 rounded-[2px] mb-8 shadow-xl"
        >
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            
            {/* Live Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search pizzas, burgers, shawarmas, ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#F5F5F0] pl-10 pr-10 py-2.5 text-sm font-body-md rounded-[2px] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0A0A0] hover:text-[#F5F5F0] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Dietary Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <span className="font-label-caps text-[11px] text-[#A0A0A0] shrink-0 mr-1 hidden sm:inline">
                FILTER:
              </span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playSound('click');
                  setActiveDietaryFilter('all');
                }}
                className={`font-label-caps text-xs px-3 py-1.5 rounded-[2px] transition-all shrink-0 cursor-pointer ${
                  activeDietaryFilter === 'all'
                    ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold'
                    : 'bg-[#0A0A0A] text-[#A0A0A0] hover:text-[#F5F5F0] border border-[#2A2A2A]'
                }`}
              >
                ALL
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playSound('click');
                  setActiveDietaryFilter(activeDietaryFilter === 'popular' ? 'all' : 'popular');
                }}
                className={`font-label-caps text-xs px-3 py-1.5 rounded-[2px] transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  activeDietaryFilter === 'popular'
                    ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold'
                    : 'bg-[#0A0A0A] text-[#A0A0A0] hover:text-[#F5F5F0] border border-[#2A2A2A]'
                }`}
              >
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                POPULAR
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playSound('click');
                  setActiveDietaryFilter(activeDietaryFilter === 'veg' ? 'all' : 'veg');
                }}
                className={`font-label-caps text-xs px-3 py-1.5 rounded-[2px] transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  activeDietaryFilter === 'veg'
                    ? 'bg-[#4ADE80] text-[#052e16] font-bold'
                    : 'bg-[#0A0A0A] text-[#A0A0A0] hover:text-[#F5F5F0] border border-[#2A2A2A]'
                }`}
              >
                <Leaf className="w-3 h-3 text-[#4ADE80]" />
                VEGETARIAN
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playSound('click');
                  setActiveDietaryFilter(activeDietaryFilter === 'spicy' ? 'all' : 'spicy');
                }}
                className={`font-label-caps text-xs px-3 py-1.5 rounded-[2px] transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  activeDietaryFilter === 'spicy'
                    ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold'
                    : 'bg-[#0A0A0A] text-[#A0A0A0] hover:text-[#F5F5F0] border border-[#2A2A2A]'
                }`}
              >
                <Flame className="w-3 h-3 text-[#D4AF37]" />
                SPICY
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playSound('click');
                  setActiveDietaryFilter(activeDietaryFilter === 'halal' ? 'all' : 'halal');
                }}
                className={`font-label-caps text-xs px-3 py-1.5 rounded-[2px] transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  activeDietaryFilter === 'halal'
                    ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold'
                    : 'bg-[#0A0A0A] text-[#A0A0A0] hover:text-[#F5F5F0] border border-[#2A2A2A]'
                }`}
              >
                <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                HALAL
              </motion.button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-3 border-t border-[#2A2A2A] scrollbar-none">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  playSound('click');
                  setSelectedCategory(cat.id);
                }}
                className={`font-label-caps text-xs px-4 py-2 whitespace-nowrap transition-all rounded-[2px] cursor-pointer tracking-wider ${
                  selectedCategory === cat.id
                    ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold shadow-md'
                    : 'bg-[#0A0A0A] text-[#A0A0A0] hover:text-[#D4AF37] border border-[#2A2A2A]'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Menu Items Grid with AnimatePresence & Staggered Scroll Motion */}
        {filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-[#141414] border border-[#2A2A2A] p-8 rounded-[2px]"
          >
            <p className="font-headline-script text-2xl text-[#D4AF37] mb-2">No culinary matches found</p>
            <p className="font-body-md text-sm text-[#A0A0A0] max-w-md mx-auto mb-4">
              Try adjusting your search keywords or dietary filters to explore our full menu.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveDietaryFilter('all');
                setSelectedCategory('all');
              }}
              className="font-label-caps text-xs bg-[#D4AF37] text-[#0A0A0A] font-bold px-5 py-2.5 rounded-[2px] tracking-wider cursor-pointer"
            >
              RESET FILTERS
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            variants={staggerContainer(0.06, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                return (
                  <motion.div
                    layout
                    key={item.id}
                    variants={fadeInUp}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: smoothEase }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="bg-[#141414] border border-[#2A2A2A] hover:border-[#D4AF37] p-5 flex flex-col justify-between group transition-all duration-300 rounded-[2px] hover:shadow-[0_12px_35px_rgba(0,0,0,0.8)] relative"
                  >
                    {/* Top Badges & Category */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-label-caps text-[10px] text-[#D4AF37] tracking-wider uppercase bg-[#0A0A0A] px-2.5 py-1 border border-[#2A2A2A]">
                        {item.categoryLabel}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {item.isVegetarian && (
                          <span title="Vegetarian" className="text-[#4ADE80]">
                            <Leaf className="w-4 h-4" />
                          </span>
                        )}
                        {item.isSpicy && (
                          <span title="Spicy" className="text-[#D4AF37]">
                            <Flame className="w-4 h-4 fill-[#D4AF37]" />
                          </span>
                        )}
                        {item.isHalal && (
                          <span title="Halal Certified" className="text-[#D4AF37]">
                            <ShieldCheck className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex gap-4 items-start mb-4">
                      <div className="flex-1">
                        {/* Numbered Title in Gold */}
                        <h3 className="font-menu-item-title text-lg sm:text-xl text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors leading-snug mb-1.5">
                          <span className="text-[#D4AF37] font-label-caps text-base mr-1.5 font-bold">
                            {item.number}.
                          </span>
                          {item.name}
                        </h3>
                        <p className="font-body-md text-xs sm:text-sm text-[#A0A0A0] line-clamp-3 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Image Thumbnail with Circular Frame & Hover Zoom */}
                      <div className="w-20 h-20 sm:w-22 sm:h-22 shrink-0 rounded-full border-2 border-[#2A2A2A] group-hover:border-[#D4AF37] overflow-hidden relative shadow-md">
                        <img
                          src={item.image}
                          alt={item.altText}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Meta Specs (Prep Time & Calories) */}
                    <div className="flex items-center gap-3 text-[11px] font-label-caps text-[#8E8E8E] pb-3 mb-3 border-b border-[#2A2A2A]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D4AF37]" />
                        {item.prepTimeMinutes} mins
                      </span>
                      {item.calories && (
                        <span>• {item.calories} kcal</span>
                      )}
                      {item.customizationOptions && (
                        <span className="text-[#4ADE80] ml-auto">Customizable</span>
                      )}
                    </div>

                    {/* Bottom Action Row: Price & Controls */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-baseline gap-2">
                        <span className="font-price-tag text-xl sm:text-2xl text-[#D4AF37]">
                          €{item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="font-label-caps text-xs text-[#8E8E8E] line-through opacity-70">
                            €{item.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {item.customizationOptions ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              playSound('click');
                              onSelectItem(item);
                            }}
                            className="font-label-caps text-xs px-3.5 py-2 bg-transparent hover:bg-[#D4AF37]/10 text-[#D4AF37] border border-[#2A2A2A] hover:border-[#D4AF37] transition-colors rounded-[2px] cursor-pointer tracking-wider"
                          >
                            CUSTOMIZE
                          </motion.button>
                        ) : null}

                        <motion.button
                          whileHover={{ scale: 1.12, rotate: 90 }}
                          whileTap={{ scale: 0.88 }}
                          onClick={() => {
                            playSound('add');
                            onQuickAdd(item);
                          }}
                          className="w-10 h-10 bg-[#0A0A0A] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#0A0A0A] border border-[#2A2A2A] hover:border-[#D4AF37] rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md"
                          title={`Add ${item.name} to cart`}
                          aria-label={`Add ${item.name} to cart`}
                        >
                          <Plus className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
};
