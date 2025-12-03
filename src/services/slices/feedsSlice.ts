import { createSlice } from '@reduxjs/toolkit';
import { TOrdersData, TOrder, RequestStatus } from '@utils-types';
import { fetchFeed, fetchProfileOrders } from '../thunks/feedsThunk';
import { RootState } from '../store';

export type TFeedsState = {
  feed: TOrdersData | null;
  orderAuth: TOrder[];
  requestStatus: RequestStatus;
};

const initialState: TFeedsState = {
  feed: null,
  orderAuth: [],
  requestStatus: RequestStatus.Idle
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.feed = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(fetchProfileOrders.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        state.orderAuth = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchProfileOrders.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});

export const feedsSelectors = {
  feedSelect: (state: RootState) => state.feeds.feed,
  feedOrdersSelect: (state: RootState) => state.feeds.orderAuth,
  feedIsLoadingSelect: (state: RootState) =>
    state.feeds.requestStatus === RequestStatus.Loading
};

export default feedsSlice.reducer;
