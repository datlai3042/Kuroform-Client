"use client";
import React from "react";
import ListFormDelete from "./_components/ListFormDelete";
import SettingHeader from "../settings/_components/SettingHeader";

const TrashFormPage = () => {
      return (
            <div className="w-full min-h-screen flex flex-col ">
                  <div className="px-[2.8rem] fixed  sm:static top-0 left-0 right-0 border-b-[.1rem] border-[var(--border-color-input)] z-[999]  bg-color-section-theme">
                        <SettingHeader />
                  </div>
                  <div className="flex-1 flex flex-col min-h-[60rem] h-full text-text-theme bg-[var(--bg-module-other)] ">
                        <h3 className="my-[2rem] pl-[2.8rem] !text-[2.3rem]">Các form đang ở chế độ Delete</h3>
                        <div className="flex-1 w-full  bg-[var(--color-section-theme)] p-[2.8rem] ">
                              <ListFormDelete />
                        </div>
                  </div>
            </div>
      );
};

export default TrashFormPage;
