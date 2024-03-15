import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'; // Import persistStore and persistReducer
import storage from 'redux-persist/lib/storage';
import { ProductApi } from '../slice/ProductSlice';
import userReducer from '../slice/UserSlice';

// defining persistence configuration
const persistConfig = {
  key: 'root',
  storage,
};

// creating persist reducer
const persistedReducer = persistReducer(persistConfig, userReducer); // Use a different name for the persisted reducer

const store = configureStore({
  reducer: {
    user: persistedReducer, // Use the persisted reducer
    [ProductApi.reducerPath]: ProductApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  
    getDefaultMiddleware({
      serializableCheck:import.meta.env.NODE_ENV !== 'production',
    }).concat(ProductApi.middleware),
});

// creating persistor
export const persistor = persistStore(store);

// Exporting product query
export const { useGetProductQuery } = ProductApi;
export default store