import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import FormAnswerService, { UploadFileAnswer } from "@/app/_services/formAnswer.service";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

type TProps = {};

const useIncreaseFormViews = () => {
	const increaseFormViews = useMutation({
		mutationKey: ["increase form answers"],
		mutationFn: ({ form_id }: { form_id: string }) => FormAnswerService.increaseViewFormAnswer({ form_id }),
	});

	return increaseFormViews;
};

export default useIncreaseFormViews;
