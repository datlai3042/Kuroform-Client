import { onFetchUser } from "@/app/_lib/redux/features/authentication.slice";
import UserService from "@/app/_services/user.service";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useUpdatePassword = () => {
	const dispatch = useDispatch();

	const updatePassword = useMutation({
		mutationKey: ["create-password"],
		mutationFn: ({ password, new_password }: { password: string; new_password: string }) =>
			UserService.updatePassword({ password, new_password }),
	});

	useEffect(() => {
		if (updatePassword.isSuccess) {
			const { user } = updatePassword.data.metadata;
			dispatch(onFetchUser({ user }));
		}
	}, [updatePassword.isSuccess]);

	return updatePassword;
};

export default useUpdatePassword;
