import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Categories, Category } from '../../types/Category';
import { Food } from '../../types/Food';

interface FoodState {
  data: Categories[];
  foods: any;
  categories: Category[];
  isLoading: boolean;
}

const initialState: FoodState = {
  data: [],
  foods: [],
  categories: [{ id: '0', name: 'Все' }],
  isLoading: false,
};

export const searchFoods = createAsyncThunk('foods/searchFoods', async (name: string, thunkAPI) => {
  try {
    const response = await axios.get(
      `https://kvartirabar.uz/menu/${name.length ? name : ':search'}`
    );
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить блюды');
  }
});

export const getAllFoods = createAsyncThunk('foods/getAllFoods', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`https://kvartirabar.uz/category`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить блюды');
  }
});

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setFoods: (state, action: PayloadAction<Categories[] | Categories>) => {
      state.foods = [];
      if (Array.isArray(action.payload)) {
        action.payload.map((item) => state.foods.push(...item.menu));
      } else {
        state.foods = [...action.payload.menu];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchFoods.fulfilled, (state, action: PayloadAction<any>) => {
      state.foods = action.payload;
    });
    // builder.addCase(getAllFoods.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(getAllFoods.fulfilled, (state, action: PayloadAction<Categories[]>) => {
    //   state.data = action.payload;
    //   action.payload.forEach((item) => state.foods.push(...item.menu));
    //   action.payload.forEach((item) => state.categories.push(item));
    //   state.isLoading = false;
    // });
  },
});

export const { setFoods } = foodSlice.actions;

export default foodSlice.reducer;
