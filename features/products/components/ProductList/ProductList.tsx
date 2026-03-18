"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/shared/store";
import {
  useGetProductsQuery,
  useSearchProductsQuery,
  useGetProductsByCategoryQuery,
} from "@/features/products/store/productApi";
import { ProductCard } from "../ProductCard/ProductCard";
import { Pagination } from "@/shared/components/global/Pagination/Pagination";
import { Product } from "@/features/products/types";
import { Loader2, PackageX } from "lucide-react";
import { useState, useEffect } from "react";

export function ProductList() {
  const { searchQuery, selectedCategory } = useSelector(
    (state: RootState) => state.product,
  );

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const [currentPage, setCurrentPage] = useState(1);
  const [prevSearchQuery, setPrevSearchQuery] = useState(debouncedSearchQuery);
  const [prevSelectedCategory, setPrevSelectedCategory] =
    useState(selectedCategory);

  // Reset page when search or category changes using derived state
  // This avoids the 'setState() within effect' warning and prevents extra renders
  if (
    debouncedSearchQuery !== prevSearchQuery ||
    selectedCategory !== prevSelectedCategory
  ) {
    setCurrentPage(1);
    setPrevSearchQuery(debouncedSearchQuery);
    setPrevSelectedCategory(selectedCategory);
  }

  const itemsPerPage = 12;
  // Use the effective page for this render cycle in case it was just reset
  const effectivePage =
    debouncedSearchQuery !== prevSearchQuery ||
    selectedCategory !== prevSelectedCategory
      ? 1
      : currentPage;
  const skip = (effectivePage - 1) * itemsPerPage;

  // We conditionally use the hooks.
  // Actually, RTK Query doesn't like conditional hook calling, but we use the `skip` option!

  const hasSearch = debouncedSearchQuery.trim().length > 0;
  const hasCategory = selectedCategory.trim().length > 0;

  const { data: allData, isFetching: isAllFetching } = useGetProductsQuery(
    { limit: itemsPerPage, skip },
    { skip: hasSearch || hasCategory },
  );

  const { data: searchData, isFetching: isSearchFetching } =
    useSearchProductsQuery(
      { q: debouncedSearchQuery, limit: itemsPerPage, skip },
      { skip: !hasSearch },
    );

  const { data: categoryData, isFetching: isCategoryFetching } =
    useGetProductsByCategoryQuery(
      { category: selectedCategory, limit: itemsPerPage, skip },
      { skip: hasSearch || !hasCategory },
    );

  // Determine active data source
  let rawProducts: Product[] = [];
  let totalItems = 0;

  if (hasSearch) {
    rawProducts = searchData?.products || [];
    totalItems = searchData?.total || 0;
  } else if (hasCategory) {
    rawProducts = categoryData?.products || [];
    totalItems = categoryData?.total || 0;
  } else {
    rawProducts = allData?.products || [];
    totalItems = allData?.total || 0;
  }

  // Client-side filtering if BOTH search and category exist
  const finalProducts = rawProducts.filter((p) => {
    if (hasSearch && hasCategory) {
      return p.category === selectedCategory;
    }
    return true;
  });

  const isFetching = isAllFetching || isSearchFetching || isCategoryFetching;

  if (isFetching) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: itemsPerPage }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse min-h-[400px]"
          >
            <div className="aspect-square bg-gray-200 dark:bg-gray-700 w-full" />
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4 gap-2">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16" />
              </div>
              <div className="space-y-2 mb-6 flex-grow">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
              </div>
              <div className="mt-auto">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (finalProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <PackageX className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          No products found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          We couldn't find anything matching your search criteria. Try adjusting
          your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {finalProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {!isFetching && finalProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
}
