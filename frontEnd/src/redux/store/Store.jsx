import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ProductApi } from '../slice/ProductSlice';
import userReducer from '../slice/UserSlice';
import filterReducer from '../slice/FilterSlice'; // Import the FilterSlice
import cartReducer from '../slice/CartSlice'
// Define persistence configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Create persisted reducers
const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedFilterReducer = persistReducer(persistConfig, filterReducer); // Persist the FilterSlice
const persistedCartReducer = persistReducer(persistConfig,cartReducer)

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    filter: persistedFilterReducer,
    cart:persistedCartReducer, // Add the persisted FilterSlice reducer to the store
    [ProductApi.reducerPath]: ProductApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: import.meta.env.NODE_ENV !== 'production',
    }).concat(ProductApi.middleware),
});

// Create persistor
export const persistor = persistStore(store);

// Export product query
export const { useGetProductQuery } = ProductApi;

export default store;
