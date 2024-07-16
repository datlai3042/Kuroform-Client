import { ScorllDataItem } from "@/app/(NextClient)/_components/Model/ModelScrollList";
import { API } from "@/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = {
	provinces: ScorllDataItem[];
	districts: ScorllDataItem[];
	wards: ScorllDataItem[];
};

const initialState: State = {
	provinces: [],
	districts: [],
	wards: [],
};

const addressSlice = createSlice({
	name: "address",
	initialState,
	reducers: {
		onFetchProvinces: (state, data: PayloadAction<{ provinces: ScorllDataItem[] }>) => {
			state.provinces = data.payload.provinces;
		},

		onFetchDistricts: (state, data: PayloadAction<{ districts: ScorllDataItem[] }>) => {
			state.districts = data.payload.districts;
		},

		onFetchWards: (state, data: PayloadAction<{ wards: ScorllDataItem[] }>) => {
			state.wards = data.payload.wards;
		},
	},
});

export const { onFetchProvinces, onFetchDistricts, onFetchWards } = addressSlice.actions;
export default addressSlice.reducer;
