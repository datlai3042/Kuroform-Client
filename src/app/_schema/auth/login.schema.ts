import { validateEmail } from "@/app/_lib/utils";
import * as z from "zod";

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Email là bắt buộc" })
		.refine((e) => validateEmail(e), { message: "Email không hợp lệ" }),
	password: z.string().min(5, { message: "Ít nhất 5 kí tự" }),
});

export type LoginType = z.infer<typeof loginSchema>;
