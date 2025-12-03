import orderSlice, { orderActions, TOrderState } from './orderSlice';
import { RequestStatus, TOrder } from '@utils-types';

const initialState: TOrderState = {
  newOrder: null,
  newOrderRequest: false,
  currentOrder: null,
  currentOrderLoading: false,
  requestStatus: RequestStatus.Idle
};

const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Test order',
  createdAt: '2025-03-12T00:00:00.000Z',
  updatedAt: '2025-03-12T00:00:00.000Z',
  number: 1234,
  ingredients: ['1', '2', '1']
};

describe('[orderSlice] Служба заказа', () => {
  it('Должен правильно инициализироваться', () => {
    const state = orderSlice(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  describe('[Reducers] Служба заказа', () => {
    it('[clearNewOrder]: Должен устанавливать newOrder в null', () => {
      const modifiedState = {
        ...initialState,
        newOrder: mockOrder,
        requestStatus: RequestStatus.Success
      };
      const action = orderActions.clearNewOrder();
      const state = orderSlice(modifiedState, action);
      expect(state.newOrder).toBeNull();
      expect(state.requestStatus).toBe(RequestStatus.Idle);
    });

    it('[clearCurrentOrder]: Должен устанавливать currentOrder в null', () => {
      const modifiedState = {
        ...initialState,
        newOrder: mockOrder
      };
      const action = orderActions.clearCurrentOrder();
      const state = orderSlice(modifiedState, action);
      expect(state.currentOrder).toBeNull();
    });

    describe('[extraReducers] Служба заказа', () => {
      describe('[createOrder]', () => {
        it('[pending]: устанавливать newOrderRequest в true  и requestStatus в Loading', () => {
          const action = { type: 'order/createOrder/pending' };
          const state = orderSlice(initialState, action);
          expect(state.newOrderRequest).toBe(true);
          expect(state.requestStatus).toBe(RequestStatus.Loading);
        });

        it('[fulfilled]: устанавливать newOrder и newOrderRequest в false  и requestStatus в Success', () => {
          const action = {
            type: 'order/createOrder/fulfilled',
            payload: mockOrder
          };
          const state = orderSlice(
            {
              ...initialState,
              newOrderRequest: true,
              requestStatus: RequestStatus.Loading
            },
            action
          );
          expect(state.newOrder).toEqual(mockOrder);
          expect(state.newOrderRequest).toBe(false);
          expect(state.requestStatus).toBe(RequestStatus.Success);
        });
        it('[rejected]: устанавливать newOrderRequest в false  и requestStatus в Failed', () => {
          const action = {
            type: 'order/createOrder/rejected',
            error: new Error('Ошибка при оформлении заказа')
          };
          const state = orderSlice(
            {
              ...initialState,
              newOrderRequest: true,
              requestStatus: RequestStatus.Loading
            },
            action
          );
          expect(state.newOrderRequest).toBe(false);
          expect(state.requestStatus).toBe(RequestStatus.Failed);
        });
      });
      describe('[fetchOrderByNumber]', () => {
        it('[pending]: устанавливать currentOrderLoading в true  и requestStatus в Loading', () => {
          const action = { type: 'order/fetchOrderByNumber/pending' };
          const state = orderSlice(initialState, action);
          expect(state.currentOrderLoading).toBe(true);
        });

        it('[fulfilled]: устанавливать currentOrder и currentOrderLoading в false', () => {
          const action = {
            type: 'order/fetchOrderByNumber/fulfilled',
            payload: mockOrder
          };
          const state = orderSlice(
            { ...initialState, currentOrderLoading: true },
            action
          );
          expect(state.currentOrder).toEqual(mockOrder);
          expect(state.currentOrderLoading).toBe(false);
        });

        it('[rejected]: устанавливать currentOrderLoading в false', () => {
          const action = {
            type: 'order/fetchOrderByNumber/rejected',
            error: new Error('Ошибка при загрузке заказа')
          };
          const state = orderSlice(
            { ...initialState, currentOrderLoading: true },
            action
          );
          expect(state.currentOrderLoading).toBe(false);
        });
      });
    });
  });
});
