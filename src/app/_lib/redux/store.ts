import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authentication.slice";
import formEditSlice from "./features/formEdit.slice";
import formAnswerSlice from "./features/formAnswer.slice";
import notificationSlice from "./features/notification.slice";
import toastSlice from "./features/toast.slice";
import dataFormSlice from "./features/dataForm.slice";
import addressSlice from "./features/address.slice";
const store = configureStore({
	reducer: {
		authReducer,
		form: formEditSlice,
		formAsnwer: formAnswerSlice,
		notification: notificationSlice,
		toast: toastSlice,
		dataFormHandler: dataFormSlice,
		address: addressSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
