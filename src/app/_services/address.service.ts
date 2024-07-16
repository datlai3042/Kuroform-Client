import { API } from "@/type";
import Http from "../_lib/http";
import { ResponseApi } from "../_schema/api/response.shema";

class AddressService {
	static async getAllProvinces() {
		return Http.get<ResponseApi<{ provinces: API.Common.Address.Province[] }>>(
			"/v1/api/common/address/get-all-provinces"
		);
	}

	static async getDistrictWithPattern({ province_code }: { province_code: number }) {
		return Http.get<ResponseApi<{ districts: API.Common.Address.District[] }>>(
			`/v1/api/common/address/get-district-with-pattern?province_code=${province_code}`
		);
	}

	static async getWardWithPattern({ district_code }: { district_code: number }) {
		return Http.get<ResponseApi<{ wards: API.Common.Address.Ward[] }>>(
			`/v1/api/common/address/get-ward-with-pattern?district_code=${district_code}`
		);
	}
}

export default AddressService;
