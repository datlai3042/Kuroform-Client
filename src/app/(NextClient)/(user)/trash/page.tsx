"use client";
import React from "react";
import ListFormDelete from "./_components/ListFormDelete";
import SettingHeader from "../settings/_components/SettingHeader";

const TrashFormPage = () => {
      return (
            <div className="w-full min-h-screen flex flex-col gap-[5rem] p-[6rem] bg-color-section-theme">
                  <SettingHeader />

                  <div className="w-[90%] xl:w-[80%] h-max min-h-[30rem] mx-auto flex flex-col gap-[4rem]">
                        <div className="min-h-[40px] flex items-center justify-between pb-[1rem] border-b-[.1rem] border-slate-200 ">
                              <h3 className="text-text-theme !text-[3rem]">Các form đang ở chế độ Delete</h3>
                        </div>

                        <ListFormDelete />
                  </div>
            </div>
      );
};

export default TrashFormPage;
