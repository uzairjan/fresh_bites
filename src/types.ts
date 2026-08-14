export interface MenuItem {
  id: string;
  number: number;
  name: string;
  category: 'pizza' | 'burger' | 'shawarma' | 'sides' | 'sauces' | 'drinks' | 'desserts';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  altText: string;
  isSpecial?: boolean;
  isChefsPick?: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  isHalal?: boolean;
  isPopular?: boolean;
  prepTimeMinutes: number;
  calories?: number;
  tags: string[];
  customizationOptions?: {
    sizes?: { name: string; priceMultiplier: number; description?: string }[];
    crusts?: { name: string; extraPrice: number }[];
    spicinessLevels?: string[];
    spiciness?: string[];
    addExtraToppings?: { name: string; price: number }[];
    extraToppings?: { name: string; price: number }[];
    removeIngredients?: string[];
    removableIngredients?: string[];
  };
}

export interface SpecialDeal {
  id: string;
  title: string;
  tagline: string;
  price: number;
  originalPrice: number;
  savings: number;
  image: string;
  itemsIncluded: string[];
  badge: string;
  popular?: boolean;
  serves?: string;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  selectedSize?: string;
  selectedCrust?: string;
  selectedSpice?: string;
  addedToppings?: { name: string; price: number }[];
  removedIngredients?: string[];
  specialNotes?: string;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderDetails {
  orderId: string;
  orderType: 'delivery' | 'pickup' | 'dine-in';
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress?: string;
  pickupTime?: string;
  paymentMethod: 'mbway' | 'card' | 'cash' | 'applepay';
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tip: number;
  total: number;
  status: 'received' | 'in_kitchen' | 'in_woodfire' | 'on_the_way' | 'ready' | 'delivered';
  createdAt: string;
  estimatedMinutes: number;
}

export interface CustomerReview {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  orderedItem: string;
  verified: boolean;
}

export interface TableReservation {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  status: 'confirmed' | 'pending';
}

export type ActiveTab = 'home' | 'menu' | 'special-deals' | 'builder' | 'reviews' | 'contact';
