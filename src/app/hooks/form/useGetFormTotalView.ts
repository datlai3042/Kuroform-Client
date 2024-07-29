import { onFetchTotalViews } from "@/app/_lib/redux/formAnswer.slice";
import FormAnswerService from "@/app/_services/formAnswer.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useGetFormTotalView = () => {
      const dispatch = useDispatch();

      const getFormTotalView = useQuery({
            queryKey: ["get-form-view"],
            queryFn: () => FormAnswerService.getFormTotalView(),
      });

      useEffect(() => {
            if (getFormTotalView.isSuccess) {
                  const { views } = getFormTotalView.data.metadata;
                  dispatch(onFetchTotalViews({ total_views: views }));
            }
      }, [getFormTotalView.isSuccess, dispatch, getFormTotalView.data?.metadata]);

      return getFormTotalView;
};

export default useGetFormTotalView;
