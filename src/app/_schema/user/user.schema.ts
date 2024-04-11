type UserGender = "MALE" | "FEMALE" | "OTHER";
type ClondinaryType = {
	secure_url: string;
	public_id: string;
};

type UserRole = "USER" | "ADMIN" | "GUEST";

type UserAvatar = ClondinaryType & {
	date: Date;
};

export type UserType = {
	user_email: string;
	user_password: string;
	user_birthday: Date;
	user_gender: UserGender;
	user_roles: UserRole;
	user_avatar_system: string;
	user_avatar_current: UserAvatar;
	user_avater_used: UserAvatar[];
};
