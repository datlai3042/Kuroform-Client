import { UserType } from "../user/user.schema";

export type ResponseApi<Metadata> = {
	code: number;
	message: string;
	metadata: Metadata;
};

export type ResponseAuth = {
	user: UserType;
	token: {
		access_token: string;
		refresh_token: string;
	};
};
