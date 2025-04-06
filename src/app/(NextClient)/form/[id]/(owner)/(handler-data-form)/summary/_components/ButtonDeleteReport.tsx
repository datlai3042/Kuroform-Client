import useDeleteOneReport from "@/app/hooks/form-answer/useDeleteOneReport";
import { Trash2 } from "lucide-react";
import React from "react";

type TProps = {
      formId: string;
      reportId: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonDeleteReport = (props: TProps) => {
      const { formId, reportId, ...rest } = props;
      const deleteOneReportFunc = useDeleteOneReport();

      const deleteOneReportAPI = () => {
            deleteOneReportFunc.mutate({ form_id: formId, report_id: reportId });
      };

      return (
            <button
                  onClick={(e) => {
                        e.preventDefault();
                        deleteOneReportAPI();
                  }}
                  className="flex items-center gap-[1rem] p-[.5rem_.7rem] bg-color-main text-[#fff] rounded-lg"
                  {...rest}
            >
                  {" "}
                  <Trash2 size={16} />
                  {rest.children && rest.children}
            </button>
      );
};

export default ButtonDeleteReport;
