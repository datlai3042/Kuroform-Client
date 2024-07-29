"use client";
import useSearchFormName from "@/app/hooks/form/search/useSearchFormName";
import React from "react";
import DashboardFormSearchItem from "./DashboardFormSearchItem";

type TProps = {
      search: string;
};

const DashboardSearchResult = (props: TProps) => {
      const { search } = props;

      const formSearchResult = useSearchFormName({ enabled: !!search, text: search });

      return (
            <div className="min-w-[30rem] w-full bg-[#fff] min-h-full h-full max-h-max">
                  {formSearchResult?.data?.metadata?.forms?.map((form) => <DashboardFormSearchItem form={form} key={form._id} />)}

                  {formSearchResult?.data?.metadata?.forms?.length === 0 && (
                        <div className="min-w-full min-h-[4rem] flex items-center px-[1rem]">Không tìm thấy không tin</div>
                  )}

                  {!search && <div className="min-w-full min-h-[4rem] flex items-center px-[1rem]">Hãy nhập tên Form bạn muốn tìm kiếm</div>}
            </div>
      );
};

export default DashboardSearchResult;
