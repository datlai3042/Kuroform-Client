import useGetListFormDelete from "@/app/hooks/useGetListFormDelete";
import React, { useContext } from "react";
import FormDeleteItem from "./FormDeleteItem";
import LoadingArea from "@/app/(NextClient)/_components/ui/loading/LoadingArea";
import TrashEmpty from "@/app/(NextClient)/_components/_StatusCodeComponent/TrashEmpty";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import LoadingClient from "@/app/(NextClient)/_components/LoadingClient";

const ListFormDelete = () => {
      const allFormDelete = useGetListFormDelete();

      return (
            <div className="flex h-full flex-wrap gap-[2.8rem] ">
                  {allFormDelete.isSuccess && allFormDelete.data.metadata.forms.length > 0 && (
                        <Table className=" !border-[0rem] hidden-border-table text-[1.4rem]">
                              <TableHeader>
                                    <TableRow>
                                          <TableHead>Chi tiết</TableHead>

                                          <TableHead className="w-[100px] whitespace-pre text-right">Lượt xem</TableHead>
                                          <TableHead className="w-[100px] whitespace-pre text-right">Phản hồi</TableHead>
                                          <TableHead className="w-[100px] whitespace-pre text-right">Thao tác</TableHead>
                                    </TableRow>
                              </TableHeader>
                              <TableBody>
                                    {allFormDelete.data.metadata.forms.map((form) => (
                                          <TableRow key={form._id}>
                                                <FormDeleteItem form={form} />
                                          </TableRow>
                                    ))}
                              </TableBody>
                        </Table>
                  )}

                  {allFormDelete.isSuccess && allFormDelete.data.metadata.forms.length === 0 && <TrashEmpty />}
                  {allFormDelete.isPending && (
                        <div className="w-full min-h-[30rem]">
                              <LoadingClient width="w-full" height="h-full" />
                        </div>
                  )}
            </div>
      );
};

export default ListFormDelete;
