import { onFetchUser } from "@/app/_lib/redux/authentication.slice";
import { UserType } from "@/app/_schema/user/user.type"
import UserService from "@/app/_services/user.service"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useUpdateAccount = () => {
    const dispatch = useDispatch();

    const updateAccountHook = useMutation({
        mutationKey: ['update-user'],
        mutationFn: ({ user }: { user: UserType }) => UserService.updateAccount({ user }),
        onError: (error: Error & {payload: {message: string, detail:string}}) => {return error}

    })
    useEffect(() => {
        if (updateAccountHook.isSuccess) {
            const { user } = updateAccountHook.data.metadata;
            dispatch(onFetchUser({ user }));
        }
    }, [updateAccountHook.isSuccess]);

    return updateAccountHook

}



export default useUpdateAccount