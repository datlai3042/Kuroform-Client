import Portal from "@/app/(NextClient)/_components/Portal";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import useUpdateForm from "@/app/hooks/useUpdateForm";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BoxChangeForm = () => {
      const { isDesignForm, setOpenFormDesign, setIsDesginForm, setOpenModelNotSave, setOpenButtonBottomSave } = useContext(FormDesignContext);
      const FormBackUp = useSelector((state: RootState) => state.form.formCoreBackUp);
      const formOriginal = useSelector((state: RootState) => state.form.formCoreOriginal);
      const dispatch = useDispatch();
      const onCancelDesign = () => {
            setOpenButtonBottomSave(false);
      };

      const updateFormAPI = useUpdateForm();

      const onSaveDesign = () => {
            updateFormAPI.mutate(formOriginal);
      };

      useEffect(() => {
            if (updateFormAPI.isSuccess) {
                  setOpenButtonBottomSave(false);
                  setIsDesginForm(false)
            }
      }, [updateFormAPI.isPending]);

      return (
            <Portal>
                  <div className="show-bottom-not-save fixed text-[1.4rem] text-text-theme z-[200] min-w-[12rem] gap-[1rem] mx-auto min-h-[4rem] p-[1.6rem_1rem] bg-color-section-theme border-[.1rem] border-[var(--border-color-input)] rounded-[.6rem] flex justify-center items-center left-[50%] translate-x-[-50%] shadow-2xl shadow-blue-700">
                        <div className="flex flex-col gap-[1.4rem]  min-w-[36rem] px-[1.6rem]">
                              <h5 className="whitespace-pre">Bạn có muốn lưu thay đổi Form</h5>
                              <div className="flex justify-end items-center gap-[.6rem]">
                                    {/* <button
                                    onClick={onCancelDesign}
                                    className="p-[.5rem_1rem] rounded-[.4rem] hover:border-[var(--border-color-input)] border-[.1rem] border-transparent"
                              >
                                    Từ từ
                              </button> */}
                                    <button
                                          onClick={onSaveDesign}
                                          className="p-[.5rem_1rem] rounded-[.4rem] bg-color-main opacity-80 hover:opacity-100 text-[#fff]"
                                    >
                                          Lưu
                                    </button>
                              </div>
                        </div>
                  </div>
            </Portal>
      );
};

export default BoxChangeForm;
