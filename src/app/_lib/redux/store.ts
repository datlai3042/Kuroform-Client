import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authentication.slice";
import formEditSlice from "./formEdit.slice";
import formAnswerSlice from "./formAnswer.slice";
import notificationSlice from "./notification.slice";
import toastSlice from "./toast.slice";
import dataFormSlice from "./dataForm.slice";
import addressSlice from "./address.slice";
import renderBaseOnApiSlice from "./renderBaseOnApi";
const store = configureStore({
      reducer: {
            authReducer,
            form: formEditSlice,
            formAsnwer: formAnswerSlice,
            notification: notificationSlice,
            toast: toastSlice,
            dataFormHandler: dataFormSlice,
            address: addressSlice,
            renderBaseOnApi: renderBaseOnApiSlice,
      },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
