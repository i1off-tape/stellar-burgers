import feedsSlice, { TFeedsState } from './feedsSlice';
import { RequestStatus, TOrdersData, TOrder } from '@utils-types';

const initialState: TFeedsState = {
  feed: null,
  orderAuth: [],
  requestStatus: RequestStatus.Idle
};

const mockOrdersData: TOrdersData = {
  orders: [
    {
      _id: '1',
      ingredients: ['ingredient1', 'ingredient2'],
      status: 'done',
      name: 'Test Order 1',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      number: 12345
    }
  ],
  total: 100,
  totalToday: 10
};

const mockOrders: TOrder[] = [
  {
    _id: '2',
    ingredients: ['ingredient3', 'ingredient4'],
    status: 'pending',
    name: 'Test Order 2',
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
    number: 12346
  }
];

describe('[feedsSlice] Служба ленты заказов', () => {
  it('Должен правильно инициализироваться', () => {
    const state = feedsSlice(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  describe('[extraReducers] Служба ленты заказов', () => {
    describe('[fetchFeed]', () => {
      it('[pending]: должен устанавливать requestStatus в Loading', () => {
        const action = { type: 'feeds/fetchFeed/pending' };
        const state = feedsSlice(initialState, action);
        expect(state.requestStatus).toBe(RequestStatus.Loading);
      });

      it('[fulfilled]: должен устанавливать feed и requestStatus в Success', () => {
        const action = {
          type: 'feeds/fetchFeed/fulfilled',
          payload: mockOrdersData
        };
        const state = feedsSlice(
          { ...initialState, requestStatus: RequestStatus.Loading },
          action
        );
        expect(state.feed).toEqual(mockOrdersData);
        expect(state.requestStatus).toBe(RequestStatus.Success);
      });

      it('[rejected]: должен устанавливать requestStatus в Failed', () => {
        const action = { type: 'feeds/fetchFeed/rejected' };
        const state = feedsSlice(
          { ...initialState, requestStatus: RequestStatus.Loading },
          action
        );
        expect(state.requestStatus).toBe(RequestStatus.Failed);
      });
    });

    describe('[fetchProfileOrders]', () => {
      it('[pending]: должен устанавливать requestStatus в Loading', () => {
        const action = { type: 'feeds/fetchProfileOrders/pending' };
        const state = feedsSlice(initialState, action);
        expect(state.requestStatus).toBe(RequestStatus.Loading);
      });

      it('[fulfilled]: должен устанавливать orderAuth и requestStatus в Success', () => {
        const action = {
          type: 'feeds/fetchProfileOrders/fulfilled',
          payload: mockOrders
        };
        const state = feedsSlice(
          { ...initialState, requestStatus: RequestStatus.Loading },
          action
        );
        expect(state.orderAuth).toEqual(mockOrders);
        expect(state.requestStatus).toBe(RequestStatus.Success);
      });

      it('[rejected]: должен устанавливать requestStatus в Failed', () => {
        const action = { type: 'feeds/fetchProfileOrders/rejected' };
        const state = feedsSlice(
          { ...initialState, requestStatus: RequestStatus.Loading },
          action
        );
        expect(state.requestStatus).toBe(RequestStatus.Failed);
      });
    });
  });
});
