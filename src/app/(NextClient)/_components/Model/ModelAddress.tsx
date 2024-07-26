import React, { useEffect, useMemo, useState } from "react";
import ModelScrollList, { ScorllDataItem } from "./ModelScrollList";
import useGetAllProvinces from "@/app/hooks/common/address/useGetAllProvinces";
import useGetDistrictWithPattern from "@/app/hooks/common/address/useGetDistrictWithPattern";
import useGetWardWithPattern from "@/app/hooks/common/address/useGetWardWithPattern";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { onFetchProvinces } from "@/app/_lib/redux/features/address.slice";
import { UI } from "@/type";

type TProps = {
      onCheckFullField?: (check: boolean) => void;
      onGetAddressCore?: (value: string) => void;
      onChange?: UI.Address.OnChange;
      detail?: boolean;
      defaultValue?: {
            province?: ScorllDataItem;
            district?: ScorllDataItem;
            ward?: ScorllDataItem;
            street?: string;
      };
};

type AddressItem = { code: number | undefined; name: string | undefined; name_with_type: string; path_with_type: string };

const ModelAddress = (props: TProps) => {
      const { onChange, detail = false, onCheckFullField, defaultValue } = props;

      const [province, setProvince] = useState<AddressItem>(
            defaultValue
                  ? {
                          code: +defaultValue?.province!.value,
                          name: defaultValue?.province?.label,
                          name_with_type: defaultValue.province?.name_with_type || "",
                          path_with_type: defaultValue.province?.name_with_type || "",
                    }
                  : { code: undefined, name: "", name_with_type: "", path_with_type: "" },
      );

      const [district, setDistrict] = useState<AddressItem>(
            defaultValue
                  ? {
                          code: +defaultValue?.district!.value,
                          name: defaultValue?.district?.label,
                          name_with_type: defaultValue.district?.name_with_type || "",
                          path_with_type: defaultValue.district?.path_with_type || "",
                    }
                  : { code: undefined, name: "", name_with_type: "", path_with_type: "" },
      );
      const [ward, setWard] = useState<AddressItem>(
            defaultValue
                  ? {
                          code: +defaultValue?.ward!.value,
                          name: defaultValue?.ward?.label,
                          name_with_type: defaultValue.ward?.name_with_type || "",
                          path_with_type: defaultValue.ward?.path_with_type || "",
                    }
                  : {
                          code: undefined,
                          name: "",
                          name_with_type: "",

                          path_with_type: "",
                    },
      );

      const [detailAddress, setDetalAddress] = useState<string>(defaultValue?.street || "");

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
                  newArray = districts.map((district) => ({
                        label: district.name,
                        value: district.code,
                        path_with_type: district.path_with_type,
                        name_with_type: district.name_with_type,
                  }));
            }
            return newArray;
      }, [province.code, districtAPI.isSuccess]);

      const renderWardsElement = useMemo(() => {
            let newArray: ScorllDataItem[] = [];
            if (wardAPI.isSuccess) {
                  const { wards } = wardAPI.data.metadata;
                  newArray = wards.map((ward) => ({
                        label: ward.name,
                        value: ward.code,
                        path_with_type: ward.path_with_type,
                        name_with_type: ward.name_with_type,
                  }));
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
                        name_with_type: province.name_with_type,
                        path_with_type: province.name_with_type,
                  })) as ScorllDataItem[];
            }
            dispatch(onFetchProvinces({ provinces: newArray }));
      }, [provincesAPI.isSuccess]);

      useEffect(() => {
            if (province.code || district.code || ward.code || detailAddress) {
                  if (onChange) {
                        const addressString = `${detail ? detailAddress : ""} `;
                        let name_with_type = "";
                        if (province.code && !district.code && !ward.code) {
                              name_with_type = province.path_with_type;
                        } else if (province.code && district.code && !ward.code) {
                              name_with_type = district.path_with_type;
                        } else if (province.code && district.code && ward.code) {
                              name_with_type = ward.path_with_type;
                        }
                        const address_full = `${detail ? detailAddress : ""} ${name_with_type}`;
                        const addressCore = name_with_type;
                        const addressValidate: UI.Address.AddressValidate = [
                              {
                                    type: "province",
                                    code: province?.code?.toString() as string,
                                    name_with_type: province.name_with_type,
                                    path_with_type: province.path_with_type,
                              },

                              {
                                    type: "district",
                                    code: district?.code?.toString() as string,
                                    name_with_type: district.name_with_type,
                                    path_with_type: district.path_with_type,
                              },

                              {
                                    type: "ward",
                                    code: ward?.code?.toString() as string,
                                    name_with_type: ward.name_with_type,
                                    path_with_type: ward.path_with_type,
                              },

                              {
                                    type: "street",
                                    code: "-1",
                                    name_with_type: province.code && district.code && ward.code && detailAddress ? addressString : "",
                                    path_with_type: province.code && district.code && ward.code && detailAddress ? addressString : "",
                              },
                        ];
                        console.log({ province, addressString, addressValidate });

                        onChange({ addressString, addressValidate, addressCore: addressCore, address_full });
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
            }
      }, [province, district, ward, detailAddress]);

      console.log({ defaultValue });

      return (
            <div className="p-[1rem_0rem] flex flex-col gap-[2rem]">
                  <div className="flex flex-col xl:flex-row flex-wrap gap-[2rem]">
                        <ModelScrollList
                              defaultValue={defaultValue?.province}
                              dataRender={provincesStore}
                              label="Tỉnh / Thành phố"
                              onChange={(province_item) => {
                                    if (province.code) {
                                          setClearSelect(true);
                                          setDistrict({ code: undefined, name: "", name_with_type: "", path_with_type: "" });
                                          setWard({ code: undefined, name: "", name_with_type: "", path_with_type: "" });
                                    }
                                    const { label, value, name_with_type, path_with_type } = province_item;
                                    setProvince(() => ({ code: +value, name: label, name_with_type, path_with_type }));
                              }}
                        />

                        <ModelScrollList
                              defaultValue={defaultValue?.district}
                              dataRender={renderDistrictsElement}
                              label="Quận / Huyện"
                              onChange={(district_item) => {
                                    if (clearSelect) {
                                          setClearSelect(false);
                                    }

                                    const { label, value, name_with_type, path_with_type } = district_item;
                                    setDistrict(() => ({ code: +value, name: label, name_with_type, path_with_type }));
                              }}
                              disable={typeof province.code === "undefined" ? true : false}
                              clear={clearSelect}
                        />

                        <ModelScrollList
                              defaultValue={defaultValue?.ward}
                              dataRender={renderWardsElement}
                              label="Phường / Xã"
                              onChange={(ward_item) => {
                                    if (clearSelect) {
                                          setClearSelect(false);
                                    }
                                    const { label, value, name_with_type, path_with_type } = ward_item;
                                    setWard(() => ({ code: +value, name: label, name_with_type, path_with_type }));
                              }}
                              disable={typeof province.code === "undefined" || typeof district.code === "undefined" ? true : false}
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
