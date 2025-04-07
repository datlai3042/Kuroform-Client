import { User } from "@/type";
import Http from "../_lib/http";
import { ResponseApi } from "../_schema/api/response.shema";
import { UserType } from "../_schema/user/user.type";

class UserService {
	static async me() {
		return Http.get<ResponseApi<{ user: UserType }>>("/v1/api/account/me", { credentials: "include" });
	}

	static async uploadAvatar(file: User.uploadFile) {
		return Http.post<ResponseApi<{ user: UserType }>>("/v1/api/account/upload-avatar", file);
	}

	static async createPassword({ password }: { password: string }) {
		return Http.post<ResponseApi<{ user: UserType }>>("/v1/api/account/create-password", { password });
	}

	static async updatePassword({ password, new_password }: { password: string; new_password: string }) {
		const payload = { password, new_password };
		return Http.post<ResponseApi<{ user: UserType }>>("/v1/api/account/update-password", payload);
	}
	static async updateAccount({user}: {user: UserType}) {
		return Http.post<ResponseApi<{ user: UserType }>>("/v1/api/account/update-account", user);
	}

}

export default UserService;
