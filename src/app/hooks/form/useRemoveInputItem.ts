import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import FormInputService from "@/app/_services/FormInput.service";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

type TProps = {
      onAfterDelete?: () => void
}

const useRemoveInputItem = (props?: TProps) => {
      const dispatch = useDispatch();

      const removeInputItem = useMutation({
            mutationKey: ["remove input item"],
            mutationFn: ({ form_id, input_id }: { form_id: string; input_id: string }) => FormInputService.removeInputItem({ form_id, input_id }),
            onSuccess: (res) => {
                  const { form } = res.metadata;
                  dispatch(onFetchForm({ form }));
                  if(props && props?.onAfterDelete) {
                        props?.onAfterDelete()
                  }
            },
      });

      return removeInputItem;
};

export default useRemoveInputItem;
