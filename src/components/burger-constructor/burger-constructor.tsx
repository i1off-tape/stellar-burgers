import { FC, useMemo, useEffect } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  constructorActions,
  constructorSelectors
} from '../../services/slices/constructorSlice';
import { orderActions, orderSelectors } from '../../services/slices/orderSlice';
import { createOrder } from '../../services/thunks/orderThunk';
import { userSelectors } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { RequestStatus } from '@utils-types';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderStatus = useSelector(orderSelectors.orderStatusSelect);
  const user = useSelector(userSelectors.userSelect);
  const constructorItems = useSelector(
    constructorSelectors.constructorBurgerElement
  ) || { bun: null, ingredients: [] };

  const orderRequest = useSelector(orderSelectors.newOrderRequestSelect);

  const orderModalData = useSelector(orderSelectors.newOrderSelect);

  useEffect(() => {
    if (orderStatus === RequestStatus.Success) {
      dispatch(constructorActions.clearConstructor());
    }
  }, [orderStatus, dispatch]);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredientsIds));
  };
  const closeOrderModal = () => {
    dispatch(orderActions.clearNewOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      (constructorItems.ingredients || []).reduce<number>(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
