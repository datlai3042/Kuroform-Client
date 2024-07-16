import AddressService from "@/app/_services/address.service";
import { useQuery } from "@tanstack/react-query";

type TProps = {
	province_code?: number;
};

const useGetDistrictWithPattern = (props: TProps) => {
	const { province_code } = props;

	const getDistrictWithPattern = useQuery({
		queryKey: ["get-all-provinces", province_code],
		queryFn: () => AddressService.getDistrictWithPattern({ province_code: province_code as number }),
		enabled: !!province_code,
	});

	return getDistrictWithPattern;
};

export default useGetDistrictWithPattern;
