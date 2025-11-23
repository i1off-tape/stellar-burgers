import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  constructorActions,
  constructorSelectors
} from '../../services/slices/constructorSlice';
import { orderActions, orderSelectors } from '../../services/slices/orderSlice';
import { createOrder } from '../../services/thunks/orderThunk';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(
    constructorSelectors.constructorBurgerElement
  ) || { bun: null, ingredients: [] };

  const orderRequest = useSelector(orderSelectors.newOrderRequestSelect);

  const orderModalData = useSelector(orderSelectors.newOrderSelect);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredientsIds));
  };
  const closeOrderModal = () => {
    dispatch(orderActions.clearNewOrder());
    dispatch(constructorActions.clearConstructor());
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
