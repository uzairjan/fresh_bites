import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Bike, Store, Sparkles, Check } from 'lucide-react';
import { CartItem } from '../types';
import { playSound } from '../utils/sound';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: (
    orderType: 'delivery' | 'pickup',
    promoDiscount: number,
    promoCode: string,
    tip: number
  ) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [tip, setTip] = useState(0);

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = orderType === 'delivery' ? (subtotal >= 20 ? 0 : 2.50) : 0;
  const discountAmount = appliedPromo ? (subtotal * appliedPromo.discountPercent) / 100 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee + tip);

  const freeDeliveryThreshold = 20;
  const progressToFreeDelivery = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoInput.trim().toUpperCase();

    if (code === 'FRESH10' || code === 'GONDOMAR10') {
      playSound('success');
      setAppliedPromo({ code, discountPercent: 10 });
      setPromoInput('');
    } else if (code === 'CHEF20' && subtotal >= 30) {
      playSound('success');
      setAppliedPromo({ code, discountPercent: 20 });
      setPromoInput('');
    } else {
      playSound('error');
      setPromoError('Invalid coupon or minimum €30 not met for CHEF20');
    }
  };

  const handleCheckoutClick = () => {
    playSound('click');
    onProceedToCheckout(orderType, discountAmount, appliedPromo ? appliedPromo.code : '', tip);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => {
          playSound('click');
          onClose();
        }}
        className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#111111] border-l border-[#2A2A2A] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 bg-[#141414] border-b border-[#2A2A2A] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="font-display-lg text-lg text-[#F5F5F0] uppercase tracking-wider">
                YOUR ORDER ({cart.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
            </div>
            <div className="flex items-center gap-3">
              {cart.length > 0 && (
                <button
                  onClick={() => {
                    playSound('click');
                    onClearCart();
                  }}
                  className="text-[11px] font-label-caps text-[#8E8E8E] hover:text-[#F87171] transition-colors"
                >
                  CLEAR
                </button>
              )}
              <button
                onClick={() => {
                  playSound('click');
                  onClose();
                }}
                className="p-1 text-[#A0A0A0] hover:text-[#D4AF37] transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Delivery or Pickup Toggle */}
          <div className="p-4 bg-[#0A0A0A] border-b border-[#2A2A2A]">
            <div className="grid grid-cols-2 gap-2 bg-[#141414] p-1 border border-[#2A2A2A] rounded-[2px]">
              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  setOrderType('delivery');
                }}
                className={`py-2 text-xs font-label-caps rounded-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  orderType === 'delivery'
                    ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold shadow-md'
                    : 'text-[#A0A0A0] hover:text-[#F5F5F0]'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>DELIVERY (GONDOMAR)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  setOrderType('pickup');
                }}
                className={`py-2 text-xs font-label-caps rounded-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  orderType === 'pickup'
                    ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold shadow-md'
                    : 'text-[#A0A0A0] hover:text-[#F5F5F0]'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>STORE PICKUP</span>
              </button>
            </div>

            {/* Free Delivery Bar for Gondomar */}
            {orderType === 'delivery' && (
              <div className="mt-3">
                <div className="flex justify-between text-[11px] font-label-caps text-[#A0A0A0] mb-1">
                  <span>
                    {subtotal >= freeDeliveryThreshold
                      ? '✓ FREE DELIVERY UNLOCKED!'
                      : `Add €${(freeDeliveryThreshold - subtotal).toFixed(2)} for Free Delivery`}
                  </span>
                  <span className="text-[#D4AF37]">{Math.round(progressToFreeDelivery)}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#141414] rounded-full overflow-hidden border border-[#2A2A2A]">
                  <div
                    className="h-full bg-[#D4AF37] transition-all duration-500"
                    style={{ width: `${progressToFreeDelivery}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 divide-y divide-[#2A2A2A]/50">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 bg-[#141414] border border-[#2A2A2A] rounded-full flex items-center justify-center text-[#D4AF37] mx-auto">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <p className="font-menu-item-title text-base text-[#F5F5F0]">
                  Your cart is currently empty
                </p>
                <p className="font-body-md text-xs text-[#A0A0A0] max-w-xs mx-auto">
                  Explore our wood-fired pizzas, smash burgers, or custom Craving Studio creations.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId} className="pt-3.5 first:pt-0 flex gap-3">
                  {/* Thumbnail */}
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.altText}
                    className="w-16 h-16 rounded-[2px] object-cover border border-[#2A2A2A] shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-menu-item-title text-sm text-[#F5F5F0] truncate">
                        {item.menuItem.name}
                      </h4>
                      <button
                        onClick={() => {
                          playSound('click');
                          onRemoveItem(item.cartItemId);
                        }}
                        className="text-[#8E8E8E] hover:text-[#F87171] p-1 ml-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Customization Details List */}
                    <div className="text-[11px] font-body-md text-[#A0A0A0] mt-0.5 space-y-0.5">
                      {item.selectedSize && <div>Size: {item.selectedSize}</div>}
                      {item.selectedCrust && <div>Crust: {item.selectedCrust}</div>}
                      {item.selectedSpice && <div>Spice: {item.selectedSpice}</div>}
                      {item.addedToppings && item.addedToppings.length > 0 && (
                        <div>
                          + Toppings: {item.addedToppings.map((t) => t.name).join(', ')}
                        </div>
                      )}
                      {item.removedIngredients && item.removedIngredients.length > 0 && (
                        <div className="text-[#8B1E1E]">
                          ✕ Without: {item.removedIngredients.join(', ')}
                        </div>
                      )}
                      {item.specialNotes && (
                        <div className="italic text-[#D4AF37]">
                          Note: "{item.specialNotes}"
                        </div>
                      )}
                    </div>

                    {/* Quantity & Item Total Price */}
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center bg-[#0A0A0A] border border-[#2A2A2A] rounded-[2px]">
                        <button
                          onClick={() => {
                            playSound('click');
                            onUpdateQuantity(item.cartItemId, item.quantity - 1);
                          }}
                          className="w-6 h-6 flex items-center justify-center text-[#A0A0A0] hover:text-[#F5F5F0]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-price-tag text-xs px-2 text-[#D4AF37]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            playSound('click');
                            onUpdateQuantity(item.cartItemId, item.quantity + 1);
                          }}
                          className="w-6 h-6 flex items-center justify-center text-[#A0A0A0] hover:text-[#F5F5F0]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-price-tag text-sm text-[#D4AF37]">
                        €{item.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout & Subtotals Area */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#141414] border-t border-[#2A2A2A] space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#D4AF37] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Coupon (e.g. FRESH10)"
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#F5F5F0] pl-8 pr-3 py-2 text-xs font-label-caps rounded-[2px] focus:outline-none uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#0A0A0A] border border-[#D4AF37] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#0A0A0A] font-label-caps text-xs px-3.5 py-2 transition-all rounded-[2px] cursor-pointer"
                >
                  APPLY
                </button>
              </form>

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs font-label-caps text-[#4ADE80] bg-[#4ADE80]/10 p-2 border border-[#4ADE80]/30 rounded-[2px]">
                  <span>PROMO {appliedPromo.code} ({appliedPromo.discountPercent}% OFF)</span>
                  <button onClick={() => setAppliedPromo(null)} className="text-[#A0A0A0] hover:text-white">✕</button>
                </div>
              )}

              {promoError && (
                <p className="text-[11px] font-body-md text-[#F87171]">{promoError}</p>
              )}

              {/* Courier Tip Selector */}
              <div>
                <span className="font-label-caps text-[10px] text-[#A0A0A0] block mb-1">
                  SUPPORT GONDOMAR COURIER (OPTIONAL TIP):
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {[0, 1.0, 2.0, 3.5].map((tVal) => (
                    <button
                      key={tVal}
                      type="button"
                      onClick={() => {
                        playSound('click');
                        setTip(tVal);
                      }}
                      className={`py-1 text-[11px] font-label-caps rounded-[2px] border transition-all cursor-pointer ${
                        tip === tVal
                          ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0A0A0A] font-bold'
                          : 'bg-[#0A0A0A] border-[#2A2A2A] text-[#A0A0A0] hover:border-[#D4AF37]/50'
                      }`}
                    >
                      {tVal === 0 ? 'None' : `+€${tVal.toFixed(2)}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs font-body-md text-[#A0A0A0] pt-2 border-t border-[#2A2A2A]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-price-tag text-[#F5F5F0]">€{subtotal.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-[#4ADE80]">
                    <span>Discount</span>
                    <span className="font-price-tag">-€{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery (Gondomar)</span>
                    <span className="font-price-tag text-[#F5F5F0]">
                      {deliveryFee === 0 ? <strong className="text-[#4ADE80]">FREE</strong> : `€${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                )}

                {tip > 0 && (
                  <div className="flex justify-between">
                    <span>Courier Tip</span>
                    <span className="font-price-tag text-[#D4AF37]">€{tip.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-price-tag text-[#F5F5F0] pt-2 border-t border-[#2A2A2A]">
                  <span className="font-display-lg uppercase text-sm">TOTAL AMOUNT</span>
                  <span className="text-xl text-[#D4AF37]">€{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={handleCheckoutClick}
                className="w-full bg-[#D4AF37] hover:bg-[#E5C358] text-[#0A0A0A] font-bold font-label-caps text-xs py-4 tracking-[0.2em] transition-all red-brutal-shadow cursor-pointer flex items-center justify-center gap-2 rounded-[2px]"
              >
                <span>CONTINUE TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
