import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk to fetch products from API
export const fetchProducts = createAsyncThunk(
  "ecommerce/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
  }
);

// Async thunk to fetch categories from API
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    const data = await response.json();
    return data;
  }
);

// Creating slice for ecommerce state
const ecommerceSlice = createSlice({
  name: "ecommerce",
  initialState: {
    products: [],
    cart: [],
    categories: [],
    wishlist: [],
    selectedCategory: "all",
    status: "idle",
    error: null,
  },
  reducers: {
    addToCart(state, action) {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    decreaseQuantity(state, action) {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cart = state.cart.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
    },
    setCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    addToWishlist(state, action) {
      if (!state.wishlist.some((item) => item.id === action.payload.id)) {
        state.wishlist.push(action.payload);
      }
    },
    removeFromWishlist(state, action) {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = ["all", ...action.payload];
      });
  },
});

export const {
  addToCart,
  decreaseQuantity,
  setCategory,
  addToWishlist,
  removeFromWishlist,
} = ecommerceSlice.actions;
export const ecommerceReducer = ecommerceSlice.reducer;
