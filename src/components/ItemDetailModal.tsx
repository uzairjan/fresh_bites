import React, { useState } from 'react';
import { X, Plus, Minus, Check, Flame, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';
import { playSound } from '../utils/sound';

interface ItemDetailModalProps {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    quantity: number,
    size?: string,
    crust?: string,
    spice?: string,
    addedToppings?: { name: string; price: number }[],
    removedIngredients?: string[],
    notes?: string
  ) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>(
    item.customizationOptions?.sizes ? item.customizationOptions.sizes[0].name : ''
  );
  const [selectedCrust, setSelectedCrust] = useState<string>(
    item.customizationOptions?.crusts ? item.customizationOptions.crusts[0].name : ''
  );
  const spicinessList = item.customizationOptions?.spiciness || item.customizationOptions?.spicinessLevels;
  const toppingsList = item.customizationOptions?.extraToppings || item.customizationOptions?.addExtraToppings;
  const removableList = item.customizationOptions?.removableIngredients || item.customizationOptions?.removeIngredients;

  const [selectedSpice, setSelectedSpice] = useState<string>(
    spicinessList ? spicinessList[0] : ''
  );
  const [selectedToppings, setSelectedToppings] = useState<{ name: string; price: number }[]>([]);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [specialNotes, setSpecialNotes] = useState('');

  // Calculate dynamic price
  const sizeMultiplier =
    item.customizationOptions?.sizes?.find((s) => s.name === selectedSize)?.priceMultiplier || 1.0;
  const crustExtra =
    item.customizationOptions?.crusts?.find((c) => c.name === selectedCrust)?.extraPrice || 0;
  const toppingsTotal = selectedToppings.reduce((sum, t) => sum + t.price, 0);

  const unitPrice = (item.price * sizeMultiplier) + crustExtra + toppingsTotal;
  const totalPrice = unitPrice * quantity;

  const handleToppingToggle = (topping: { name: string; price: number }) => {
    playSound('click');
    if (selectedToppings.some((t) => t.name === topping.name)) {
      setSelectedToppings(selectedToppings.filter((t) => t.name !== topping.name));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleRemovedToggle = (ingredient: string) => {
    playSound('click');
    if (removedIngredients.includes(ingredient)) {
      setRemovedIngredients(removedIngredients.filter((i) => i !== ingredient));
    } else {
      setRemovedIngredients([...removedIngredients, ingredient]);
    }
  };

  const handleConfirm = () => {
    playSound('add');
    onAddToCart(
      item,
      quantity,
      selectedSize || undefined,
      selectedCrust || undefined,
      selectedSpice || undefined,
      selectedToppings.length > 0 ? selectedToppings : undefined,
      removedIngredients.length > 0 ? removedIngredients : undefined,
      specialNotes.trim() || undefined
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#141414] border border-[#D4AF37]/50 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[2px] shadow-2xl relative">
        
        {/* Header / Hero Image */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-[#0A0A0A]">
          <img
            src={item.image}
            alt={item.altText}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />
          
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="absolute top-4 right-4 bg-[#0A0A0A]/80 hover:bg-[#D4AF37] hover:text-[#0A0A0A] p-2 text-[#F5F5F0] rounded-full transition-colors cursor-pointer border border-[#2A2A2A]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="font-label-caps text-[10px] text-[#D4AF37] tracking-wider uppercase bg-[#0A0A0A]/90 px-2.5 py-1 border border-[#D4AF37]/40 mb-1.5 inline-block">
              {item.categoryLabel}
            </span>
            <h2 className="font-menu-item-title text-2xl text-[#F5F5F0]">
              {item.name}
            </h2>
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 space-y-6">
          <p className="font-body-md text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
            {item.description}
          </p>

          {/* Size Selection (if available) */}
          {item.customizationOptions?.sizes && (
            <div>
              <label className="font-label-caps text-xs text-[#D4AF37] block mb-2 tracking-wider">
                CHOOSE SIZE
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {item.customizationOptions.sizes.map((size) => (
                  <button
                    key={size.name}
                    type="button"
                    onClick={() => {
                      playSound('click');
                      setSelectedSize(size.name);
                    }}
                    className={`p-3 text-left border rounded-[2px] transition-all cursor-pointer ${
                      selectedSize === size.name
                        ? 'bg-[#1C1C1C] border-[#D4AF37] text-[#D4AF37]'
                        : 'bg-[#0A0A0A] border-[#2A2A2A] text-[#A0A0A0] hover:border-[#D4AF37]/40'
                    }`}
                  >
                    <div className="font-label-caps text-xs">{size.name}</div>
                    <div className="font-body-md text-[11px] text-[#8E8E8E] mt-0.5">{size.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Crust Selection (for pizza) */}
          {item.customizationOptions?.crusts && (
            <div>
              <label className="font-label-caps text-xs text-[#D4AF37] block mb-2 tracking-wider">
                WOOD-FIRED CRUST TYPE
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {item.customizationOptions.crusts.map((crust) => (
                  <button
                    key={crust.name}
                    type="button"
                    onClick={() => {
                      playSound('click');
                      setSelectedCrust(crust.name);
                    }}
                    className={`p-3 text-left border rounded-[2px] transition-all cursor-pointer ${
                      selectedCrust === crust.name
                        ? 'bg-[#1C1C1C] border-[#D4AF37] text-[#D4AF37]'
                        : 'bg-[#0A0A0A] border-[#2A2A2A] text-[#A0A0A0] hover:border-[#D4AF37]/40'
                    }`}
                  >
                    <div className="font-label-caps text-xs">{crust.name}</div>
                    {crust.extraPrice > 0 && (
                      <div className="text-[10px] text-[#D4AF37] mt-0.5">
                        +€{crust.extraPrice.toFixed(2)}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Spiciness Level (for shawarma/burgers) */}
          {spicinessList && spicinessList.length > 0 && (
            <div>
              <label className="font-label-caps text-xs text-[#D4AF37] block mb-2 tracking-wider">
                SPICINESS LEVEL
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {spicinessList.map((spice) => (
                  <button
                    key={spice}
                    type="button"
                    onClick={() => {
                      playSound('click');
                      setSelectedSpice(spice);
                    }}
                    className={`p-2.5 text-center font-label-caps text-xs border rounded-[2px] transition-all cursor-pointer ${
                      selectedSpice === spice
                        ? 'bg-[#1C1C1C] border-[#D4AF37] text-[#D4AF37]'
                        : 'bg-[#0A0A0A] border-[#2A2A2A] text-[#A0A0A0] hover:border-[#D4AF37]/40'
                    }`}
                  >
                    {spice}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extra Toppings */}
          {toppingsList && toppingsList.length > 0 && (
            <div>
              <label className="font-label-caps text-xs text-[#D4AF37] block mb-2 tracking-wider">
                ADD EXTRA TOPPINGS
              </label>
              <div className="grid grid-cols-2 gap-2">
                {toppingsList.map((top) => {
                  const isChecked = selectedToppings.some((t) => t.name === top.name);
                  return (
                    <button
                      key={top.name}
                      type="button"
                      onClick={() => handleToppingToggle(top)}
                      className={`p-2.5 border rounded-[2px] flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#1C1C1C] border-[#D4AF37] text-[#F5F5F0]'
                          : 'bg-[#0A0A0A] border-[#2A2A2A] text-[#A0A0A0] hover:border-[#D4AF37]/40'
                      }`}
                    >
                      <span className="font-body-md text-xs truncate">{top.name}</span>
                      <span className="font-label-caps text-[10px] text-[#D4AF37]">
                        +€{top.price.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Remove Ingredients */}
          {removableList && removableList.length > 0 && (
            <div>
              <label className="font-label-caps text-xs text-[#A0A0A0] block mb-2 tracking-wider">
                PREFER WITHOUT (EXCLUDE)
              </label>
              <div className="flex flex-wrap gap-2">
                {removableList.map((ing) => {
                  const isRemoved = removedIngredients.includes(ing);
                  return (
                    <button
                      key={ing}
                      type="button"
                      onClick={() => handleRemovedToggle(ing)}
                      className={`font-label-caps text-xs px-3 py-1.5 border rounded-[2px] transition-all cursor-pointer ${
                        isRemoved
                          ? 'bg-[#8B1E1E] border-[#D4AF37] text-white'
                          : 'bg-[#0A0A0A] border-[#2A2A2A] text-[#A0A0A0]'
                      }`}
                    >
                      {isRemoved ? `✕ No ${ing}` : `Keep ${ing}`}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Kitchen Instructions */}
          <div>
            <label className="font-label-caps text-xs text-[#D4AF37] block mb-1.5 tracking-wider">
              SPECIAL REQUESTS / INSTRUCTIONS
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="e.g. Well done crust, sauce on the side..."
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#F5F5F0] px-3.5 py-2.5 text-xs font-body-md rounded-[2px] focus:outline-none"
            />
          </div>

          {/* Quantity & Add Action */}
          <div className="pt-4 border-t border-[#2A2A2A] flex items-center justify-between gap-4">
            
            {/* Quantity Stepper */}
            <div className="flex items-center bg-[#0A0A0A] border border-[#2A2A2A] rounded-[2px] p-1">
              <button
                type="button"
                onClick={() => {
                  if (quantity > 1) {
                    playSound('click');
                    setQuantity(quantity - 1);
                  }
                }}
                className="w-9 h-9 flex items-center justify-center text-[#F5F5F0] hover:text-[#D4AF37] disabled:opacity-30 cursor-pointer"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-price-tag text-lg px-4 text-[#D4AF37]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  setQuantity(quantity + 1);
                }}
                className="w-9 h-9 flex items-center justify-center text-[#F5F5F0] hover:text-[#D4AF37] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Submit Add to Cart */}
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 bg-[#D4AF37] hover:bg-[#E5C358] text-[#0A0A0A] font-bold font-label-caps text-xs py-4 px-6 tracking-[0.2em] transition-all red-brutal-shadow cursor-pointer flex items-center justify-between rounded-[2px]"
            >
              <span>ADD TO ORDER</span>
              <span className="font-price-tag text-sm">€{totalPrice.toFixed(2)}</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
