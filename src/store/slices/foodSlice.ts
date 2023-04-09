import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Categories, Category } from '../../types/Category';
import { Food } from '../../types/Food';

interface FoodState {
  foods: Food[];
  categories: Category[];
  isLoading: boolean;
}

const initialState: FoodState = {
  foods: [],
  categories: [{ id: '0', name: 'Все' }],
  isLoading: false,
};

export const searchFoods = createAsyncThunk('foods/searchFoods', async (name: string, thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:5000/foods/search`, {
      params: { name },
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить блюды');
  }
});

export const getAllFoods = createAsyncThunk('foods/getAllFoods', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`http://kvartirabar.uz/category`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить блюды');
  }
});

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setFoods: (state, action: PayloadAction<any>) => {
      state.foods = action.payload;
    },
    setFoodsByCategoryId: (state, action: PayloadAction<string>) => {
      state.foods = state.foods.filter((item) => item.id === action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchFoods.fulfilled, (state, action: PayloadAction<any>) => {
      state.foods = action.payload;
    });
    builder.addCase(getAllFoods.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllFoods.fulfilled, (state, action: PayloadAction<Categories[]>) => {
      action.payload.forEach((item) => state.foods.push(...item.menu));
      action.payload.forEach((item) => state.categories.push(item));
      state.isLoading = false;
    });
  },
});

export const { setFoods, setFoodsByCategoryId } = foodSlice.actions;

export default foodSlice.reducer;
