import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import DashboardSearchResult from "./DashboardSearchResult";
import { useDebouncedValue } from "@mantine/hooks";
import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { onFocusSearch } from "@/app/_lib/redux/formEdit.slice";

const DashboardSearchForm = () => {
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
                  className="relative p-[.2rem_1rem] xl:min-w-[30rem] h-[3.2rem]  rounded-lg focus-within:border-[.1rem] focus-within:border-color-main border-[.1rem] border-color-main flex items-center gap-[.8rem]
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
                              <div className="absolute bottom-[0rem] translate-y-[100%] left-0 min-w-full w-max right-0 min-h-[2rem] xl:min-h-[4rem] max-h-[24rem] scroll-color-main  bg-[#fff] border-[.1rem] border-gray-300 rounded-lg h-max">
                                    <DashboardSearchResult search={debounced} />
                              </div>
                        </ClickOutSide>
                  )}
            </div>
      );
};

export default DashboardSearchForm;
