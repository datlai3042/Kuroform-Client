import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type RenderBaseOnApi = {
      type: "403" | "401" | "404" | "500" | null;
};

const initialState: RenderBaseOnApi = {
      type: null,
};

const renderBaseOnApiSlice = createSlice({
      initialState,
      name: "RenderBaseOnApi",
      reducers: {
            fetchStatusCode: (state, data: PayloadAction<RenderBaseOnApi>) => {
                  const { type } = data.payload;
                  state.type = type;
            },
      },
});

export const { fetchStatusCode } = renderBaseOnApiSlice.actions;
export default renderBaseOnApiSlice.reducer;
