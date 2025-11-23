import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchProfileOrders } from '../../services/thunks/feedsThunk';
import { feedsSelectors } from '../../services/slices/feedsSlice';

export const ProfileOrders: FC = () => {
  const orders = useSelector(feedsSelectors.feedOrdersSelect);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
