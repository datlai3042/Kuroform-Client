import { onFetchTotalViews } from "@/app/_lib/redux/features/formAnswer.slice";
import FormService from "@/app/_services/form.service";
import FormAnswerService from "@/app/_services/formAnswer.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useGetFormTotalView = () => {
	const dispatch = useDispatch();

	const getFormTotalView = useQuery({
		queryKey: ["get-form-view"],
		queryFn: () => FormAnswerService.getFormTotalView(),
	});

	useEffect(() => {
		if (getFormTotalView.isSuccess) {
			const { views } = getFormTotalView.data.metadata;
			dispatch(onFetchTotalViews({ total_views: views }));
		}
	}, [getFormTotalView.isSuccess, dispatch, getFormTotalView.data?.metadata]);

	return getFormTotalView;
};

export default useGetFormTotalView;
