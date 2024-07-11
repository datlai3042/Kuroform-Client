import { validateEmail } from "@/app/_lib/utils";
import * as z from "zod";

export const createPasswordSchema = z
	.object({
		password: z.string().min(5, { message: "Ít nhất 5 kí tự" }),
		confirm_password: z.string().min(5, { message: "Xác nhận mật khẩu phải 5 kí tự" }),
	})
	.refine((form) => form.password === form.confirm_password, {
		message: "Mật khẩu không khớp",
		path: ["confirm_password"],
	});

export type CreatePasswordType = z.infer<typeof createPasswordSchema>;
