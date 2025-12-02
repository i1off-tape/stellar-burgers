import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchProfileOrders } from '../../services/thunks/feedsThunk';
import { feedsSelectors } from '../../services/slices/feedsSlice';
import { userSelectors } from '../../services/slices/userSlice';

export const ProfileOrders: FC = () => {
  const orders = useSelector(feedsSelectors.feedOrdersSelect);
  const user = useSelector(userSelectors.userSelect);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchProfileOrders());
    }
  }, [dispatch, user]);

  return <ProfileOrdersUI orders={orders} />;
};
