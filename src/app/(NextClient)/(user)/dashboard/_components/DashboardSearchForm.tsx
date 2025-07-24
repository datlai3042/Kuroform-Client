import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import DashboardSearchResult from "./DashboardSearchResult";
import { useDebouncedValue } from "@mantine/hooks";
import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { onFocusSearch } from "@/app/_lib/redux/formEdit.slice";

const DashboardSearchForm = ({ widthInput }: { widthInput?: string }) => {
      const [search, setSearch] = useState<string>("");
      const [debounced] = useDebouncedValue(search, 200);

      const dispatch = useDispatch();

      const focusSearch = useSelector((state: RootState) => state.form.focus_search);

      const [openFormSearch, setOpenFormSearch] = useState<boolean>(false);

      useEffect(() => {
            if (!openFormSearch) {
                  dispatch(onFocusSearch({ focus: openFormSearch }));
                  return;
            }
            dispatch(onFocusSearch({ focus: openFormSearch }));
      }, [openFormSearch]);

      return (
            <div
                  style={{ width: widthInput || "" }}
                  className=" z-[200] flex relative p-[.2rem_1rem] w-[13rem] xl:w-[36rem] h-[3.2rem]  rounded-lg  focus-within:border-color-main border-[.1rem] border-[var(--border-color-side)]  items-center gap-[.8rem]
"
            >
                  <Search className="w-[1.6rem] text-text-theme" />
                  <input
                        className=" min-h-full w-[95%] bg-transparent text-text-theme"
                        placeholder="Tìm kiếm"
                        value={search}
                        autoFocus={openFormSearch}
                        onClick={() => setOpenFormSearch((prev) => !prev)}
                        onChange={(e) => setSearch(e.target.value)}
                  />

                  {(openFormSearch || focusSearch) && (
                        <ClickOutSide setOpenModel={setOpenFormSearch}>
                              <div style={{bottom: '-0.8rem'}} className="absolute  translate-y-[100%] text-text-theme left-0 min-w-full w-max right-0 min-h-[2rem] xl:min-h-[4rem] max-h-[24rem] scroll-color-main  bg-color-section-theme rounded-[.4rem] h-max">
                                    <DashboardSearchResult search={debounced} />
                              </div>
                        </ClickOutSide>
                  )}
            </div>
      );
};

export default DashboardSearchForm;
