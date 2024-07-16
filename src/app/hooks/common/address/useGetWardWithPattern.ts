import AddressService from "@/app/_services/address.service";
import { useQuery } from "@tanstack/react-query";

type TProps = {
	district_code?: number;
};

const useGetWardWithPattern = (props: TProps) => {
	const { district_code } = props;

	const getWardWithPattern = useQuery({
		queryKey: ["get-all-provinces", district_code],
		queryFn: () => AddressService.getWardWithPattern({ district_code: district_code as number }),
		enabled: !!district_code,
	});

	return getWardWithPattern;
};

export default useGetWardWithPattern;
