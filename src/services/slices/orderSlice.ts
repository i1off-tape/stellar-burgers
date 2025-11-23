import { createSlice } from '@reduxjs/toolkit';
import { TOrder, RequestStatus } from '@utils-types';
import { createOrder, fetchOrderByNumber } from '../thunks/orderThunk';
import { RootState } from '../store';

type TOrderState = {
  newOrder: TOrder | null;
  newOrderRequest: boolean;
  currentOrder: TOrder | null;
  currentOrderLoading: boolean;
  requestStatus: RequestStatus;
};

const initialState: TOrderState = {
  newOrder: null,
  newOrderRequest: false,
  currentOrder: null,
  currentOrderLoading: false,
  requestStatus: RequestStatus.Idle
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearNewOrder: (state) => {
      state.newOrder = null;
      state.requestStatus = RequestStatus.Idle;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.newOrderRequest = true;
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.newOrderRequest = false;
        state.newOrder = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(createOrder.rejected, (state) => {
        state.newOrderRequest = false;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.currentOrderLoading = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.currentOrderLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.currentOrderLoading = false;
      });
  }
});

export const orderActions = orderSlice.actions;

export const orderSelectors = {
  newOrderSelect: (state: RootState) => state.order.newOrder,
  newOrderRequestSelect: (state: RootState) => state.order.newOrderRequest,
  currentOrderSelect: (state: RootState) => state.order.currentOrder,
  currentOrderLoadingSelect: (state: RootState) =>
    state.order.currentOrderLoading,
  orderIsLoadingSelect: (state: RootState) =>
    state.order.requestStatus === RequestStatus.Loading
};

export default orderSlice.reducer;
