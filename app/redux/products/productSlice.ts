import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts } from "./productThunk";

interface Product {
    _id:string,
  title: string;
  description: string;
  price: number;
  images: string[];
  category:string,
  brand: string;
  rating: number;
}

interface ProductState {
  items: Product[];
  loading: boolean;
  page: number;
  totalPage:number,

}

const initialState: ProductState = {
  items: [],
  loading: false,
  page: 1,
  totalPage:1,
  
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<{ data: Product[]; page: number; totalPages: number,currentPage:number }>) => {
          state.loading = false;
          state.items.push(...action.payload.data)
          state.page=action.payload.currentPage
          state.totalPage=action.payload.totalPages
        }
      )
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setPage } = productSlice.actions;
export default productSlice.reducer;
