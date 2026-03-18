import { AppHeader } from "@/shared/components/global/AppHeader/AppHeader";
import { ProductList } from "@/features/products/components/ProductList/ProductList";
import { ProductsFilter } from "@/features/products/components/ProductsFilter/ProductsFilter";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <AppHeader />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Discover Products
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Find the best deals on your favorite items.
          </p>
        </div>

        <ProductsFilter />
        <ProductList />
      </main>
    </div>
  );
}
