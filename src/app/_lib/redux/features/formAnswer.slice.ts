import { FormCore } from "@/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
	formAnswerStore: {
		[key: string]: {
			type: "Answer";
			formAnswer: FormCore.FormAnswer.FormAnswerCore;
		};
	};
	form_total_views: number;
	form_total_answers: number;
};

const initialState: InitialState = {
	formAnswerStore: {},
	form_total_views: 0,
	form_total_answers: 0,
};

const formAnswerSlice = createSlice({
	name: "fornAnswer",
	initialState,
	reducers: {
		addFormAnswer: (
			state,
			data: PayloadAction<{ form_id: string; reports: FormCore.FormAnswer.FormAnswerCore }>
		) => {
			const { form_id, reports } = data.payload;
			console.log({ dispatch: data.type });
			state.formAnswerStore = { ...state.formAnswerStore };
			state.formAnswerStore[form_id] = { ...state.formAnswerStore[form_id], formAnswer: reports };
		},

		onFetchTotalViews: (state, data: PayloadAction<{ total_views: number }>) => {
			const { total_views } = data.payload;
			state.form_total_views = total_views;
		},

		onFetchTotalAnswer: (state, data: PayloadAction<{ total_answers: number }>) => {
			const { total_answers } = data.payload;

			state.form_total_answers = total_answers;
		},
	},
});

export const { addFormAnswer, onFetchTotalAnswer, onFetchTotalViews } = formAnswerSlice.actions;
export default formAnswerSlice.reducer;
