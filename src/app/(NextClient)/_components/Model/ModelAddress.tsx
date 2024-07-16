import React, { useEffect, useMemo, useState } from "react";
import ModelScrollList, { ScorllDataItem } from "./ModelScrollList";
import useGetAllProvinces from "@/app/hooks/common/address/useGetAllProvinces";
import useGetDistrictWithPattern from "@/app/hooks/common/address/useGetDistrictWithPattern";
import useGetWardWithPattern from "@/app/hooks/common/address/useGetWardWithPattern";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { onFetchProvinces } from "@/app/_lib/redux/features/address.slice";

type TProps = {
	onCheckFullField?: (check: boolean) => void;

	onChange?: (address: string) => void;
	detail?: boolean;
};

type AddressItem = { code: number | undefined; name: string };

const ModelAddress = (props: TProps) => {
	const { onChange, detail = false, onCheckFullField } = props;

	const [province, setProvince] = useState<AddressItem>({ code: undefined, name: "" });
	const [district, setDistrict] = useState<AddressItem>({ code: undefined, name: "" });
	const [ward, setWard] = useState<AddressItem>({ code: undefined, name: "" });

	const [detailAddress, setDetalAddress] = useState<string>("");

	const provincesStore = useSelector((state: RootState) => state.address.provinces);
	const dispatch = useDispatch();

	const provincesAPI = useGetAllProvinces();
	const districtAPI = useGetDistrictWithPattern({ province_code: province.code });
	const wardAPI = useGetWardWithPattern({ district_code: district.code });

	const [clearSelect, setClearSelect] = useState(false);

	const renderDistrictsElement = useMemo(() => {
		let newArray: ScorllDataItem[] = [];
		if (districtAPI.isSuccess) {
			const { districts } = districtAPI.data.metadata;
			newArray = districts.map((district) => ({ label: district.name, value: district.code }));
		}
		return newArray;
	}, [province.code, districtAPI.isSuccess]);

	const renderWardsElement = useMemo(() => {
		let newArray: ScorllDataItem[] = [];
		if (wardAPI.isSuccess) {
			const { wards } = wardAPI.data.metadata;
			newArray = wards.map((ward) => ({ label: ward.name, value: ward.code }));
		}
		return newArray;
	}, [provincesStore, district.code, wardAPI.isSuccess]);

	useEffect(() => {
		if (provincesStore.length > 0) return;
		let newArray: ScorllDataItem[] = [];
		if (provincesAPI.isSuccess) {
			const { provinces } = provincesAPI.data?.metadata;
			newArray = provinces.map((province) => ({
				label: province.name,
				value: province.code,
			})) as ScorllDataItem[];
		}
		dispatch(onFetchProvinces({ provinces: newArray }));
	}, [provincesAPI.isSuccess]);

	useEffect(() => {
		if (onChange) {
			const address = `${detail ? detailAddress : ""} ${ward.name || ""} ${district.name || ""} ${
				province.name || ""
			}`;
			onChange(address.trim());
		}
		if (onCheckFullField) {
			if (detail) {
				const check = !!province.name && !!district.name && !!ward.name && !!detailAddress;
				return onCheckFullField(check);
			} else {
				const check = !!province.name && !!district.name && !!ward.name;
				return onCheckFullField(check);
			}
		}
	}, [province, district, ward, detailAddress]);

	return (
		<div className="p-[1rem_0rem] flex flex-col gap-[2rem]">
			<div className="flex gap-[2rem]">
				<ModelScrollList
					dataRender={provincesStore}
					label="Tỉnh / Thành phố"
					onChange={(province_item) => {
						if (province.code) {
							setClearSelect(true);
							setDistrict({ code: undefined, name: "" });
							setWard({ code: undefined, name: "" });
						}
						const { label, value } = province_item;
						setProvince(() => ({ code: +value, name: label }));
					}}
				/>

				<ModelScrollList
					dataRender={renderDistrictsElement}
					label="Quận / Huyện"
					onChange={(district_item) => {
						if (clearSelect) {
							setClearSelect(false);
						}

						const { label, value } = district_item;
						setDistrict(() => ({ code: +value, name: label }));
					}}
					disable={typeof province.code === "undefined" ? true : false}
					clear={clearSelect}
				/>

				<ModelScrollList
					dataRender={renderWardsElement}
					label="Phường / Xã"
					onChange={(ward_item) => {
						if (clearSelect) {
							setClearSelect(false);
						}
						const { label, value } = ward_item;
						setWard(() => ({ code: +value, name: label }));
					}}
					disable={
						typeof province.code === "undefined" || typeof district.code === "undefined" ? true : false
					}
					clear={clearSelect}
				/>
			</div>

			{detail && (
				<input
					value={detailAddress}
					onChange={(e) => setDetalAddress(e.target.value)}
					placeholder="Nhập địa chỉ chi tiết"
					className="heading-answer group w-full h-[4rem] px-[.8rem] flex items-center  text-[1.4rem] break-words whitespace-pre-wrap  border-b-[.1rem] border-gray-300 rounded-lg outline-none resize-none text-[#000]"
				/>
			)}
		</div>
	);
};

export default ModelAddress;
