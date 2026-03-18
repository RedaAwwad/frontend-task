import { Product } from "@/features/products/types";
import Link from "next/link";
import { ArrowLeft, Star, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { AppHeader } from "@/shared/components/global/AppHeader/AppHeader";
import { Button } from "@/shared/components/ui/Button/Button";
import { ProductGallery } from "@/features/products/components/ProductGallery/ProductGallery";

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      next: { revalidate: 60 }, // Next.js ISR/SSR caching
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
        <AppHeader />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Product Not Found
          </h2>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Calculate original price before discount
  const originalPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <AppHeader />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to products
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 lg:p-12">
            {/* Image Gallery */}
            <ProductGallery
              images={product.images || []}
              thumbnail={product.thumbnail}
              title={product.title}
            />

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 tracking-wide uppercase">
                  {product.category}
                </span>
                <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                  Brand:{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {product.brand || "Generic"}
                  </span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-2 mb-4 leading-tight">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-full">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <span
                    className={
                      product.stock > 0
                        ? "text-green-600 dark:text-green-400 font-medium"
                        : "text-red-500 font-medium"
                    }
                  >
                    {product.stock > 0
                      ? `In Stock (${product.stock})`
                      : "Out of Stock"}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-black text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.discountPercentage > 0 && (
                    <>
                      <span className="text-xl text-gray-400 line-through mb-1">
                        ${originalPrice}
                      </span>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full mb-1">
                        {product.discountPercentage.toFixed(0)}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-8 flex-grow">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <ShieldCheck className="w-6 h-6 text-blue-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    1 Year Warranty
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <Truck className="w-6 h-6 text-blue-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Fast Delivery
                  </span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full"
                disabled={product.stock === 0}
              >
                <ShoppingBag className="w-5 h-5 me-2" />
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
