import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ProductApi } from '../slice/ProductSlice';
import userReducer from '../slice/UserSlice';
import filterReducer from '../slice/FilterSlice';
import cartReducer from '../slice/CartSlice';

// Define persistence configuration
const persistConfig = {
  key: 'root', // Unique key for the persisted state
  storage, // Storage engine (localStorage, AsyncStorage, etc.)
};

// Create persisted reducers
const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedFilterReducer = persistReducer(persistConfig, filterReducer);
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

// Configure Redux store
const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    filter: persistedFilterReducer,
    cart: persistedCartReducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serialization checks for Redux-persist
    }).concat(ProductApi.middleware),
});

// Create persistor
export const persistor = persistStore(store);

// Export product query
export const { useGetProductQuery } = ProductApi;

export default store;
