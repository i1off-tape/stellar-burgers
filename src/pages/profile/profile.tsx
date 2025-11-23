import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { userSelectors } from '../../services/slices/userSlice';
import { updateUser, logoutUser } from '../../services/thunks/userThunk';

export const Profile: FC = () => {
  const user = useSelector(userSelectors.userSelect);
  const isLoading = useSelector(userSelectors.userIsLoadingSelect);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!user) return;
    dispatch(
      updateUser({
        name: formValue.name,
        email: formValue.email,
        ...(formValue.password && { password: formValue.password })
      })
    )
      .unwrap()
      .then(() => {
        setFormValue((prev) => ({ ...prev, password: '' }));
      })
      .catch(() => {
        // Ошибка в slice
      });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate('/login', { replace: true });
      })
      .catch(() => {
        // Ошибка
      });
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleLogout={handleLogout}
      handleInputChange={handleInputChange}
    />
  );
};
