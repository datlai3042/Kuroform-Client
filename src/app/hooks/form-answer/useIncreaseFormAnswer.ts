import FormAnswerService from "@/app/_services/formAnswer.service";
import { useMutation } from "@tanstack/react-query";

type TProps = {};

const useIncreaseFormViews = () => {
      const increaseFormViews = useMutation({
            mutationKey: ["increase form answers"],
            mutationFn: ({ form_id }: { form_id: string }) => FormAnswerService.increaseViewFormAnswer({ form_id }),
      });

      return increaseFormViews;
};

export default useIncreaseFormViews;
