import userSlice, { userActions, TUserState } from './userSlice';
import { RequestStatus } from '@utils-types';

const initialState: TUserState = {
  user: null,
  userCheck: false,
  requestStatus: RequestStatus.Idle
};

const mockUser = { name: 'Test', email: 'mail.13@gmail.com' };

describe('[userSlice] Служба пользователя', () => {
  it('Должен правильно инициализироваться', () => {
    const state = userSlice(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });
  describe('[Reducers] Служба пользователя', () => {
    it('Должен устанавливать userCheck в true', () => {
      const action = userActions.setUserCheck();
      const state = userSlice(initialState, action);
      expect(state.userCheck).toBeTruthy();
    });

    it('Должен правильно сбрасывать пользователя и статус', () => {
      const modifiedState = {
        ...initialState,
        user: mockUser,
        requestStatus: RequestStatus.Success
      };
      const action = userActions.userLogout();
      const state = userSlice(modifiedState, action);
      expect(state.user).toBeNull();
      expect(state.requestStatus).toBe(RequestStatus.Idle);
    });
    describe('[extraReducers] Служба пользователя', () => {
      describe('[fetchUser]', () => {
        it('[pending]: устанавливать requestStatus в Loading', () => {
          const action = { type: 'user/fetchUser/pending' };
          const state = userSlice(initialState, action);
          expect(state.requestStatus).toBe(RequestStatus.Loading);
        });
        it('[fulfilled]: устанавливать user и requestStatus в Success', () => {
          const action = {
            type: 'user/fetchUser/fulfilled',
            payload: mockUser
          };
          const state = userSlice(initialState, action);
          expect(state.user).toEqual(mockUser);
          expect(state.requestStatus).toBe(RequestStatus.Success);
        });

        it('[rejected]: устанавливать requestStatus в Failed', () => {
          const action = {
            type: 'user/fetchUser/rejected',
            error: new Error('Ошибка при загрузке пользователя')
          };
          const state = userSlice(initialState, action);
          expect(state.requestStatus).toBe(RequestStatus.Failed);
        });
      });
      describe('[loginUser]', () => {
        it('[pending]: устанавливать requestStatus в Loading', () => {
          const action = { type: 'user/loginUser/pending' };
          const state = userSlice(initialState, action);
          expect(state.requestStatus).toBe(RequestStatus.Loading);
        });
        it('[fulfilled]: устанавливать user и requestStatus в Success', () => {
          const action = {
            type: 'user/loginUser/fulfilled',
            payload: mockUser
          };
          const state = userSlice(initialState, action);
          expect(state.user).toEqual(mockUser);
          expect(state.requestStatus).toBe(RequestStatus.Success);
        });

        it('[rejected]: устанавливать requestStatus в Failed', () => {
          const action = {
            type: 'user/loginUser/rejected',
            error: new Error('Ошибка при авторизации')
          };
          const state = userSlice(initialState, action);
          expect(state.requestStatus).toBe(RequestStatus.Failed);
        });
      });
      describe('[registerUser]', () => {
        it('[pending]: устанавливать requestStatus в Loading', () => {
          const action = { type: 'user/registerUser/pending' };
          const state = userSlice(initialState, action);
          expect(state.requestStatus).toBe(RequestStatus.Loading);
        });
        it('[fulfilled]: устанавливать user и requestStatus в Success', () => {
          const action = {
            type: 'user/registerUser/fulfilled',
            payload: mockUser
          };
          const state = userSlice(initialState, action);
          expect(state.user).toEqual(mockUser);
          expect(state.requestStatus).toBe(RequestStatus.Success);
        });

        it('[rejected]: устанавливать requestStatus в Failed', () => {
          const action = {
            type: 'user/registerUser/rejected',
            error: new Error('Ошибка при регистрации')
          };
          const state = userSlice(initialState, action);
          expect(state.requestStatus).toBe(RequestStatus.Failed);
        });
      });
      describe('[updateUser]', () => {
        it('[pending]: устанавливать requestStatus в Loading', () => {
          const action = { type: 'user/updateUser/pending' };
          const state = userSlice(initialState, action);
          expect(state.requestStatus).toBe(RequestStatus.Loading);
        });
        it('[fulfilled]: устанавливать user и requestStatus в Success', () => {
          const action = {
            type: 'user/updateUser/fulfilled',
            payload: mockUser
          };
          const state = userSlice(initialState, action);
          expect(state.user).toEqual(mockUser);
          expect(state.requestStatus).toBe(RequestStatus.Success);
        });

        it('[rejected]: устанавливать requestStatus в Failed', () => {
          const action = {
            type: 'user/updateUser/rejected',
            error: new Error('Ошибка при обновлении пользователя')
          };
          const state = userSlice(initialState, action);
          expect(state.requestStatus).toBe(RequestStatus.Failed);
        });
      });
      describe('[forgotPassword]', () => {
        it('[pending]: устанавливать requestStatus в Loading', () => {
          const action = { type: 'user/forgotPassword/pending' };
          const state = userSlice(initialState, action);
          expect(state.requestStatus).toBe(RequestStatus.Loading);
        });
        it('[fulfilled]: устанавливать requestStatus в Success', () => {
          const action = { type: 'user/forgotPassword/fulfilled' };
          const state = userSlice(initialState, action);
          expect(state.requestStatus).toBe(RequestStatus.Success);
        });

        it('[rejected]: устанавливать requestStatus в Failed', () => {
          const action = {
            type: 'user/forgotPassword/rejected',
            error: new Error('Ошибка при забытом пароле')
          };
          const state = userSlice(initialState, action);
          expect(state.requestStatus).toBe(RequestStatus.Failed);
        });
      });
      describe('[resetPassword]', () => {
        it('[pending]: устанавливать requestStatus в Loading', () => {
          const action = { type: 'user/resetPassword/pending' };
          const state = userSlice(initialState, action);
          expect(state.requestStatus).toBe(RequestStatus.Loading);
        });
        it('[fulfilled]: устанавливать requestStatus в Success', () => {
          const action = { type: 'user/resetPassword/fulfilled' };
          const state = userSlice(initialState, action);
          expect(state.requestStatus).toBe(RequestStatus.Success);
        });

        it('[rejected]: устанавливать requestStatus в Failed', () => {
          const action = {
            type: 'user/resetPassword/rejected',
            error: new Error('Ошибка при сбросе пароля')
          };
          const state = userSlice(initialState, action);
          expect(state.requestStatus).toBe(RequestStatus.Failed);
        });
      });
      describe('[logoutUser]', () => {
        it('[pending]: устанавливать requestStatus в Loading', () => {
          const action = { type: 'user/logoutUser/pending' };
          const state = userSlice(initialState, action);
          expect(state.requestStatus).toBe(RequestStatus.Loading);
        });
        it('[fulfilled]: устанавливать user и requestStatus в Success', () => {
          const action = { type: 'user/logoutUser/fulfilled' };
          const state = userSlice(initialState, action);
          expect(state.user).toBeNull();
          expect(state.requestStatus).toBe(RequestStatus.Idle);
        });

        it('[rejected]: устанавливать requestStatus в Failed', () => {
          const action = {
            type: 'user/logoutUser/rejected',
            error: new Error('Ошибка при выходе')
          };
          const state = userSlice(initialState, action);
          expect(state.requestStatus).toBe(RequestStatus.Failed);
        });
      });
    });
  });
});
