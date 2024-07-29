"use client";

import { addOneToast, addOneToastError, addOneToastFormAnswer, addOneToastSuccess, addOneToastWarning } from "@/app/_lib/redux/toast.slice";
import { useDebouncedCallback } from "@mantine/hooks";
import React, { useId } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import ButtonDarkMode from "../../_components/ui/button/ButtonDarkMode";

const ToastPage = () => {
      const dispatch = useDispatch();

      const debounceSuccess = useDebouncedCallback(() => {
            const id = uuidv4();
            const message = Math.random().toString();
            dispatch(
                  addOneToastSuccess({
                        toast_item: { toast_title: "Hoàn thành", core: { message: "Thành công" }, _id: id, type: "SUCCESS" },
                  }),
            );
      }, 10);

      const debounceWarning = useDebouncedCallback(() => {
            const id = uuidv4();
            const message = Math.random().toString();
            dispatch(
                  addOneToastWarning({
                        toast_item: { toast_title: "Cẩn thận", core: { message: "Cảnh báo" }, _id: id, type: "WARNING" },
                  }),
            );
      }, 10);

      const debounceError = useDebouncedCallback(() => {
            const id = uuidv4();
            const message = Math.random().toString();
            dispatch(
                  addOneToastError({
                        toast_item: { toast_title: "Nguy hiểm", core: { message: "Xuất hiện lỗi" }, _id: id, type: "ERROR" },
                  }),
            );
      }, 10);

      const debounceFormAnswer = useDebouncedCallback(() => {
            const id = uuidv4();
            const message = Math.random().toString();
            dispatch(
                  addOneToastFormAnswer({
                        toast_item: {
                              toast_title: "Phản hồi",
                              core: { message: "Bạn nhận được 1 phản hồi từ Form", url: "" },
                              _id: id,
                              type: "FormAnswer",
                        },
                  }),
            );
      }, 10);

      return (
            <div className="relative w-full min-h-screen flex flex-col  gap-[2rem] text-[1.4rem] p-[10rem]">
                  <ButtonDarkMode />
                  <button onClick={debounceSuccess} className=" bg-toast-success rounded-lg text-[#fff] min-w-[16rem] max-w-[20rem] p-[1rem] h-[4rem]">
                        Thêm 1 toast thành công
                  </button>

                  <button onClick={debounceWarning} className=" bg-toast-warning rounded-lg text-[#fff] min-w-[16rem] max-w-[20rem] p-[1rem] h-[4rem]">
                        Thêm 1 toast cảnh bảo
                  </button>

                  <button onClick={debounceError} className=" bg-toast-error rounded-lg text-[#fff] min-w-[16rem] max-w-[20rem] p-[1rem] h-[4rem]">
                        Thêm 1 toast lỗi
                  </button>

                  <button onClick={debounceFormAnswer} className=" bg-blue-600 rounded-lg text-[#fff] min-w-[16rem] max-w-[20rem] p-[1rem] h-[4rem]">
                        Thêm 1 toast trả lời
                  </button>
            </div>
      );
};

export default ToastPage;
