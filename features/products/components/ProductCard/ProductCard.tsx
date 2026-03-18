import { Product } from "../../types";
import Link from "next/link";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl dark:hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-contain w-full h-full mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1 shadow-sm border border-gray-100 dark:border-gray-700">
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
            {product.rating.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-bold text-lg leading-tight text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {product.title}
          </h3>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 whitespace-nowrap">
            {product.category}
          </span>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1 mb-4 flex-grow">
          {product.description}
        </p>

        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            {product.discountPercentage > 0 && (
              <span className="text-xs text-gray-500 line-through dark:text-gray-500">
                $
                {(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
            )}
            <span className="text-2xl font-black text-gray-900 dark:text-white">
              ${product.price ? product.price.toFixed(2) : "0.00"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
