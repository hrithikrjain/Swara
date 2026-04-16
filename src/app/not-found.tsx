import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-950 flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* BG image */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/images/Lehenga Choli/Lehenga-1.jpeg"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 space-y-6">
        <p className="font-cormorant text-gold-400 text-8xl font-light opacity-40">404</p>
        <h1 className="font-cormorant text-4xl md:text-6xl text-cream font-light">
          Page Not Found
        </h1>
        <div className="flex items-center justify-center gap-4">
          <span className="block w-12 h-px bg-gold-500" />
          <span className="text-gold-500">✦</span>
          <span className="block w-12 h-px bg-gold-500" />
        </div>
        <p className="font-jost text-sm text-brand-300 max-w-sm mx-auto leading-relaxed">
          The page you're looking for seems to have wandered off. Let's take you back to something beautiful.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/collections" className="font-jost text-sm text-brand-300 hover:text-gold-400 transition-colors tracking-widest uppercase">
            View Collections →
          </Link>
        </div>
      </div>
    </div>
  );
}
