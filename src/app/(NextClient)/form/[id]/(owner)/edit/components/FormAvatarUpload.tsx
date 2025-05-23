import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import LoadingSpinner from "@/app/(NextClient)/_components/ui/loading/LoadingSpinner";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import FormService from "@/app/_services/form.service";
import { FormCore, ReactCustom } from "@/type";
import { useMutation } from "@tanstack/react-query";
import { Trash2, Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { superValidateImage } from "../../../_components/InputAnswer/_validate/inputImage.validate";
import { addOneToastError } from "@/app/_lib/redux/toast.slice";
import { v4 } from "uuid";
import useDisableBodyScroll from "@/app/hooks/useDisalbeBodyScroll";

type Mode = "UPLOAD" | "COLOR";

type TProps = {
      setOpenModel: ReactCustom.SetStateBoolean;
};

const FormAvatarUpload = (props: TProps) => {
      const { setOpenModel } = props;

      const [mode, setMode] = useState<Mode>("UPLOAD");
      const dispatch = useDispatch();
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
      useDisableBodyScroll()
      const color = formCore.form_title.form_title_color ? formCore.form_title.form_title_color : formCore.form_setting_default.form_title_color_default;

      const fileUploadMutation = useMutation({
            mutationKey: ["upload-avatar-form"],
            mutationFn: (infoForm: FormCore.uploadFile) => FormService.uploadAvatar(infoForm),
            onSuccess: (res) => {
                  const { form } = res.metadata;
                  dispatch(onFetchForm({ form }));
                  setOpenModel(false);
            },
      });

      // useEffect(() => {
      // 	if (fileUploadMutation.isSuccess) {
      // 		const { form } = fileUploadMutation.data.metadata;
      // 		dispatch(onFetchForm({ form }));

      // 		// setformCore((prev) => ({ ...prev, form_avatar: form }));
      // 	}
      // }, [fileUploadMutation.isSuccess, fileUploadMutation.data, dispatch]);

      const deleteCoverMutaion = useMutation({
            mutationKey: ["delete-avatar-form"],
            mutationFn: ({ id, mode }: { id: string; mode: "Image" | "NoFile" }) => FormService.deleteAvatar(id, mode),
            onSuccess: (res) => {
                  const { form } = res.metadata;
                  dispatch(onFetchForm({ form }));
                  setOpenModel(false);
            },
      });

      const inputCoverRef = useRef<HTMLInputElement | null>(null);

      const onClickBtnChangeAvatar = () => {
            if (inputCoverRef.current) {
                  inputCoverRef.current.click();
            }
      };

      const actionDelete = () => {
            const mode = formCore.form_avatar?.form_avatar_url ? "Image" : "NoFile";
            deleteCoverMutaion.mutate({ id: formCore._id, mode });
      };

      const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];

                  const { _check, message } = superValidateImage({ file, sizeAllowOptions: 2 });
                  if (!_check) {
                        return dispatch(addOneToastError({ toast_item: { _id: v4(), type: "ERROR", core: { message }, toast_title: "Lỗi File Upload" } }));
                  }
                  const formData: FormCore.uploadFile = new FormData();
                  formData.append("file", file);
                  formData.append("form_id", formCore._id);
                  fileUploadMutation.mutate(formData);
            }
      };

      const styleEffect = {
            onActive: (modeContent: Mode) => {
                  if (modeContent === mode) {
                        return "border-slate-900";
                  }
                  return "border-transparent";
            },
      };




      return (
            <DivNative className="bg-color-section-theme w-full h-full flex flex-col ">
                  <DivNative className="h-[10%] px-[2.2rem] flex justify-between border-b-[.1rem] border-[var(--border-color-input)]">
                        <DivNative className="flex gap-[2rem]">
                              <ButtonNative
                                    onClick={() => setMode("UPLOAD")}
                                    className={`${styleEffect.onActive(
                                          "UPLOAD",
                                    )}  h-full w-max flex items-center border-b-[.2rem]  hover:border-slate-900 text-[1.6rem] font-bold text-text-theme`}
                                    textContent="Tải ảnh lên"
                              />
                        </DivNative>

                        {(formCore.form_avatar_state || formCore.form_avatar?.form_avatar_url) && (
                              <button
                                    className="flex items-center gap-[.5rem] text-[1.6rem] font-bold text-text-theme"
                                    onClick={actionDelete}
                                    disabled={deleteCoverMutaion.isPending}
                              >
                                    <Trash2 size={16} />
                                    Xóa
                              </button>
                        )}
                  </DivNative>

                  {mode === "UPLOAD" && !fileUploadMutation.isPending && (
                        <ButtonNative
                              className="flex-1 w-full h-full p-[2rem] hover:cursor-pointer text-text-theme"
                              textContent=""
                              disabled={fileUploadMutation.isPending}
                              onClick={onClickBtnChangeAvatar}
                        >
                              <input ref={inputCoverRef} type="file" className="hidden" onChange={onChangeFile} />
                              <DivNative className="w-full h-full border-[.1rem] text-text-theme border-dashed border-[var(--border-color-input)] flex flex-col justify-center items-center gap-[1rem] text-[2rem] ">
                                    <Upload size={28} />
                                    Chọn file để tải lên
                              </DivNative>
                        </ButtonNative>
                  )}

                  {mode === "UPLOAD" && fileUploadMutation.isPending && (
                        <div className="w-full h-full flex justify-center items-center">
                              <LoadingSpinner color={color} />
                        </div>
                  )}
            </DivNative>
      );
};

export default FormAvatarUpload;
