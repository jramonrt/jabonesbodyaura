// ============================================================
// BODYAURA — TypeScript Types & Interfaces
// ============================================================

// --- Orders ---
export type PaymentMethod = 'TRANSFER' | 'CASH';
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  notes?: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderInput {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  quantity: number;
  paymentMethod: PaymentMethod;
  notes?: string;
}

// --- Contacts ---
export interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface CreateContactInput {
  name: string;
  email: string;
  message: string;
}

// --- Product ---
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  active: boolean;
}

// --- API Responses ---
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface OrderConfirmation {
  orderNumber: string;
  customerName: string;
  totalPrice: number;
  quantity: number;
  estimatedDelivery: string;
}

// --- Navigation ---
export interface NavItem {
  label: string;
  href: string;
}

// --- UI ---
export interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

export interface BenefitItem {
  icon: string;
  text: string;
}

export interface Ingredient {
  emoji: string;
  name: string;
}
