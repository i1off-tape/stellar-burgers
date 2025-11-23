import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { fetchIngredients } from '../thunks/ingredientsThunk';

type TIngredientsState = {
  isLoading: boolean;
  ingredients: TIngredient[];
  error: string | null;
  selectedIngredient: TIngredient | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null,
  selectedIngredient: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setSelectedIngredient: (
      state,
      action: PayloadAction<TIngredient | null>
    ) => {
      state.selectedIngredient = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки ингридиентов';
      });
  }
});

export default ingredientsSlice.reducer;
export { fetchIngredients };
export const { setSelectedIngredient } = ingredientsSlice.actions;
