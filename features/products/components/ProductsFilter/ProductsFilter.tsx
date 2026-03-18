"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/store";
import {
  setSearchQuery,
  setSelectedCategory,
} from "@/features/products/store/productSlice";
import { useGetCategoriesQuery } from "@/features/products/store/productApi";
import { ProductCategory } from "@/features/products/types";
import { Search } from "lucide-react";
import { Input } from "@/shared/components/ui/form/Input/Input";

export function ProductsFilter() {
  const dispatch = useDispatch();
  const { searchQuery, selectedCategory } = useSelector(
    (state: RootState) => state.product,
  );
  const { data: categories = [] } = useGetCategoriesQuery();

  return (
    <div className="flex flex-col sm:flex-row w-full gap-4 mb-6">
      <div className="relative w-full sm:flex-1 flex items-center">
        <div className="absolute left-3 z-10 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="pl-10 py-2.5 shadow-sm bg-white dark:bg-gray-800"
        />
      </div>

      <select
        value={selectedCategory}
        onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
        className="block w-full sm:w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 transition-all shadow-sm border"
      >
        <option value="">All Categories</option>
        {categories.map((c: ProductCategory) => {
          const value = typeof c === "string" ? c : c.slug;
          const label = typeof c === "string" ? c : c.name;
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
