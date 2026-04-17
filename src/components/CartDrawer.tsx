'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQty, totalItems, totalPrice, clearCart } = useCart();

  /* Build WhatsApp message from all cart items */
  const buildWhatsAppMessage = () => {
    if (items.length === 0) return '';
    const lines = items.map((item, i) =>
      `${i + 1}. ${item.product.name} (Size: ${item.size}) × ${item.quantity} — ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}`
    );
    const msg = [
      '*New Enquiry from Swara Website 🛍️*',
      '',
      "Hi! I'd like to enquire about the following items:",
      '',
      ...lines,
      '',
      `*Total: ₹${totalPrice.toLocaleString('en-IN')}*`,
      '',
      'Please confirm availability and delivery details.',
    ].join('\n');
    return encodeURIComponent(msg);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-brand-950/50 backdrop-blur-sm"
            onClick={closeCart}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-cream shadow-[−8px_0_40px_rgba(92,45,14,0.15)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-100">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-brand-700" />
                <h2 className="font-cormorant text-2xl text-brand-900 font-medium">
                  My Cart
                </h2>
                {totalItems > 0 && (
                  <span className="w-5 h-5 rounded-full bg-brand-800 text-cream text-[10px] font-jost flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full border border-brand-200 flex items-center justify-center text-brand-500 hover:text-brand-800 hover:border-brand-400 transition-all"
                aria-label="Close cart"
              >
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-5 pb-10">
                  <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center">
                    <ShoppingBag size={32} className="text-brand-300" />
                  </div>
                  <div>
                    <p className="font-cormorant text-2xl text-brand-400 font-light">
                      Your cart is empty
                    </p>
                    <p className="font-jost text-xs text-brand-300 mt-2">
                      Discover beautiful ethnic wear
                    </p>
                  </div>
                  <Link
                    href="/collections"
                    onClick={closeCart}
                    className="btn-primary text-xs py-3 px-6"
                  >
                    Explore Collections
                  </Link>
                </div>
              ) : (
                <>
                  {items.map((item) => {
                    const discount = item.product.originalPrice
                      ? Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100)
                      : null;
                    return (
                      <motion.div
                        key={`${item.product.id}-${item.size}`}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-4 bg-white rounded-xl p-3 shadow-glass"
                      >
                        {/* Image */}
                        <Link
                          href={`/product/${item.product.id}`}
                          onClick={closeCart}
                          className="relative shrink-0 w-20 h-24 rounded-lg overflow-hidden bg-brand-50"
                        >
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </Link>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <Link href={`/product/${item.product.id}`} onClick={closeCart}>
                            <p className="font-cormorant text-base text-brand-900 font-medium leading-snug line-clamp-2 hover:text-brand-600">
                              {item.product.name}
                            </p>
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-jost text-[10px] text-brand-400 bg-brand-50 px-2 py-0.5 rounded">
                              Size: {item.size}
                            </span>
                            {discount && (
                              <span className="font-jost text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                                -{discount}%
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            {/* Price */}
                            <span className="font-cormorant text-lg text-brand-800 font-semibold">
                              ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                            {/* Qty controls */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateQty(item.product.id, item.size, item.quantity - 1)}
                                className="w-6 h-6 rounded-full border border-brand-200 flex items-center justify-center text-brand-500 hover:border-brand-500 transition-colors"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="font-jost text-sm text-brand-800 w-5 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQty(item.product.id, item.size, item.quantity + 1)}
                                className="w-6 h-6 rounded-full border border-brand-200 flex items-center justify-center text-brand-500 hover:border-brand-500 transition-colors"
                              >
                                <Plus size={10} />
                              </button>
                              <button
                                onClick={() => removeItem(item.product.id, item.size)}
                                className="w-6 h-6 rounded-full border border-red-100 flex items-center justify-center text-red-400 hover:border-red-400 hover:text-red-600 transition-colors ml-1"
                              >
                                <Trash2 size={10} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Clear cart */}
                  <button
                    onClick={clearCart}
                    className="text-[10px] font-jost text-brand-300 hover:text-brand-500 tracking-widest uppercase transition-colors w-full text-center py-1"
                  >
                    Clear All
                  </button>
                </>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-brand-100 px-6 py-5 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="font-jost text-sm text-brand-500 tracking-wider uppercase">Total</span>
                  <span className="font-cormorant text-2xl text-brand-800 font-semibold">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="font-jost text-[10px] text-brand-400 text-center">
                  All prices include taxes. Shipping calculated at enquiry.
                </p>

                {/* WhatsApp Enquiry */}
                <a
                  href={`https://wa.me/919876543210?text=${buildWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white font-jost font-medium text-sm tracking-widest uppercase py-4 hover:bg-[#1ebe5d] transition-colors shadow-[0_4px_20px_rgba(37,211,102,0.3)]"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Enquire All via WhatsApp
                </a>

                <button
                  onClick={closeCart}
                  className="w-full btn-outline text-xs py-3"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
