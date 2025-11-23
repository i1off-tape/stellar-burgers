import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { orderActions, orderSelectors } from '../../services/slices/orderSlice';
import { useParams } from 'react-router-dom';
import { fetchOrderByNumber } from '../../services/thunks/orderThunk';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();
  const orderData = useSelector(orderSelectors.currentOrderSelect);

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const isLoading = useSelector(orderSelectors.currentOrderLoadingSelect);

  useEffect(() => {
    if (number) {
      const orderNumber = Number(number);

      // Очищаем заказ, если он не соответствует запрошенному номеру
      if (orderData && orderData.number !== orderNumber) {
        dispatch(orderActions.clearCurrentOrder());
      }

      // Загружаем заказ, если его нет или номер не совпадает
      if (!orderData || orderData.number !== orderNumber) {
        dispatch(fetchOrderByNumber(orderNumber));
      }
    }
  }, [number, orderData, dispatch]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isLoading || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
