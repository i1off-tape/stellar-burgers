import constructorSlice, {
  constructorActions,
  TConstructorState
} from './constructorSlice';
import { TIngredient } from '@utils-types';

const initialState: TConstructorState = {
  bun: null,
  fillings: []
};

const mockBun: TIngredient = {
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

const mockFilling: TIngredient = {
  _id: '2',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

describe('[constructorSlice] Служба конструктора бургера', () => {
  it('Должен правильно инициализироваться', () => {
    const state = constructorSlice(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  describe('[Reducers] Служба конструктора бургера', () => {
    describe('addIngredient', () => {
      it('должен добавлять bun', () => {
        const action = constructorActions.addIngredient({
          ingredient: mockBun
        });
        const state = constructorSlice(initialState, action);
        expect(state.bun).toEqual({
          ...mockBun,
          id: expect.stringMatching(/\d+/)
        });
        expect(state.fillings).toEqual([]);
      });

      it('должен добавлять filling', () => {
        const action = constructorActions.addIngredient({
          ingredient: mockFilling
        });
        const state = constructorSlice(initialState, action);
        expect(state.bun).toBeNull();
        expect(state.fillings).toHaveLength(1);
        expect(state.fillings[0]).toEqual({
          ...mockFilling,
          id: expect.stringMatching(/\d+/)
        });
      });

      it('должен заменять bun при добавлении нового bun', () => {
        const modifiedState: TConstructorState = {
          ...initialState,
          bun: { ...mockBun, id: 'old-id' }
        };
        const newBun = { ...mockBun, _id: '1', name: 'Краторная булка N-200i' };
        const action = constructorActions.addIngredient({ ingredient: newBun });
        const state = constructorSlice(modifiedState, action);
        expect(state.bun).toEqual({
          ...newBun,
          id: expect.stringMatching(/\d+/)
        });
      });
    });

    describe('removeIngredient', () => {
      it('должен удалять filling по id', () => {
        const modifiedState: TConstructorState = {
          ...initialState,
          fillings: [
            { ...mockFilling, id: '1' },
            { ...mockFilling, id: '2' }
          ]
        };
        const action = constructorActions.removeIngredient({ id: '1' });
        const state = constructorSlice(modifiedState, action);
        expect(state.fillings).toHaveLength(1);
        expect(state.fillings[0].id).toBe('2');
      });

      it('не должен менять состояние если id не найден', () => {
        const modifiedState: TConstructorState = {
          ...initialState,
          fillings: [{ ...mockFilling, id: '1' }]
        };
        const action = constructorActions.removeIngredient({
          id: 'nonexistent'
        });
        const state = constructorSlice(modifiedState, action);
        expect(state.fillings).toEqual(modifiedState.fillings);
      });
    });

    describe('moveIngredient', () => {
      it('должен перемещать filling с позиции 0 на позицию 1', () => {
        const filling1 = { ...mockFilling, id: '1' };
        const filling2 = { ...mockFilling, id: '2' };
        const modifiedState: TConstructorState = {
          ...initialState,
          fillings: [filling1, filling2]
        };
        const action = constructorActions.moveIngredient({ form: 0, to: 1 });
        const state = constructorSlice(modifiedState, action);
        expect(state.fillings).toEqual([filling2, filling1]);
      });

      it('не должен менять состояние если индексы одинаковые', () => {
        const modifiedState: TConstructorState = {
          ...initialState,
          fillings: [{ ...mockFilling, id: '1' }]
        };
        const action = constructorActions.moveIngredient({ form: 0, to: 0 });
        const state = constructorSlice(modifiedState, action);
        expect(state.fillings).toEqual(modifiedState.fillings);
      });
    });

    describe('clearConstructor', () => {
      it('должен сбрасывать bun и fillings', () => {
        const modifiedState: TConstructorState = {
          bun: { ...mockBun, id: '1' },
          fillings: [{ ...mockFilling, id: '2' }]
        };
        const action = constructorActions.clearConstructor();
        const state = constructorSlice(modifiedState, action);
        expect(state.bun).toBeNull();
        expect(state.fillings).toEqual([]);
      });
    });
  });
});
