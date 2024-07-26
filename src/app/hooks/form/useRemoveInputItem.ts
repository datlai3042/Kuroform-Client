import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import FormInputService from "@/app/_services/FormInput.service";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

const useRemoveInputItem = () => {
      const dispatch = useDispatch();

      const removeInputItem = useMutation({
            mutationKey: ["remove input item"],
            mutationFn: ({ form_id, input_id }: { form_id: string; input_id: string }) => FormInputService.removeInputItem({ form_id, input_id }),
            onSuccess: (res) => {
                  const { form } = res.metadata;
                  dispatch(onFetchForm({ form }));
            },
      });

      return removeInputItem;
};

export default useRemoveInputItem;
