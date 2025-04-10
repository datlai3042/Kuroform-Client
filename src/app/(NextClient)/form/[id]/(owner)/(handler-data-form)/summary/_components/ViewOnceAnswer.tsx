"use client";
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FormCore, UI } from "@/type";
import moment from "moment";
import Link from "next/link";
import LabelNewAnswer from "./LabelNewAnswer";
import ButtonDeleteReport from "./ButtonDeleteReport";
moment.locale("vi");

type TProps = {
      formAnswer: FormCore.FormAnswer.FormAnswerCore;
      formCore: FormCore.Form;
      setFormAnswerDetail: React.Dispatch<React.SetStateAction<FormCore.FormAnswer.OneReport | null>>;
      setOpenDetailAnswer: React.Dispatch<React.SetStateAction<boolean>>;
};

type DataCol = {
      [key: string]: {
            title: string;
            colData: string[];
            id: string;
      };
};

const ViewOnceAnswer = (props: TProps) => {
      const { formAnswer, formCore, setFormAnswerDetail, setOpenDetailAnswer } = props;
      const [dataCol, setDataCol] = useState<DataCol>({});
      const [allCol, setAllCol] = useState<string[]>([]);

      const [oldData, setOldData] = useState(() => {
            return formAnswer.reports.map((ans) => ans._id);
      });

      const [newData, setNewData] = useState<string[]>(() => []);

      useEffect(() => {
            let dataCol: { [key: string]: any } = {};
            formAnswer?.reports?.forEach((rp) => {
                  rp.answers.forEach((ans) => {
                        let value = ans.value;
                        if (!dataCol[ans._id]) {
                              const colData: string[] = [];
                              colData.push(value);
                              const dataMap = {
                                    title: ans?.title,
                                    colData,
                                    id: ans._id,
                                    type: ans.type,
                                    time: rp.createdAt,
                              };
                              dataCol[ans._id] = dataMap;
                        }
                        if (dataCol[ans._id]) {
                              const newColData = dataCol[ans._id].colData.concat(value);
                              dataCol[ans._id] = {
                                    ...dataCol[ans._id],
                                    colData: newColData,
                              };
                        }
                  });
            });
            setDataCol(dataCol);
      }, []);

      useEffect(() => {
            let allCol: string[] = [];
            formAnswer.reports.forEach((rp) => {
                  rp.answers.forEach((ans) => {
                        if (!allCol.includes(ans._id)) {
                              allCol.push(ans._id);
                        }
                  });
            });
            setAllCol(allCol);
      }, []);

      useEffect(() => {
            let newAnswer: string[] = [];
            setOldData((prev) => {
                  formAnswer.reports.forEach((ans) => {
                        if (!prev.includes(ans._id)) {
                              newAnswer.push(ans._id);
                        }
                  });
                  return prev;
            });
            console.log({ newAnswer });
            setNewData(newAnswer);
      }, [formAnswer]);

      return (
            <Table className=" text-[1.4rem] !border-none" classContainer="h-full">
                  <TableHeader>
                        <TableRow>
                              <TableHead className="w-[100px] whitespace-pre">Trạng thái</TableHead>
                              {Object.keys(dataCol).map((dataColKey, index) => {
                                    return (
                                          <TableHead className="whitespace-pre" key={index}>
                                                {dataCol[dataColKey]?.title || "Chưa thiết lập title"}
                                          </TableHead>
                                    );
                              })}
                              <TableHead className=" whitespace-pre">Thời gian gửi</TableHead>
                              <TableHead className=" whitespace-pre sticky right-[-1rem] z-[10] bg-color-section-theme">Thao tác</TableHead>
                        </TableRow>
                  </TableHeader>
                  <TableBody>
                        {/* {Object.keys(dataCol).map((dataColKey) => {
                              return (
                                    <TableRow>
                                          <TableCell className="font-medium">Đã gửi</TableCell>
                                          {dataCol[dataColKey].colData.map((value) => {
                                                return <TableCell>{value}</TableCell>;
                                          })}

                                          <TableCell className="text-right"> {moment(new Date()).format(" Do MMMM YYYY")} </TableCell>
                                    </TableRow>
                              );
                        })} */}
                        {formAnswer.reports?.map((rp, index) => {
                              return (
                                    <TableRow key={index}>
                                          <TableCell className="font-medium whitespace-pre flex items-center gap-[1rem]">
                                                <span>Đã gửi</span>
                                                {newData.includes(rp._id) && <LabelNewAnswer />}
                                          </TableCell>

                                          {allCol.map((col, lg) => {
                                                let pass = false;
                                                return (
                                                      <>
                                                            {rp?.answers.map((ans, idx) => {
                                                                  if (col !== ans._id && !pass && idx + 1 === rp?.answers.length) {
                                                                        return (
                                                                              <TableCell key={idx} className="whitespace-pre">
                                                                                    Không có nội dung
                                                                              </TableCell>
                                                                        );
                                                                  }
                                                                  if (col === ans._id) {
                                                                        pass = true;
                                                                        let viewContent = (
                                                                              <TableCell key={idx} className="whitespace-pre">
                                                                                    {ans.value || "Không có nội dung"}
                                                                              </TableCell>
                                                                        );
                                                                        if (ans.type === "ANCHOR" || ans.type === "FILE_IMAGE") {
                                                                              viewContent = (
                                                                                    <TableCell key={idx} className="whitespace-pre">
                                                                                          <a
                                                                                                href={ans.value}
                                                                                                target="_blank"
                                                                                                rel="noopener noreferrer"
                                                                                                className="whitespace-pre"
                                                                                          >
                                                                                                {ans.value || "Không có nội dung"}
                                                                                          </a>
                                                                                    </TableCell>
                                                                              );
                                                                        }
                                                                        if (ans.type === "DATE") {
                                                                              viewContent = (
                                                                                    <TableCell key={idx} className="whitespace-pre">
                                                                                          {ans.value
                                                                                                ? moment(new Date(ans.value)).format("DD - MM - YYYY")
                                                                                                : "Không có nội dung"}
                                                                                    </TableCell>
                                                                              );
                                                                        }
                                                                        return <>{viewContent}</>;
                                                                  }
                                                                  return <></>;
                                                            })}
                                                      </>
                                                );
                                          })}
                                          <TableCell className="font-medium whitespace-pre">
                                                {moment(new Date(rp.createdAt)).format("HH:mm:ss  -  DD - MM - YYYY")}
                                          </TableCell>
                                          <TableCell className="font-medium whitespace-pre sticky right-[-1rem] z-[10] bg-color-section-theme flex gap-[1rem]">

                                                <p
                                                      className="font-medium whitespace-pre cursor-pointer hover:bg-[var(--color-main)] h-full text-text-theme hover:text-[#fff]"
                                                      onClick={() => {
                                                            setFormAnswerDetail(() => {
                                                                  return formAnswer?.reports.filter((fans) => fans._id === rp._id)[0] || null;
                                                            });
                                                            setOpenDetailAnswer(true);
                                                      }}
                                                >
                                                      Xem đầy đủ
                                                </p>

                                                <ButtonDeleteReport formId={formCore._id} reportId={rp._id} title="Xóa trả lời này" />

                                          </TableCell>
                                    </TableRow>
                              );
                        })}
                  </TableBody>
            </Table>
      );
};

export default ViewOnceAnswer;
