import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userSelectors } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(userSelectors.userSelect);
  const userName = user?.name || '';
  return <AppHeaderUI userName={userName || ''} />;
};
