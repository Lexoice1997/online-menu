import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import { getAllFoods } from '../../store/slices/foodSlice';
import { Food } from '../../types/Food';
import FoodsItem from '../FoodsItem/FoodsItem';
import './Foods.css';
import FoodsSkeleton from './FoodsSkeleton';

function Foods() {
  const dispatch = useAppDispatch();
  const { categoryId, categoryName } = useAppSelector((state) => state.category);
  const { foods, isLoading } = useAppSelector((state) => state.food);
  // const { data, isLoading } = useGetFoodsByCategoryIdQuery(categoryId);

  useEffect(() => {
    // dispatch(setFoods(data));
    dispatch(getAllFoods());
  }, [dispatch]);

  if (isLoading) {
    return <FoodsSkeleton />;
  }

  return (
    <div className="foods">
      <h1>{categoryName}</h1>
      <div className="foods-container">
        {foods?.map((item: Food) => (
          <FoodsItem
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            categoryId={item.id}
            price={item.price}
            avatar={item.avatar}
            admin={false}
          />
        ))}
      </div>
    </div>
  );
}

export default Foods;
