import { FormCore } from "@/type";
import Http from "../_lib/http";
import { ResponseApi } from "../_schema/api/response.shema";

export interface UploadFileAnswer extends FormData {
	append(name: "file" | "form_answers_id" | "form_id", value: string | Blob, fileName?: string): void;
}

class FormAnswerService {
	static async addNewFormReport(formAnswer: {
		form_id: string;
		answers: FormCore.FormAnswer.InputFormData[];
		form_owner: string;
		form_answer_id: string;
	}) {
		return Http.post<{ message: string }>("/v1/api/form-answer/add-new-form-report", { formAnswer });
	}

	static async getFormAnswer(form_id: string) {
		return Http.get<ResponseApi<{ formAnswer: FormCore.FormAnswer.FormAnswerCore }>>(
			`/v1/api/form-answer/get-form-answer?form_id=${form_id}`
		);
	}

	static async getFormTotalView() {
		return Http.get<ResponseApi<{ views: number }>>(`/v1/api/form-answer/get-form-view`);
	}

	static async getTotalFormAnswer() {
		return Http.get<ResponseApi<{ total: number }>>(`/v1/api/form-answer/get-total-form-answer`);
	}

	static async uploadLoadFile(formData: UploadFileAnswer) {
		return Http.post<ResponseApi<{ form_answer_res: FormCore.FormAnswer.OneReport; url: string }>>(
			"/v1/api/form-answer/upload-file-answers",
			formData
		);
	}
}

export default FormAnswerService;
