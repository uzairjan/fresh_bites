import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoriesBanner } from './components/CategoriesBanner';
import { SpecialsSection } from './components/SpecialsSection';
import { MenuSection } from './components/MenuSection';
import { SpecialDealsSection } from './components/SpecialDealsSection';
import { CustomBuilderModal } from './components/CustomBuilderModal';
import { ItemDetailModal } from './components/ItemDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { TableReservationModal } from './components/TableReservationModal';
import { StoryAndReviews } from './components/StoryAndReviews';
import { Footer } from './components/Footer';
import { MENU_ITEMS, SPECIAL_DEALS } from './data/menuData';
import { MenuItem, SpecialDeal, CartItem, OrderDetails, ActiveTab } from './types';
import { playSound } from './utils/sound';
import { ShoppingBag, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Persistent Cart in LocalStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('fresh_bites_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('fresh_bites_cart', JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  // Modals & Drawers state
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [checkoutOrderType, setCheckoutOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [checkoutPromoDiscount, setCheckoutPromoDiscount] = useState(0);
  const [checkoutPromoCode, setCheckoutPromoCode] = useState('');
  const [checkoutTip, setCheckoutTip] = useState(0);

  // Toast Notification state
  const [toast, setToast] = useState<{ message: string; sub?: string } | null>(null);

  const showToast = (message: string, sub?: string) => {
    setToast({ message, sub });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Quick Add Item
  const handleQuickAdd = (item: MenuItem) => {
    const cartItemId = `${item.id}-${Date.now()}`;
    const newCartItem: CartItem = {
      cartItemId,
      menuItem: item,
      quantity: 1,
      unitPrice: item.price,
      totalPrice: item.price,
    };

    setCart((prev) => {
      // Check if standard item already in cart without customizations
      const existingIndex = prev.findIndex(
        (c) => c.menuItem.id === item.id && !c.selectedCrust && !c.selectedSize && (!c.addedToppings || c.addedToppings.length === 0)
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const existing = updated[existingIndex];
        const newQty = existing.quantity + 1;
        updated[existingIndex] = {
          ...existing,
          quantity: newQty,
          totalPrice: existing.unitPrice * newQty,
        };
        return updated;
      }
      return [...prev, newCartItem];
    });

    showToast(`Added ${item.name} to cart`, `€${item.price.toFixed(2)}`);
  };

  // Add Item with Full Customization
  const handleAddToCartWithCustomization = (
    item: MenuItem,
    quantity: number,
    size?: string,
    crust?: string,
    spice?: string,
    addedToppings?: { name: string; price: number }[],
    removedIngredients?: string[],
    notes?: string
  ) => {
    const sizeMultiplier = item.customizationOptions?.sizes?.find((s) => s.name === size)?.priceMultiplier || 1.0;
    const crustExtra = item.customizationOptions?.crusts?.find((c) => c.name === crust)?.extraPrice || 0;
    const toppingsTotal = addedToppings ? addedToppings.reduce((sum, t) => sum + t.price, 0) : 0;
    
    const unitPrice = (item.price * sizeMultiplier) + crustExtra + toppingsTotal;
    const totalPrice = unitPrice * quantity;

    const newCartItem: CartItem = {
      cartItemId: `${item.id}-${Date.now()}`,
      menuItem: item,
      quantity,
      selectedSize: size,
      selectedCrust: crust,
      selectedSpice: spice,
      addedToppings,
      removedIngredients,
      specialNotes: notes,
      unitPrice,
      totalPrice,
    };

    setCart((prev) => [...prev, newCartItem]);
    showToast(`Customized ${item.name} added!`, `${quantity}x • €${totalPrice.toFixed(2)}`);
  };

  // Add Custom Creation from Builder Studio
  const handleAddCustomFromBuilder = (customItem: MenuItem, notes: string) => {
    const newCartItem: CartItem = {
      cartItemId: `custom-${Date.now()}`,
      menuItem: customItem,
      quantity: 1,
      specialNotes: notes,
      unitPrice: customItem.price,
      totalPrice: customItem.price,
    };

    setCart((prev) => [...prev, newCartItem]);
    showToast(`Masterpiece "${customItem.name}" added to cart!`, `€${customItem.price.toFixed(2)}`);
  };

  // Claim Deal Combo
  const handleClaimDeal = (deal: SpecialDeal) => {
    const dealMenuItem: MenuItem = {
      id: deal.id,
      number: 88,
      name: deal.title,
      category: 'sides',
      categoryLabel: 'Combo Deal',
      price: deal.price,
      originalPrice: deal.originalPrice,
      description: `${deal.tagline} • Includes: ${deal.itemsIncluded.join(', ')}`,
      image: deal.image,
      altText: deal.title,
      prepTimeMinutes: 18,
      tags: ['Combo Deal', 'Special Feast'],
    };

    const newCartItem: CartItem = {
      cartItemId: `deal-${Date.now()}`,
      menuItem: dealMenuItem,
      quantity: 1,
      unitPrice: deal.price,
      totalPrice: deal.price,
    };

    setCart((prev) => [...prev, newCartItem]);
    showToast(`Claimed ${deal.title}!`, `Saved €${deal.savings.toFixed(2)} • €${deal.price.toFixed(2)}`);
  };

  // Cart Operations
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQty, totalPrice: item.unitPrice * newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleProceedToCheckout = (
    orderType: 'delivery' | 'pickup',
    promoDiscount: number,
    promoCode: string,
    tip: number
  ) => {
    setCheckoutOrderType(orderType);
    setCheckoutPromoDiscount(promoDiscount);
    setCheckoutPromoCode(promoCode);
    setCheckoutTip(tip);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: OrderDetails) => {
    // Clear cart once order is placed
    setCart([]);
    showToast(`Order #${order.orderId} Placed!`, `Estimated: 28 mins in Gondomar`);
  };

  // Selectors for Bento Grid specials
  const godfatherPizza = MENU_ITEMS.find((i) => i.id === 'pizza-godfather') || MENU_ITEMS[0];
  const doubleSmashBurger = MENU_ITEMS.find((i) => i.id === 'burger-double-smash') || MENU_ITEMS[5];
  const loadedShawarmaFries = MENU_ITEMS.find((i) => i.id === 'side-loaded-shawarma-fries') || MENU_ITEMS[12];

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#0A0A0A] text-[#F5F5F0] relative z-0 selection:bg-[#D4AF37] selection:text-[#0A0A0A]">
      
      {/* Ambient Noise Chalkboard Texture */}
      <div className="bg-chalkboard fixed inset-0 z-[-1] pointer-events-none" />

      {/* Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        setIsReservationOpen={setIsReservationOpen}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20">
        
        {/* Hero Section */}
        <Hero
          onOrderClick={() => {
            const menuEl = document.getElementById('menu');
            if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
          }}
          onViewMenuClick={() => {
            const menuEl = document.getElementById('menu');
            if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenBuilder={() => {
            const builderEl = document.getElementById('builder');
            if (builderEl) builderEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Why Us & Category Navigation Strip */}
        <CategoriesBanner
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            const menuEl = document.getElementById('menu');
            if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Bento Grid: Today's Specials */}
        <SpecialsSection
          godfatherPizza={godfatherPizza}
          doubleSmashBurger={doubleSmashBurger}
          loadedShawarmaFries={loadedShawarmaFries}
          onSelectItem={(item) => setCustomizingItem(item)}
          onQuickAdd={handleQuickAdd}
          onViewFullMenu={() => {
            const menuEl = document.getElementById('menu');
            if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Full Interactive Menu Section */}
        <MenuSection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onSelectItem={(item) => setCustomizingItem(item)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Special Combo Feasts & Late Night Deals */}
        <SpecialDealsSection onClaimDeal={handleClaimDeal} />

        {/* Craving Studio: Custom Item Builder */}
        <CustomBuilderModal onAddCustomItem={handleAddCustomFromBuilder} />

        {/* Craft Story & Customer Reviews */}
        <StoryAndReviews />

      </main>

      {/* Footer */}
      <Footer />

      {/* Item Customization Modal */}
      {customizingItem && (
        <ItemDetailModal
          item={customizingItem}
          onClose={() => setCustomizingItem(null)}
          onAddToCart={handleAddToCartWithCustomization}
        />
      )}

      {/* Sliding Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout & Live Tracker Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        orderType={checkoutOrderType}
        promoDiscount={checkoutPromoDiscount}
        promoCode={checkoutPromoCode}
        tip={checkoutTip}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Dine-In Table Reservation Modal */}
      <TableReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* Floating Cart Pill on Mobile */}
      <AnimatePresence>
        {totalCartCount > 0 && !isCartOpen && !isCheckoutOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="fixed bottom-6 right-6 z-40 sm:hidden"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playSound('click');
                setIsCartOpen(true);
              }}
              className="bg-[#D4AF37] hover:bg-[#E5C358] text-[#0A0A0A] font-bold font-label-caps text-xs py-3.5 px-5 shadow-2xl flex items-center gap-2 rounded-[2px] border border-[#D4AF37] cursor-pointer"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ORDER ({totalCartCount})</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 20, scale: 0.95, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="fixed bottom-6 left-1/2 z-50 bg-[#141414] border border-[#D4AF37] text-[#F5F5F0] px-5 py-3 rounded-[2px] shadow-2xl flex items-center gap-3"
          >
            <div className="w-7 h-7 bg-[#D4AF37] text-[#0A0A0A] rounded-full flex items-center justify-center font-bold">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="font-menu-item-title text-sm">{toast.message}</p>
              {toast.sub && <p className="font-body-md text-xs text-[#D4AF37]">{toast.sub}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
