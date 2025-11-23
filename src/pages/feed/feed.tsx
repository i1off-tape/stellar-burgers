import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { fetchFeed } from '../../services/thunks/feedsThunk';
import { feedsSelectors } from '../../services/slices/feedsSlice';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/thunks/ingredientsThunk';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const feed = useSelector(feedsSelectors.feedSelect);

  const orders = feed?.orders || [];

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };

  useEffect(() => {
    handleGetFeeds();
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
