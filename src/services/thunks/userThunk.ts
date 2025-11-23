import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi,
  logoutApi,
  forgotPasswordApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData
} from '@api';

import { TUser } from '@utils-types';
import { deleteCookie } from '../../utils/cookie';

//Получаем данные пользователя
export const fetchUser = createAsyncThunk<TUser>('user/fetchUser', async () => {
  const response = await getUserApi();
  return response.user;
});

//Авторизация
export const loginUser = createAsyncThunk<TUser, TLoginData>(
  'user/loginUser',
  async (data) => {
    const response = await loginUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

// Регистрация
export const registerUser = createAsyncThunk<TUser, TRegisterData>(
  'user/registerUser',
  async (data) => {
    const response = await registerUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

// Обновление данных пользователя
export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/updateUser',
  async (userData) => {
    const response = await updateUserApi(userData);
    return response.user;
  }
);

//Забыли пароль
export const forgotPassword = createAsyncThunk<void, { email: string }>(
  'user/forgotPassword',
  async (data) => {
    await forgotPasswordApi(data);
  }
);

//Сброс пароля
export const resetPassword = createAsyncThunk<
  void,
  { password: string; token: string }
>('user/resetPassword', async (data) => {
  await resetPasswordApi(data);
});

//Выход
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});
