import FormService from "@/app/_services/form.service";
import { useQuery } from "@tanstack/react-query";

type TProps = {
	enabled: boolean;
	text: string;
};

export const useSearchFormName = (props: TProps) => {
	const { enabled, text } = props;

	const searchFormName = useQuery({
		queryKey: ["search", text],
		queryFn: () => FormService.getSearch({ text }),
		enabled,
	});

	return searchFormName;
};

export default useSearchFormName;
