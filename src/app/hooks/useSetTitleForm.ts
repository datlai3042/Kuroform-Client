import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import FormService from "@/app/_services/form.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

type TProps = {};

const useSetTitleForm = () => {
      const dispatch = useDispatch();
      const queryClient = useQueryClient();

      const updateFormMutation = useMutation({
            mutationKey: ["set-title-form"],
            mutationFn: ({ form_id, value, plainText }: { form_id: string; value: string, plainText: string }) => FormService.setTitleForm({ form_id, value, plaint_text: plainText }),
            onSuccess: (res) => {
                  const { form } = res.metadata;
                  dispatch(onFetchForm({ form }));
                  queryClient.invalidateQueries({ queryKey: ["get-forms"] });
            },
      });

      return updateFormMutation;
};

export default useSetTitleForm;
