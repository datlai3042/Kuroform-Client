import { renderPageArrayLast, renderPageArrayMiddle, renderPageArrayNormal } from "@/app/utils/pagination.utit";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { SetStateAction, useEffect, useRef, useState } from "react";

type TProps = {
      page: number;
      setPage: React.Dispatch<SetStateAction<number>>;
      total_page: number;
};

const DashboardPagination = (props: TProps) => {
      const { page, setPage, total_page } = props;

      const max_show_page = total_page < 5 ? total_page : 5;

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
            // if (page === 1) return;
            // if (page === total_page) return;
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
            <div className=" relative text-text-theme truncate flex flex-col xl:flex-row items-center justify-center gap-[1rem] xl:gap-0 h-[4rem] w-full">
                  <div className=" flex w-max max-w-full mr-auto lg:mx-auto items-center  gap-[.8rem]">
                        <button disabled={page === 1} className="disabled:cursor-not-allowed" onClick={() => onChangePage(page - 1)}>
                              <ChevronLeft className="text-color-main" />
                        </button>
                        {page !== 1 && page > 5 && (
                              <div className="flex gap-[.4rem]">
                                    <button
                                          onClick={() => onChangePage(1)}
                                          className={`${onStylePageCurrent(1)} !h-[2.6rem] min-w-[2.8rem] rounded-[.4rem] flex justify-center items-center`}
                                    >
                                          <span>{1}</span>
                                    </button>
                                    <span>...</span>
                              </div>
                        )}
                        {pageRender.map((pageItem) => (
                              <button
                                    key={pageItem}
                                    onClick={() => onChangePage(pageItem)}
                                    className={`${onStylePageCurrent(pageItem)} !h-[2.6rem] min-w-[2.8rem] rounded-[.4rem] flex justify-center items-center`}
                              >
                                    <span>{pageItem}</span>
                              </button>
                        ))}

                        {page !== total_page && page < total_page - 5 && (
                              <div className="flex gap-[.4rem]">
                                    <span>...</span>
                                    <button
                                          onClick={() => onChangePage(total_page)}
                                          className={`${onStylePageCurrent(
                                                total_page,
                                          )} !h-[2.6rem] min-w-[2.8rem] rounded-[.4rem] flex justify-center items-center`}
                                    >
                                          <span>{total_page}</span>
                                    </button>
                              </div>
                        )}

                        <button disabled={page === total_page} className="disabled:cursor-not-allowed" onClick={() => onChangePage(page + 1)}>
                              <ChevronRight className="text-color-main" />
                        </button>
                  </div>
                  <div className="hidden  absolute right-0 bg-color-main text-[#fff] rounded-[.4rem] p-[.2rem_.8rem] md:flex items-center  gap-[1rem]">
                        Tổng trang:{" "}
                        <div className="w-[2.4rem] aspect-square rounded-full   flex justify-center items-center text-[1.2rem] text-[#fff]">
                              {total_page}
                        </div>
                  </div>
            </div>
      );
};

export default DashboardPagination;
