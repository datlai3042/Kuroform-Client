import { renderPageArrayLast, renderPageArrayMiddle, renderPageArrayNormal } from "@/app/utils/pagination.utit";
import React, { SetStateAction, useEffect, useRef, useState } from "react";

type TProps = {
      page: number;
      setPage: React.Dispatch<SetStateAction<number>>;
      total_page: number;
};

const DashboardPagination = (props: TProps) => {
      const { page, setPage, total_page } = props;

      const max_show_page = total_page < 10 ? total_page : 10;

      const [pageRender, setPageRender] = useState<number[]>(() => {
            let pageArrayInitial: number[] = [];
            pageArrayInitial = Array(max_show_page)
                  .fill(0)
                  .map((_, i) => {
                        return i + 1;
                  });

            return pageArrayInitial;
      });

      const onStylePageCurrent = (_index: number) =>
            _index === page ? "bg-color-main text-[#fff]" : " bg-color-section-theme text-text-theme hover:text-[#fff] hover:bg-color-main";

      const onChangePage = (_pageSelct: number) => setPage(_pageSelct);
      useEffect(() => {
            // const middle = MAX_PAGE_SHOW - ()

            const limit_render = total_page - page <= 6;

            if (page === 1) return;
            if (page === total_page) return;
            if (page <= 5) {
                  return renderPageArrayNormal({ max_show_page, page, cb: setPageRender });
            }

            if (page > 5 && !limit_render) {
                  return renderPageArrayMiddle({ max_show_page, page, cb: setPageRender });
            }

            return renderPageArrayLast({ max_show_page, page, total_page, cb: setPageRender });
      }, [page]);

      useEffect(() => {
            return renderPageArrayNormal({ max_show_page, page, cb: setPageRender });
      }, [total_page]);

      return (
            <div className=" text-text-theme truncate flex flex-col xl:flex-row items-center justify-center gap-[1rem] xl:gap-0 h-[4rem] w-full">
                  <div className=" flex w-max max-w-full mx-auto  gap-[.8rem] relative">
                        {pageRender.map((pageItem) => (
                              <button
                                    key={pageItem}
                                    onClick={() => onChangePage(pageItem)}
                                    className={`${onStylePageCurrent(pageItem)} !h-[2.6rem] min-w-[2.8rem] rounded-[.4rem] flex justify-center items-center`}
                              >
                                    <span>{pageItem}</span>
                              </button>
                        ))}
                        <div className="pr-[2rem] xl:pr-0 absolute right-0 bottom-[-4rem] min-w-[12rem] flex  gap-[1rem]">
                              Tổng trang:{" "}
                              <div className="w-[2.4rem] aspect-square rounded-full bg-color-main  flex justify-center items-center text-[1.2rem] text-[#fff]">
                                    {total_page}
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default DashboardPagination;
