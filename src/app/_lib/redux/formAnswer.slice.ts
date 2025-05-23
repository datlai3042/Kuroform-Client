import { FormCore } from "@/type";
import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";

type InitialState = {
      formAnswerStore: {
            [key: string]: {
                  type?: "Answer";
                  formAnswer?: FormCore.FormAnswer.FormAnswerCore;
                  update?: boolean;
            } | null;
      };
      form_total_views: number;
      form_total_answers: number;
};

const initialState: InitialState = {
      formAnswerStore: {},
      form_total_views: -1,
      form_total_answers: -1,
};

const formAnswerSlice = createSlice({
      name: "fornAnswer",
      initialState,
      reducers: {
            addFormAnswer: (state, data: PayloadAction<{ form_id: string; reports: FormCore.FormAnswer.FormAnswerCore }>) => {
                  const { form_id, reports } = data.payload;
                  state.formAnswerStore = { ...state.formAnswerStore };
                  state.formAnswerStore[form_id] = { ...state.formAnswerStore[form_id], formAnswer: reports, update: false };
            },

            clearFormAnswer: (state, data: PayloadAction<{ form_id: string }>) => {
                  const { form_id } = data.payload;
                  if (state.formAnswerStore[form_id]) {
                        state.formAnswerStore = { ...state.formAnswerStore };
                        delete state.formAnswerStore[form_id]
                  }

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

export const { addFormAnswer, onFetchTotalAnswer, onFetchTotalViews, clearFormAnswer } = formAnswerSlice.actions;
export default formAnswerSlice.reducer;
