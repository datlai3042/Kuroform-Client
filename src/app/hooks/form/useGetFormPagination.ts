import FormService from "@/app/_services/form.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

type TProps = {
	page: number;
	limit: number;
};

export const useGetFormPagination = (props: TProps) => {
	const { limit, page } = props;

	const getFormPagination = useQuery({
		queryKey: ["get-form-pagination", page, limit],
		queryFn: () => FormService.getFormPagination({ page, limit }),
		placeholderData: keepPreviousData,
	});

	return getFormPagination;
};

export default useGetFormPagination;
