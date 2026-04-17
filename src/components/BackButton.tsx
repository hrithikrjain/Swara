'use client';

import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  /* Hide on home page */
  if (pathname === '/') return null;

  return (
    <motion.button
      onClick={() => router.back()}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="
        fixed top-[88px] left-4 z-40
        flex items-center gap-1.5
        bg-cream/90 backdrop-blur-md
        border border-brand-100 shadow-glass
        text-brand-700 hover:text-brand-500 hover:border-brand-300
        font-jost text-[11px] tracking-widest uppercase
        px-3 py-2 rounded-full
        transition-all duration-200
        group
      "
      aria-label="Go back"
    >
      <ChevronLeft
        size={13}
        className="transition-transform duration-200 group-hover:-translate-x-0.5"
      />
      <span className="hidden sm:inline">Back</span>
    </motion.button>
  );
}
