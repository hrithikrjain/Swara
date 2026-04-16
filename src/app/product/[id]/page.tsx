import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import ProductDetail from '@/components/ProductDetail';
import { products, getProductById } from '@/lib/products';

interface Props {
  params: { id: string };
}

// Required for static export with dynamic routes
export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductById(params.id);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductById(params.id);
  if (!product) notFound();

  return (
    <div className="page-enter">
      {/* Breadcrumb */}
      <div className="bg-parchment/50 border-b border-brand-100 px-4 sm:px-6 lg:px-8 py-3">
        <div className="container-xl flex items-center gap-2 font-jost text-xs text-brand-400">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight size={10} />
          <Link href="/collections" className="hover:text-brand-600">Collections</Link>
          <ChevronRight size={10} />
          <Link
            href={`/collections/${product.category.toLowerCase().replace(/ /g, '-')}`}
            className="hover:text-brand-600"
          >
            {product.category}
          </Link>
          <ChevronRight size={10} />
          <span className="text-brand-700 truncate max-w-[120px]">{product.name}</span>
        </div>
      </div>

      {/* Client component with all interactivity */}
      <ProductDetail product={product} />
    </div>
  );
}
