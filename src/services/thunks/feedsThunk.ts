import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '@api';
import { TOrdersData, TOrder } from '@utils-types';

export const fetchFeed = createAsyncThunk<
  TOrdersData,
  void,
  { rejectValue: string }
>('feeds/fetchFeed', async (_, { rejectWithValue }) => {
  try {
    const data = await getFeedsApi();
    if (data.success) {
      return data;
    }
    throw new Error('Ошибка при загрузке ленты');
  } catch (error) {
    return rejectWithValue(
      (error as Error).message || 'Ошибка при загрузке ленты'
    );
  }
});

export const fetchProfileOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('feeds/fetchProfileOrders', async (_, { rejectWithValue }) => {
  try {
    const data = await getOrdersApi();
    return data;
  } catch (error) {
    return rejectWithValue(
      (error as Error).message || 'Ошибка загрузки заказов пользователя'
    );
  }
});
