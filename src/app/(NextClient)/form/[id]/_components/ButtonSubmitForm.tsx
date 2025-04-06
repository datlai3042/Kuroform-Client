import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import { FormCore, UI } from "@/type";
import React, { useContext, useEffect } from "react";
import { checkErrorFinal } from "./InputAnswer/_utils/formAnswer.uti";
import { useMutation } from "@tanstack/react-query";
import FormAnswerService from "@/app/_services/formAnswer.service";
import LoadingSpinner from "@/app/(NextClient)/_components/ui/loading/LoadingSpinner";
import { usePathname } from "next/navigation";

type TProps = {
      formCore: FormCore.Form;
};

const ButtonSubmitForm = (props: TProps) => {
      const { formCore } = props;

      const segment = usePathname();
      const tempMode = segment.startsWith("/form") && segment.endsWith("/edit");

      const {
            formAnswer: { inputFormRequire, inputFormErrors, inputFormData, submitState, form_answer_id },
            setFormAnswer,
      } = useContext(FormAnswerContext);


      const submitFormMutation = useMutation({
            mutationKey: ["add new report form"],
            mutationFn: (formAnswer: { form_id: string; answers: FormCore.FormAnswer.InputFormData[]; form_owner: string; form_answer_id: string }) =>
                  FormAnswerService.addNewFormReport(formAnswer),
      });

      useEffect(() => {
            if (submitFormMutation.isSuccess) {
                  setFormAnswer((prev) => ({ ...prev, submitState: "success" }));
            }
      }, [submitFormMutation.isSuccess, setFormAnswer]);

      const handleSubmit = () => {
            const checkRequire = inputFormRequire.every((ip) => ip.checkRequire);
            if (checkRequire && inputFormErrors.length === 0) {
                  const answers = inputFormData.map((ip) => {
                        if (ip.setting) delete ip.setting;
                        
                        return ip;
                  });

                  const payload = {
                        form_id: formCore._id,
                        form_owner: formCore.form_owner,
                        answers,
                        form_answer_id,
                  };

                  if (tempMode) {
                        return setFormAnswer((prev) => ({ ...prev, submitState: "success" }));
                  }
                  console.log({ "Dữ liệu submit cuối cùng": payload });
                  submitFormMutation.mutate(payload);
                  setFormAnswer((prev) => ({ ...prev, submitState: "pending" }));
                  return;
            }

            let inputErrorArray: FormCore.FormAnswer.InputFormError[] = [];
            inputErrorArray = checkErrorFinal(inputErrorArray, inputFormErrors, inputFormData);
            console.log({ "Các input lỗi": inputErrorArray });
            if (inputErrorArray.length > 0 || inputFormRequire.length > 0) {
                  setFormAnswer((prev) => ({ ...prev, inputFormErrors: inputErrorArray, openModelError: true }));
            }
      };

      return (
            <div
                  onClick={handleSubmit}
                  className="min-w-[10rem] w-max h-[3.2rem]  ml-auto flex items-center justify-center gap-[.5rem] rounded-[.4rem] hover:cursor-pointer bg-color-main"
            >
                  <ButtonNative textContent={formCore.form_button_text} className=" text-white text-[1.6rem] text-center px-[1rem]  w-max" />
                  {submitState === "pending" && <LoadingSpinner color="#ffffff" width="min-w-[2.4rem]" height="min-h-[2.4rem]"/>}
            </div>
      );
};

export default ButtonSubmitForm;
