import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

export const createOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>('order/createOrder', async (ingredients, { rejectWithValue }) => {
  try {
    const response = await orderBurgerApi(ingredients);
    return response.order;
  } catch (error) {
    return rejectWithValue(
      (error as Error).message || 'Ошибка при оформлении заказа'
    );
  }
});

export const fetchOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('order/fetchOrderByNumber', async (number, { rejectWithValue }) => {
  try {
    const response = await getOrderByNumberApi(number);
    if (response.success && response.orders.length > 0) {
      return response.orders[0];
    }
    throw new Error('Заказ не найден');
  } catch (error) {
    return rejectWithValue(
      (error as Error).message || 'Ошибка при загрузке заказа'
    );
  }
});
