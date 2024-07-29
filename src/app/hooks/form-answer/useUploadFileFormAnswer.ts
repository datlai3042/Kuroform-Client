import { superValidateImage } from "@/app/(NextClient)/form/[id]/_components/InputAnswer/_validate/inputImage.validate";
import { addOneToastError } from "@/app/_lib/redux/toast.slice";
import FormAnswerService, { UploadFileAnswer } from "@/app/_services/formAnswer.service";
import { useMutation } from "@tanstack/react-query";
import { SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";

type TProps = {
      setWriteCallback: React.Dispatch<SetStateAction<boolean>>;
      setFilePreviewCallback: React.Dispatch<SetStateAction<string>>;
      form_answer_id: string;
      form_id: string;
      mode: boolean;
};

const useUploadFileFormAnswers = (props: TProps) => {
      const { form_id, form_answer_id, mode, setFilePreviewCallback, setWriteCallback } = props;

      const dispatch = useDispatch();

      const uploadFileFormAnswerAPI = useMutation({
            mutationKey: ["upload-file-form-answers"],
            mutationFn: (FormData: UploadFileAnswer) => FormAnswerService.uploadLoadFile(FormData),
      });

      const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                  setWriteCallback(true);
                  const file = e.target.files[0];
                  const { _check, message } = superValidateImage({ file });
                  if (!_check) {
                        return dispatch(addOneToastError({ toast_item: { _id: v4(), type: "ERROR", core: { message }, toast_title: "Lỗi File Upload" } }));
                  }
                  const formData: UploadFileAnswer = new FormData();
                  formData.append("file", file);
                  formData.append("form_answers_id", form_answer_id);
                  formData.append("form_id", form_id);

                  const link_preview = URL.createObjectURL(file);
                  setFilePreviewCallback(link_preview);
                  if (mode) return;
                  uploadFileFormAnswerAPI.mutate(formData);
            }
      };

      return { uploadFileFormAnswerAPI, handleUpload };
};

export default useUploadFileFormAnswers;
