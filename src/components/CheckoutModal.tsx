import React, { useState, useEffect } from 'react';
import { X, CheckCircle, CreditCard, Banknote, ShieldCheck, Bike, Store, Clock, Phone, MapPin, Sparkles, Navigation } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';
import { playSound } from '../utils/sound';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  orderType: 'delivery' | 'pickup';
  promoDiscount: number;
  promoCode: string;
  tip: number;
  onOrderSuccess: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  orderType,
  promoDiscount,
  promoCode,
  tip,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [postalCode, setPostalCode] = useState('4420-001 Gondomar');
  const [paymentMethod, setPaymentMethod] = useState<'mbway' | 'card' | 'cash'>('mbway');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Order Placement & Live Tracking Simulation state
  const [orderPlaced, setOrderPlaced] = useState<OrderDetails | null>(null);
  const [trackerStep, setTrackerStep] = useState<number>(1);
  const [countdownMinutes, setCountdownMinutes] = useState<number>(28);

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = orderType === 'delivery' ? (subtotal >= 20 ? 0 : 2.50) : 0;
  const finalTotal = Math.max(0, subtotal - promoDiscount + deliveryFee + tip);

  // Live order tracker simulation timer
  useEffect(() => {
    if (!orderPlaced) return;

    const timer1 = setTimeout(() => {
      setTrackerStep(2); // In the oven / grill
      playSound('bell');
    }, 4500);

    const timer2 = setTimeout(() => {
      setTrackerStep(3); // Out with courier
      playSound('bell');
    }, 9500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [orderPlaced]);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('success');

    const generatedOrderId = Math.floor(100000 + Math.random() * 900000).toString();
    const newOrder: OrderDetails = {
      orderId: generatedOrderId,
      items: [...cart],
      customerName,
      customerPhone,
      deliveryAddress: orderType === 'delivery' ? `${deliveryAddress}, ${postalCode}` : 'Store Pickup (Gondomar)',
      orderType,
      subtotal,
      deliveryFee,
      discount: promoDiscount,
      tip,
      total: finalTotal,
      paymentMethod,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'received',
      estimatedMinutes: orderType === 'delivery' ? 28 : 15,
    };

    setOrderPlaced(newOrder);
    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#141414] border border-[#D4AF37]/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2px] shadow-2xl relative">
        
        {/* Header */}
        <div className="p-5 bg-[#111111] border-b border-[#2A2A2A] flex items-center justify-between">
          <div className="flex items-center gap-2">
            {orderPlaced ? (
              <Navigation className="w-5 h-5 text-[#D4AF37] animate-pulse" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            )}
            <h2 className="font-display-lg text-lg text-[#F5F5F0] uppercase tracking-wider">
              {orderPlaced ? 'LIVE ORDER STATUS' : 'EXPRESS CHECKOUT'}
            </h2>
          </div>
          
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="p-1 text-[#A0A0A0] hover:text-[#D4AF37] transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        {!orderPlaced ? (
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
            
            {/* Contact Details */}
            <div>
              <h3 className="font-label-caps text-xs text-[#D4AF37] tracking-wider mb-3">
                1. CONTACT INFORMATION
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-label-caps text-[11px] text-[#A0A0A0] block mb-1">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Manuel Silva"
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#F5F5F0] px-3.5 py-2.5 text-xs font-body-md rounded-[2px] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-label-caps text-[11px] text-[#A0A0A0] block mb-1">
                    PHONE NUMBER (FOR COURIER / MBWAY) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 912 345 678"
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#F5F5F0] px-3.5 py-2.5 text-xs font-body-md rounded-[2px] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Delivery or Pickup Address */}
            {orderType === 'delivery' ? (
              <div>
                <h3 className="font-label-caps text-xs text-[#D4AF37] tracking-wider mb-3">
                  2. DELIVERY DESTINATION (GONDOMAR & SURROUNDINGS)
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="font-label-caps text-[11px] text-[#A0A0A0] block mb-1">
                      STREET ADDRESS, DOOR & FLOOR *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="e.g. Rua 25 de Abril, nº 142, 3º Dto"
                      className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#F5F5F0] px-3.5 py-2.5 text-xs font-body-md rounded-[2px] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-label-caps text-[11px] text-[#A0A0A0] block mb-1">
                        POSTAL CODE / PARISH
                      </label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#F5F5F0] px-3.5 py-2.5 text-xs font-body-md rounded-[2px] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-label-caps text-[11px] text-[#A0A0A0] block mb-1">
                        COURIER ENTRY INSTRUCTIONS (OPTIONAL)
                      </label>
                      <input
                        type="text"
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        placeholder="e.g. Code 4192, ring bell Silva"
                        className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#F5F5F0] px-3.5 py-2.5 text-xs font-body-md rounded-[2px] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#0A0A0A] p-4 border border-[#2A2A2A] rounded-[2px]">
                <p className="font-menu-item-title text-sm text-[#F5F5F0] flex items-center gap-2">
                  <Store className="w-4 h-4 text-[#D4AF37]" />
                  Store Pickup Selected
                </p>
                <p className="text-xs text-[#A0A0A0] mt-1">
                  Fresh Bites Gondomar: Avenida Gen. Humberto Delgado 409B, Gondomar. Ready in ~15 mins.
                </p>
              </div>
            )}

            {/* Payment Method Selector */}
            <div>
              <h3 className="font-label-caps text-xs text-[#D4AF37] tracking-wider mb-3">
                3. SECURE PAYMENT METHOD
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setPaymentMethod('mbway');
                  }}
                  className={`p-3.5 text-center border rounded-[2px] transition-all cursor-pointer ${
                    paymentMethod === 'mbway'
                      ? 'bg-[#1C1C1C] border-[#D4AF37] text-[#D4AF37]'
                      : 'bg-[#0A0A0A] border-[#2A2A2A] text-[#A0A0A0] hover:border-[#D4AF37]/50'
                  }`}
                >
                  <span className="font-price-tag text-sm block">MB WAY</span>
                  <span className="text-[10px] font-body-md text-[#8E8E8E]">Instant Prompt</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setPaymentMethod('card');
                  }}
                  className={`p-3.5 text-center border rounded-[2px] transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-[#1C1C1C] border-[#D4AF37] text-[#D4AF37]'
                      : 'bg-[#0A0A0A] border-[#2A2A2A] text-[#A0A0A0] hover:border-[#D4AF37]/50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1" />
                  <span className="font-label-caps text-xs block">Card / Multibanco</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setPaymentMethod('cash');
                  }}
                  className={`p-3.5 text-center border rounded-[2px] transition-all cursor-pointer ${
                    paymentMethod === 'cash'
                      ? 'bg-[#1C1C1C] border-[#D4AF37] text-[#D4AF37]'
                      : 'bg-[#0A0A0A] border-[#2A2A2A] text-[#A0A0A0] hover:border-[#D4AF37]/50'
                  }`}
                >
                  <Banknote className="w-4 h-4 mx-auto mb-1" />
                  <span className="font-label-caps text-xs block">Cash on Delivery</span>
                </button>
              </div>
            </div>

            {/* Total Summary & Confirm Button */}
            <div className="pt-4 border-t border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left w-full sm:w-auto">
                <span className="font-label-caps text-xs text-[#A0A0A0]">AMOUNT TO PAY:</span>
                <div className="font-price-tag text-2xl text-[#D4AF37]">
                  €{finalTotal.toFixed(2)}
                </div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#E5C358] text-[#0A0A0A] font-bold font-label-caps text-xs py-4 px-8 tracking-[0.2em] transition-all red-brutal-shadow cursor-pointer rounded-[2px]"
              >
                PLACE ORDER NOW
              </button>
            </div>

          </form>
        ) : (
          /* Live Tracking Simulation View */
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Top confirmation banner */}
            <div className="bg-[#1C1C1C] border border-[#D4AF37]/40 p-5 rounded-[2px] text-center space-y-2">
              <div className="w-12 h-12 bg-[#D4AF37] text-[#0A0A0A] rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle className="w-7 h-7" />
              </div>
              <span className="font-label-caps text-xs text-[#D4AF37] tracking-widest block">
                ORDER #{orderPlaced.orderId} RECEIVED
              </span>
              <h3 className="font-display-lg text-2xl text-[#F5F5F0] uppercase">
                Preparing in Gondomar Hearth
              </h3>
              <p className="font-body-md text-xs text-[#A0A0A0]">
                Estimated Delivery: <strong className="text-[#D4AF37]">{countdownMinutes} minutes</strong> to {orderPlaced.deliveryAddress}
              </p>
            </div>

            {/* 3-Step Live Tracker */}
            <div className="space-y-4 pt-2">
              <h4 className="font-label-caps text-xs text-[#A0A0A0] tracking-wider">
                LIVE KITCHEN PROGRESS:
              </h4>

              <div className="space-y-3">
                {/* Step 1: Order Confirmed */}
                <div className={`p-3.5 border rounded-[2px] flex items-center justify-between transition-all ${
                  trackerStep >= 1
                    ? 'bg-[#0A0A0A] border-[#D4AF37] text-[#F5F5F0]'
                    : 'bg-[#141414] border-[#2A2A2A] text-[#8E8E8E]'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      trackerStep >= 1 ? 'bg-[#D4AF37] text-[#0A0A0A]' : 'bg-[#2A2A2A] text-[#8E8E8E]'
                    }`}>
                      1
                    </div>
                    <div>
                      <p className="font-menu-item-title text-sm">Order Accepted & Ticket Printed</p>
                      <p className="text-[11px] text-[#A0A0A0]">Ingredients prepped by the chef</p>
                    </div>
                  </div>
                  {trackerStep >= 1 && <span className="font-label-caps text-[10px] text-[#4ADE80]">DONE</span>}
                </div>

                {/* Step 2: Wood Fired / Grill */}
                <div className={`p-3.5 border rounded-[2px] flex items-center justify-between transition-all ${
                  trackerStep >= 2
                    ? 'bg-[#0A0A0A] border-[#D4AF37] text-[#F5F5F0]'
                    : 'bg-[#141414] border-[#2A2A2A] text-[#8E8E8E]'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      trackerStep >= 2 ? 'bg-[#D4AF37] text-[#0A0A0A]' : 'bg-[#2A2A2A] text-[#8E8E8E]'
                    }`}>
                      2
                    </div>
                    <div>
                      <p className="font-menu-item-title text-sm">Baking in 450°C Hearth / Flat Top</p>
                      <p className="text-[11px] text-[#A0A0A0]">Crisping crust and caramelizing smash</p>
                    </div>
                  </div>
                  {trackerStep === 2 && (
                    <span className="font-label-caps text-[10px] text-[#D4AF37] animate-pulse">IN OVEN...</span>
                  )}
                  {trackerStep > 2 && <span className="font-label-caps text-[10px] text-[#4ADE80]">DONE</span>}
                </div>

                {/* Step 3: Courier Delivery */}
                <div className={`p-3.5 border rounded-[2px] flex items-center justify-between transition-all ${
                  trackerStep >= 3
                    ? 'bg-[#0A0A0A] border-[#D4AF37] text-[#F5F5F0]'
                    : 'bg-[#141414] border-[#2A2A2A] text-[#8E8E8E]'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      trackerStep >= 3 ? 'bg-[#D4AF37] text-[#0A0A0A]' : 'bg-[#2A2A2A] text-[#8E8E8E]'
                    }`}>
                      3
                    </div>
                    <div>
                      <p className="font-menu-item-title text-sm">Courier en Route</p>
                      <p className="text-[11px] text-[#A0A0A0]">Hot thermal bag dispatch across Gondomar</p>
                    </div>
                  </div>
                  {trackerStep === 3 && (
                    <span className="font-label-caps text-[10px] text-[#4ADE80] animate-bounce">ON THE WAY!</span>
                  )}
                </div>
              </div>
            </div>

            {/* Order Items Summary */}
            <div className="bg-[#0A0A0A] p-4 border border-[#2A2A2A] rounded-[2px] space-y-2 text-xs font-body-md text-[#A0A0A0]">
              <p className="font-label-caps text-[11px] text-[#F5F5F0] border-b border-[#2A2A2A] pb-1">
                SUMMARY FOR {customerName.toUpperCase()}:
              </p>
              {orderPlaced.items.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{item.quantity}x {item.menuItem.name}</span>
                  <span className="font-price-tag text-[#F5F5F0]">€{item.totalPrice.toFixed(2)}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-[#2A2A2A] flex justify-between font-price-tag text-sm text-[#D4AF37]">
                <span>TOTAL PAID ({paymentMethod.toUpperCase()}):</span>
                <span>€{orderPlaced.total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="w-full bg-[#D4AF37] hover:bg-[#E5C358] text-[#0A0A0A] font-bold font-label-caps text-xs py-3.5 rounded-[2px] transition-all cursor-pointer tracking-wider"
            >
              RETURN TO FRESH BITES
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
