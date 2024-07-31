import AuthService from "@/app/_services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useLogout = () => {

const router = useRouter()

    
    const logoutHook = useMutation({
        mutationKey: ["logout"],
        mutationFn: () => AuthService.logoutNextClient(),
        onSuccess: () => {
              router.push("/");
        },
  });

  return logoutHook
}



export default useLogout