import { rootReducer } from './store';
import { RequestStatus } from '@utils-types';

describe('[rootReducer] Состояние службы', () => {
  it('Должен правильно инициализироваться', () => {
    const initialState = {
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null,
        selectedIngredient: null
      },
      burgerConstructor: {
        bun: null,
        fillings: []
      },
      order: {
        newOrder: null,
        newOrderRequest: false,
        currentOrder: null,
        currentOrderLoading: false,
        requestStatus: RequestStatus.Idle
      },
      feeds: {
        feed: null,
        orderAuth: [],
        requestStatus: RequestStatus.Idle
      },
      user: {
        user: null,
        userCheck: false,
        requestStatus: RequestStatus.Idle
      }
    };

    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual(initialState);
  });
});
