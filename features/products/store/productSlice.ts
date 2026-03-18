import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  searchQuery: string;
  selectedCategory: string;
}

const initialState: ProductState = {
  searchQuery: "",
  selectedCategory: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = "";
      state.selectedCategory = "";
    },
  },
});

export const { setSearchQuery, setSelectedCategory, resetFilters } =
  productSlice.actions;
export default productSlice.reducer;
