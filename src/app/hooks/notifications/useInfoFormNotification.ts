import FormService from "@/app/_services/form.service";
import { useQuery } from "@tanstack/react-query";

const useInfoFormNotification = ({ form_id, active, notification_id }: { form_id: string; active: boolean; notification_id: string }) => {
      const infoFormNotification = useQuery({
            queryKey: ["info-form-notification", form_id],
            queryFn: () => FormService.getInfoFormNotification({ form_id, notification_id }),
            enabled: active,
      });

      return infoFormNotification;
};

export default useInfoFormNotification;
