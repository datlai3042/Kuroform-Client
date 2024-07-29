import { onFetchFormState } from "@/app/_lib/redux/formEdit.slice";
import FormService from "@/app/_services/form.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useGetAllFormState = () => {
      const dispatch = useDispatch();

      const getAllFormState = useQuery({
            queryKey: ["get-all-form-state"],
            queryFn: () => FormService.getAllFormState(),
      });

      useEffect(() => {
            if (getAllFormState.isSuccess) {
                  const { formPublic, formDelete, formPrivate } = getAllFormState.data.metadata;
                  dispatch(onFetchFormState({ form_delete: formDelete, form_private: formPrivate, form_public: formPublic }));
            }
      }, [getAllFormState.isSuccess, dispatch, getAllFormState.data?.metadata]);

      return getAllFormState;
};

export default useGetAllFormState;
