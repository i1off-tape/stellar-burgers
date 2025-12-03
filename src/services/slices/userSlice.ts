import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser, RequestStatus } from '@utils-types';
import {
  fetchUser,
  loginUser,
  registerUser,
  updateUser,
  logoutUser,
  forgotPassword,
  resetPassword
} from '../thunks/userThunk';

export type TUserState = {
  user: TUser | null;
  userCheck: boolean;
  requestStatus: RequestStatus;
};

const initialState: TUserState = {
  user: null,
  userCheck: false,
  requestStatus: RequestStatus.Idle
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserCheck: (state) => {
      state.userCheck = true;
    },
    userLogout: (state) => {
      state.user = null;
      state.requestStatus = RequestStatus.Idle;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.requestStatus = RequestStatus.Success;
        state.user = action.payload;
        state.userCheck = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.user = null;
        state.userCheck = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.requestStatus = RequestStatus.Success;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.user = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.requestStatus = RequestStatus.Success;
          state.user = action.payload;
        }
      )
      .addCase(registerUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.user = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.requestStatus = RequestStatus.Success;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(resetPassword.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(logoutUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.requestStatus = RequestStatus.Idle;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});

export const userActions = userSlice.actions;
export const userSelectors = {
  userSelect: (state: { user: TUserState }) => state.user.user,
  isAuthCheckedSelect: (state: { user: TUserState }) => state.user.userCheck,
  userIsLoadingSelect: (state: { user: TUserState }) =>
    state.user.requestStatus === RequestStatus.Loading
};

export default userSlice.reducer;
