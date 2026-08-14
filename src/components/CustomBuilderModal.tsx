import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Pizza, Utensils, Plus, Minus, ChefHat, Award } from 'lucide-react';
import { MenuItem } from '../types';
import { playSound } from '../utils/sound';
import { defaultViewport, smoothEase, fadeInUp } from '../utils/animations';

interface CustomBuilderModalProps {
  onAddCustomItem: (item: MenuItem, notes: string) => void;
}

export const CustomBuilderModal: React.FC<CustomBuilderModalProps> = ({ onAddCustomItem }) => {
  const [baseType, setBaseType] = useState<'pizza' | 'burger'>('pizza');
  const [creationName, setCreationName] = useState('');
  
  // Pizza states
  const [pizzaCrust, setPizzaCrust] = useState('Classic Sourdough');
  const [pizzaSauce, setPizzaSauce] = useState('San Marzano Tomato & Basil');
  const [pizzaCheese, setPizzaCheese] = useState('Fior di Latte Mozzarella');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([
    'Spicy Pepperoni',
    'Portobello Mushrooms',
  ]);

  // Burger states
  const [burgerBun, setBurgerBun] = useState('Toasted Brioche Bun');
  const [burgerPatties, setBurgerPatties] = useState(2);
  const [burgerCheese, setBurgerCheese] = useState('Double Aged Cheddar');
  const [burgerSauces, setBurgerSauces] = useState<string[]>(['House Secret Burger Sauce']);
  const [burgerExtras, setBurgerExtras] = useState<string[]>(['Crispy Bacon Strips', 'Caramelized Onions']);

  // Special instructions
  const [chefNotes, setChefNotes] = useState('');

  const toppingListPizza = [
    { name: 'Spicy Pepperoni', price: 1.5 },
    { name: 'Smoked Prosciutto di Parma', price: 2.0 },
    { name: 'Portobello Mushrooms', price: 1.2 },
    { name: 'Gorgonzola Dolce', price: 1.8 },
    { name: 'Pickled Jalapeños', price: 1.0 },
    { name: 'Kalamata Black Olives', price: 1.2 },
    { name: 'Truffle Oil Drizzle', price: 1.8 },
    { name: 'Hot Chili Infused Honey', price: 1.5 },
    { name: 'Fresh Baby Arugula', price: 1.0 },
    { name: 'Roasted Garlic Cloves', price: 1.2 },
  ];

  const burgerExtrasList = [
    { name: 'Crispy Bacon Strips', price: 1.8 },
    { name: 'Caramelized Onions', price: 1.2 },
    { name: 'Fried Free-Range Egg', price: 1.5 },
    { name: 'Crunchy Dill Pickles', price: 0.8 },
    { name: 'Smoked Gouda Slice', price: 1.2 },
    { name: 'Pickled Jalapeños', price: 1.0 },
    { name: 'Crispy Onion Straws', price: 1.2 },
  ];

  const togglePizzaTopping = (toppingName: string) => {
    playSound('click');
    if (selectedToppings.includes(toppingName)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== toppingName));
    } else {
      setSelectedToppings([...selectedToppings, toppingName]);
    }
  };

  const toggleBurgerExtra = (extraName: string) => {
    playSound('click');
    if (burgerExtras.includes(extraName)) {
      setBurgerExtras(burgerExtras.filter((e) => e !== extraName));
    } else {
      setBurgerExtras([...burgerExtras, extraName]);
    }
  };

  // Calculate Price
  const basePrice = baseType === 'pizza' ? 10.90 : 9.50;
  const crustAddon = pizzaCrust.includes('Stuffed') ? 2.50 : 0;
  const burgerPattyAddon = (burgerPatties - 1) * 2.50;
  
  const toppingsPrice = baseType === 'pizza'
    ? selectedToppings.reduce((sum, name) => {
        const item = toppingListPizza.find((t) => t.name === name);
        return sum + (item ? item.price : 1.5);
      }, 0)
    : burgerExtras.reduce((sum, name) => {
        const item = burgerExtrasList.find((e) => e.name === name);
        return sum + (item ? item.price : 1.2);
      }, 0);

  const totalPrice = basePrice + crustAddon + burgerPattyAddon + toppingsPrice;

  const handleBuildAndAdd = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('add');

    const defaultTitle = baseType === 'pizza'
      ? `Custom Wood-Fired Creation (${pizzaCrust.split(' ')[0]})`
      : `Custom ${burgerPatties}x Smash Masterpiece`;

    const finalTitle = creationName.trim() || defaultTitle;

    const description = baseType === 'pizza'
      ? `Base: ${pizzaCrust}, ${pizzaSauce}, ${pizzaCheese}. Toppings: ${selectedToppings.join(', ') || 'Cheese only'}.`
      : `Bun: ${burgerBun}, ${burgerPatties}x Angus Patties, ${burgerCheese}, ${burgerSauces.join(', ')}. Extras: ${burgerExtras.join(', ') || 'Standard'}.`;

    const customMenuItem: MenuItem = {
      id: `custom-build-${Date.now()}`,
      number: 99,
      name: finalTitle,
      category: baseType,
      categoryLabel: `Custom ${baseType.toUpperCase()}`,
      price: totalPrice,
      description,
      image: baseType === 'pizza'
        ? 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80'
        : 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
      altText: finalTitle,
      prepTimeMinutes: 20,
      tags: ['Custom Created', 'Chef Studio'],
    };

    onAddCustomItem(customMenuItem, chefNotes);
    setCreationName('');
    setChefNotes('');
  };

  return (
    <section id="builder" className="w-full py-16 bg-[#0A0A0A] border-t border-[#2A2A2A] relative">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6">
        
        {/* Section Title with scroll animation */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#D4AF37]/40 text-[#D4AF37] font-label-caps text-xs tracking-[0.2em] mb-3">
            <ChefHat className="w-3.5 h-3.5" />
            <span>CRAVING STUDIO • YOUR CULINARY RULES</span>
          </div>
          <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl text-[#F5F5F0] uppercase font-bold tracking-tight">
            Build Your <span className="text-[#D4AF37] font-headline-script capitalize">Own Masterpiece</span>
          </h2>
          <p className="font-body-md text-sm sm:text-base text-[#A0A0A0] mt-2">
            Take total command of our wood oven or cast-iron grill. Pick doughs, cheeses, double smashes, and artisanal drizzles.
          </p>
        </motion.div>

        {/* Builder Container Frame with scroll animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }}
          className="bg-[#141414] border border-[#2A2A2A] rounded-[2px] p-6 md:p-10 shadow-2xl relative"
        >
          
          {/* Base Type Selector Toggle */}
          <div className="flex justify-center mb-10">
            <div className="bg-[#0A0A0A] p-1.5 border border-[#2A2A2A] rounded-[2px] flex gap-2">
              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  playSound('click');
                  setBaseType('pizza');
                }}
                className={`font-label-caps text-xs sm:text-sm px-6 py-3 rounded-[2px] transition-all flex items-center gap-2 cursor-pointer ${
                  baseType === 'pizza'
                    ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold shadow-md'
                    : 'text-[#A0A0A0] hover:text-[#F5F5F0]'
                }`}
              >
                <Pizza className="w-4 h-4" />
                <span>BUILD CUSTOM PIZZA</span>
              </motion.button>

              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  playSound('click');
                  setBaseType('burger');
                }}
                className={`font-label-caps text-xs sm:text-sm px-6 py-3 rounded-[2px] transition-all flex items-center gap-2 cursor-pointer ${
                  baseType === 'burger'
                    ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold shadow-md'
                    : 'text-[#A0A0A0] hover:text-[#F5F5F0]'
                }`}
              >
                <Utensils className="w-4 h-4" />
                <span>BUILD SMASH BURGER</span>
              </motion.button>
            </div>
          </div>

          {/* Main Interactive Form */}
          <form onSubmit={handleBuildAndAdd} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Controls (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Optional Name for Creation */}
              <div>
                <label className="font-label-caps text-xs text-[#D4AF37] block mb-2 tracking-wider">
                  1. NAME YOUR CREATION (OPTIONAL)
                </label>
                <input
                  type="text"
                  placeholder={baseType === 'pizza' ? 'e.g., The Gondomar Volcano' : 'e.g., The Midnight Monster Smash'}
                  value={creationName}
                  onChange={(e) => setCreationName(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#F5F5F0] px-4 py-3 text-sm font-body-md rounded-[2px] focus:outline-none transition-colors"
                />
              </div>

              {/* PIZZA CONTROLS */}
              <AnimatePresence mode="wait">
                {baseType === 'pizza' ? (
                  <motion.div
                    key="pizza-controls"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-8"
                  >
                    {/* Dough / Crust */}
                    <div>
                      <label className="font-label-caps text-xs text-[#D4AF37] block mb-2 tracking-wider">
                        2. ARTISANAL CRUST / DOUGH
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { name: 'Classic Sourdough', desc: '48h cold fermented, airy cornicione', extra: 0 },
                          { name: 'Thin & Crispy Roman', desc: 'Light, crunchy with olive oil', extra: 0 },
                          { name: 'Stuffed Mozzarella Crust', desc: 'Molten cheese sealed in crust', extra: 2.50 },
                        ].map((crust) => (
                          <motion.button
                            key={crust.name}
                            type="button"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                              playSound('click');
                              setPizzaCrust(crust.name);
                            }}
                            className={`p-3.5 text-left border rounded-[2px] transition-all cursor-pointer ${
                              pizzaCrust === crust.name
                                ? 'bg-[#1C1C1C] border-[#D4AF37] text-[#F5F5F0]'
                                : 'bg-[#0A0A0A] border-[#2A2A2A] text-[#A0A0A0] hover:border-[#D4AF37]/50'
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-menu-item-title text-xs sm:text-sm text-[#F5F5F0]">{crust.name}</span>
                              {crust.extra > 0 && (
                                <span className="text-[11px] font-label-caps text-[#D4AF37]">+€{crust.extra.toFixed(2)}</span>
                              )}
                            </div>
                            <p className="text-[11px] font-body-md text-[#A0A0A0]">{crust.desc}</p>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Sauce & Base */}
                    <div>
                      <label className="font-label-caps text-xs text-[#D4AF37] block mb-2 tracking-wider">
                        3. BASE SAUCE
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          'San Marzano Tomato & Basil',
                          'White Garlic Truffle Cream',
                          'Spicy Calabrian Marinara',
                        ].map((sauce) => (
                          <motion.button
                            key={sauce}
                            type="button"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                              playSound('click');
                              setPizzaSauce(sauce);
                            }}
                            className={`p-3 text-left border text-xs font-label-caps rounded-[2px] transition-all cursor-pointer ${
                              pizzaSauce === sauce
                                ? 'bg-[#1C1C1C] border-[#D4AF37] text-[#D4AF37]'
                                : 'bg-[#0A0A0A] border-[#2A2A2A] text-[#A0A0A0] hover:border-[#D4AF37]/50'
                            }`}
                          >
                            {sauce}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Toppings Multi-Select */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="font-label-caps text-xs text-[#D4AF37] tracking-wider">
                          4. PREMIUM TOPPINGS & FINISHES
                        </label>
                        <span className="text-xs text-[#A0A0A0]">
                          {selectedToppings.length} selected
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {toppingListPizza.map((t) => {
                          const isChecked = selectedToppings.includes(t.name);
                          return (
                            <motion.button
                              key={t.name}
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => togglePizzaTopping(t.name)}
                              className={`p-2.5 border rounded-[2px] flex items-center justify-between transition-all cursor-pointer ${
                                isChecked
                                  ? 'bg-[#1C1C1C] border-[#D4AF37] text-[#F5F5F0]'
                                  : 'bg-[#0A0A0A] border-[#2A2A2A] text-[#A0A0A0] hover:border-[#D4AF37]/50'
                              }`}
                            >
                              <span className="font-body-md text-xs truncate text-left">{t.name}</span>
                              <div className="flex items-center gap-1.5 shrink-0 ml-1">
                                <span className="text-[10px] font-label-caps text-[#D4AF37]">+€{t.price.toFixed(2)}</span>
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${isChecked ? 'bg-[#D4AF37] text-[#0A0A0A]' : 'bg-[#2A2A2A] text-transparent'}`}>
                                  ✓
                                </div>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="burger-controls"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-8"
                  >
                    {/* Bun & Patties Quantity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-label-caps text-xs text-[#D4AF37] block mb-2 tracking-wider">
                          2. ARTISANAL BUN
                        </label>
                        <select
                          value={burgerBun}
                          onChange={(e) => setBurgerBun(e.target.value)}
                          className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#F5F5F0] p-3 text-xs font-label-caps rounded-[2px] focus:outline-none"
                        >
                          <option value="Toasted Brioche Bun">Toasted Golden Brioche Bun</option>
                          <option value="Black Sesame Artisanal Bun">Black Charcoal Sesame Bun</option>
                          <option value="Lettuce Wrap (Low-Carb)">Lettuce Wrap (Low-Carb Gluten-Free)</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-label-caps text-xs text-[#D4AF37] block mb-2 tracking-wider">
                          3. BLACK ANGUS SMASH PATTIES
                        </label>
                        <div className="flex items-center justify-between bg-[#0A0A0A] border border-[#2A2A2A] p-2 rounded-[2px]">
                          <button
                            type="button"
                            onClick={() => {
                              if (burgerPatties > 1) {
                                playSound('click');
                                setBurgerPatties(burgerPatties - 1);
                              }
                            }}
                            disabled={burgerPatties <= 1}
                            className="w-8 h-8 bg-[#141414] hover:bg-[#2A2A2A] disabled:opacity-30 text-[#F5F5F0] flex items-center justify-center rounded-[2px] cursor-pointer"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-price-tag text-base text-[#D4AF37]">
                            {burgerPatties}x Patty ({burgerPatties * 90}g total)
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (burgerPatties < 4) {
                                playSound('click');
                                setBurgerPatties(burgerPatties + 1);
                              }
                            }}
                            disabled={burgerPatties >= 4}
                            className="w-8 h-8 bg-[#141414] hover:bg-[#2A2A2A] disabled:opacity-30 text-[#F5F5F0] flex items-center justify-center rounded-[2px] cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Cheese & Gourmet Add-ons */}
                    <div>
                      <label className="font-label-caps text-xs text-[#D4AF37] block mb-2 tracking-wider">
                        4. GOURMET TOPPINGS & SMOKED EXTRAS
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {burgerExtrasList.map((ext) => {
                          const isChecked = burgerExtras.includes(ext.name);
                          return (
                            <motion.button
                              key={ext.name}
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => toggleBurgerExtra(ext.name)}
                              className={`p-2.5 border rounded-[2px] flex items-center justify-between transition-all cursor-pointer ${
                                isChecked
                                  ? 'bg-[#1C1C1C] border-[#D4AF37] text-[#F5F5F0]'
                                  : 'bg-[#0A0A0A] border-[#2A2A2A] text-[#A0A0A0] hover:border-[#D4AF37]/50'
                              }`}
                            >
                              <span className="font-body-md text-xs truncate text-left">{ext.name}</span>
                              <div className="flex items-center gap-1.5 shrink-0 ml-1">
                                <span className="text-[10px] font-label-caps text-[#D4AF37]">+€{ext.price.toFixed(2)}</span>
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${isChecked ? 'bg-[#D4AF37] text-[#0A0A0A]' : 'bg-[#2A2A2A] text-transparent'}`}>
                                  ✓
                                </div>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Special Note to the Chef */}
              <div>
                <label className="font-label-caps text-xs text-[#D4AF37] block mb-2 tracking-wider">
                  5. NOTE TO KITCHEN / ALLERGIES
                </label>
                <input
                  type="text"
                  placeholder="e.g., Extra crispy crust, sauce on the side, no onions..."
                  value={chefNotes}
                  onChange={(e) => setChefNotes(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#F5F5F0] px-4 py-2.5 text-xs font-body-md rounded-[2px] focus:outline-none"
                />
              </div>

            </div>

            {/* Right Summary Card (4 cols) */}
            <motion.div
              layout
              className="lg:col-span-4 bg-[#0A0A0A] border border-[#D4AF37]/50 p-6 rounded-[2px] shadow-2xl relative sticky top-28"
            >
              <div className="flex items-center gap-2 mb-4 text-[#D4AF37]">
                <Award className="w-5 h-5" />
                <h3 className="font-label-caps text-sm uppercase font-bold tracking-wider">
                  CREATION SUMMARY
                </h3>
              </div>

              <div className="border-y border-[#2A2A2A] py-4 space-y-2.5 text-xs font-body-md text-[#A0A0A0]">
                <p>
                  <strong className="text-[#F5F5F0]">Type:</strong>{' '}
                  {baseType === 'pizza' ? 'Wood-Fired Pizza' : 'Smash Burger'}
                </p>
                {baseType === 'pizza' ? (
                  <>
                    <p><strong className="text-[#F5F5F0]">Crust:</strong> {pizzaCrust}</p>
                    <p><strong className="text-[#F5F5F0]">Sauce:</strong> {pizzaSauce}</p>
                    <p>
                      <strong className="text-[#F5F5F0]">Toppings:</strong>{' '}
                      {selectedToppings.length > 0 ? selectedToppings.join(', ') : 'Base cheese only'}
                    </p>
                  </>
                ) : (
                  <>
                    <p><strong className="text-[#F5F5F0]">Bun:</strong> {burgerBun}</p>
                    <p><strong className="text-[#F5F5F0]">Patties:</strong> {burgerPatties}x Angus (100% Beef)</p>
                    <p>
                      <strong className="text-[#F5F5F0]">Extras:</strong>{' '}
                      {burgerExtras.length > 0 ? burgerExtras.join(', ') : 'None'}
                    </p>
                  </>
                )}
                {chefNotes && (
                  <p className="text-[#D4AF37] italic">
                    <strong>Note:</strong> "{chefNotes}"
                  </p>
                )}
              </div>

              {/* Price & Submit */}
              <div className="pt-6">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-label-caps text-xs text-[#A0A0A0]">TOTAL ESTIMATED:</span>
                  <motion.span
                    key={totalPrice}
                    initial={{ scale: 1.1, color: '#F3E5AB' }}
                    animate={{ scale: 1, color: '#D4AF37' }}
                    className="font-price-tag text-3xl"
                  >
                    €{totalPrice.toFixed(2)}
                  </motion.span>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-[#D4AF37] hover:bg-[#E5C358] text-[#0A0A0A] font-bold font-label-caps text-xs py-4 tracking-[0.2em] transition-all red-brutal-shadow cursor-pointer flex items-center justify-center gap-2 rounded-[2px]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>ADD MASTERPIECE TO CART</span>
                </motion.button>
              </div>

            </motion.div>

          </form>

        </motion.div>

      </div>
    </section>
  );
};
