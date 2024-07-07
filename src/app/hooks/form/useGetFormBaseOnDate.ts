import FormService from "@/app/_services/form.service";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetFormBaseOnDate = () => {
	const getFormBaseOnDate = useMutation({
		mutationKey: ["get-form-base-on-date"],
		mutationFn: ({ date_begin, date_over }: { date_begin: string; date_over: string }) =>
			FormService.getFormBaseOnDate({ date_begin, date_over }),
	});

	return getFormBaseOnDate;
};

export default useGetFormBaseOnDate;
