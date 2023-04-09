import { useAppDispatch } from '../../helpers/hooks/redux';
import { setCategoryId, setCategoryName } from '../../store/slices/categorySlice';
import { getAllFoods, setFoodsByCategoryId } from '../../store/slices/foodSlice';
import { Category } from '../../types/Category';

function CategoriesItem({ id, name, categoryActiveId }: Category) {
  const dispatch = useAppDispatch();

  const handleSetCategoryId = () => {
    if (id === '0') {
      console.log(id);
      dispatch(getAllFoods());
    } else {
      console.log(id);
      dispatch(setFoodsByCategoryId(id));
    }
    dispatch(setCategoryId(id));
    dispatch(setCategoryName(name));
  };
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={categoryActiveId === id ? 'category category-active' : 'category'}
      onClick={handleSetCategoryId}
    >
      {name}
    </div>
  );
}

export default CategoriesItem;
