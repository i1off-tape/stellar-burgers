import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from '../store';

export type TConstructorState = {
  bun: TConstructorIngredient | null;
  fillings: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  fillings: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (
      state,
      action: PayloadAction<{ ingredient: TIngredient }>
    ) => {
      const { ingredient } = action.payload;
      if (ingredient.type === 'bun') {
        state.bun = { ...ingredient, id: Date.now().toString() };
      } else {
        state.fillings = [
          ...state.fillings,
          { ...ingredient, id: Date.now().toString() }
        ];
      }
    },
    removeIngredient: (state, action: PayloadAction<{ id: string }>) => {
      state.fillings = state.fillings.filter(
        (item) => item.id !== action.payload.id
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ form: number; to: number }>
    ) => {
      const { form, to } = action.payload;
      const [moved] = state.fillings.splice(form, 1);
      state.fillings.splice(to, 0, moved);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.fillings = [];
    }
  }
});

export const constructorActions = constructorSlice.actions;

export const constructorSelectors = {
  constructorBurgerElement: (state: RootState) => ({
    bun: state.burgerConstructor.bun,
    ingredients: state.burgerConstructor.fillings
  }),
  constructorBurgerIsBun: (state: RootState) => state.burgerConstructor.bun,
  constructorBurgerIsIngredients: (state: RootState) =>
    state.burgerConstructor.fillings
};

export default constructorSlice.reducer;
