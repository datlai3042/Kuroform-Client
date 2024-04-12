import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authentication.slice";
const store = configureStore({
	reducer: { authReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
