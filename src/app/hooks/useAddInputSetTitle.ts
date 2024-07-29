import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import FormInputService from "@/app/_services/FormInput.service";
import { FormCore } from "@/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

type TProps = {};

const useAddInputSetTitle = () => {
      const dispatch = useDispatch();
      const queryClient = useQueryClient();

      const updateFormMutation = useMutation({
            mutationKey: ["add-input-form"],
            mutationFn: ({ form, title }: { form: FormCore.Form; title: string }) => FormInputService.addInputSetTitle(form, title),
            onSuccess: (res) => {
                  const { form } = res.metadata;
                  dispatch(onFetchForm({ form }));
                  queryClient.invalidateQueries({ queryKey: ["get-forms"] });
            },
      });

      return updateFormMutation;
};

export default useAddInputSetTitle;
