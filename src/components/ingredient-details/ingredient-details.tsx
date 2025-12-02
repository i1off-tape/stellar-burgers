import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector, useDispatch } from '../../services/store';
import { setSelectedIngredient } from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const ingredientData = useSelector(
    (state) => state.ingredients.selectedIngredient
  );
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  useEffect(() => {
    if (id && ingredients.length > 0) {
      const ingredient = ingredients.find((ing) => ing._id === id);
      if (ingredient) {
        dispatch(setSelectedIngredient(ingredient));
      }
    }

    return () => {
      dispatch(setSelectedIngredient(null));
    };
  }, [id, ingredients, dispatch]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
