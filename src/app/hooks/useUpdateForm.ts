import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import FormService from "@/app/_services/form.service";
import { FormCore } from "@/type";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

type TProps = {};

const useUpdateForm = () => {
      const dispatch = useDispatch();

      const updateFormMutation = useMutation({
            mutationKey: ["update-form"],
            mutationFn: (form: FormCore.Form) => FormService.updateForm(form),
            onSuccess: (res) => {
                  const { form } = res.metadata;
                  dispatch(onFetchForm({ form }));
            },
      });

      return updateFormMutation;
};

export default useUpdateForm;
