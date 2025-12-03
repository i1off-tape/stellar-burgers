import ingredientsSlice, {
  TIngredientsState,
  setSelectedIngredient
} from './ingredientsSlice';
import { TIngredient } from '@utils-types';

const initialState: TIngredientsState = {
  isLoading: false,
  ingredients: [],
  error: null,
  selectedIngredient: null
};

const mockIngredient: TIngredient = {
  _id: '1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const mockIngredients: TIngredient[] = [mockIngredient];

describe('[ingredientsSlice] Служба начинки', () => {
  it('Должен правильно инициализироваться', () => {
    const state = ingredientsSlice(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });
  describe('[Reducers] Служба начинки', () => {
    it('[setSelectedIngredient]: Должен устанавливать selectedIngredient в заданный ингредиент', () => {
      const action = setSelectedIngredient(mockIngredient);
      const state = ingredientsSlice(initialState, action);
      expect(state.selectedIngredient).toEqual(mockIngredient);
    });
    it('[setSelectedIngredient]: Должен устанавливать selectedIngredient в null если ингредиент не задан', () => {
      const modifiedState = {
        ...initialState,
        selectedIngredient: mockIngredient
      };
      const action = setSelectedIngredient(null);
      const state = ingredientsSlice(modifiedState, action);
      expect(state.selectedIngredient).toBeNull();
    });
    describe('[extraReducers] Служба начинки', () => {
      describe('[fetchIngredients]', () => {
        it('[pending]: устанавливать isLoading в true  и error в null', () => {
          const action = { type: 'ingredients/fetchIngredients/pending' };
          const state = ingredientsSlice(initialState, action);
          expect(state.isLoading).toBe(true);
          expect(state.error).toBeNull();
        });

        it('[fulfilled]: устанавливать isLoading в false  и error в null', () => {
          const action = {
            type: 'ingredients/fetchIngredients/fulfilled',
            payload: mockIngredients
          };
          const state = ingredientsSlice(
            { ...initialState, isLoading: true },
            action
          );
          expect(state.isLoading).toBe(false);
          expect(state.error).toBeNull();
        });

        it('[rejected]: устанавливать isLoading в false  и error в ошибку', () => {
          const action = {
            type: 'ingredients/fetchIngredients/rejected',
            error: new Error('Ошибка загрузки ингредиентов')
          };
          const state = ingredientsSlice(
            { ...initialState, isLoading: true },
            action
          );
          expect(state.isLoading).toBe(false);
          expect(state.error).toBe('Ошибка загрузки ингредиентов');
        });
      });
    });
  });
});
