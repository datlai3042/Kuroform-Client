import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import FormAnswerService, { UploadFileAnswer } from "@/app/_services/formAnswer.service";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

type TProps = {};

const useUploadFileFormAnswers = () => {
	const dispatch = useDispatch();

	const uploadFileFormAnswer = useMutation({
		mutationKey: ["upload-file-form-answers"],
		mutationFn: (FormData: UploadFileAnswer) => FormAnswerService.uploadLoadFile(FormData),
	});

	return uploadFileFormAnswer;
};

export default useUploadFileFormAnswers;
