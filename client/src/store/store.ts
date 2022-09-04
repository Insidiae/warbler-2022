import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { api } from "./services/api";
import authSlice from "./auth/authSlice";

import type { PersistConfig } from "redux-persist";

const rootReducer = combineReducers({
	auth: authSlice,
	[api.reducerPath]: api.reducer,
});

type RootReducerState = ReturnType<typeof rootReducer>;

type ExtendedPersistConfig = PersistConfig<RootReducerState> & {
	whitelist: (keyof RootReducerState)[];
};

const persistConfig: ExtendedPersistConfig = {
	key: "root",
	storage,
	whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(api.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
