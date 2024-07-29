import UserService from "@/app/_services/user.service";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

const useCreatePassword = () => {
      const dispatch = useDispatch();

      const createPassword = useMutation({
            mutationKey: ["create-password"],
            mutationFn: ({ password }: { password: string }) => UserService.createPassword({ password }),
      });

      return createPassword;
};

export default useCreatePassword;
