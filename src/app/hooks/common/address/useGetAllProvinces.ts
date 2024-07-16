import AddressService from "@/app/_services/address.service";
import { useQuery } from "@tanstack/react-query";

const useGetAllProvinces = () => {
	const getAllProvinces = useQuery({
		queryKey: ["get-all-provinces"],
		queryFn: () => AddressService.getAllProvinces(),
	});

	return getAllProvinces;
};

export default useGetAllProvinces;
