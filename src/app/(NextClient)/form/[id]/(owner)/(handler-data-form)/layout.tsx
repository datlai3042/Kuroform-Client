"use client";

import LoadingClient from "@/app/(NextClient)/_components/LoadingClient";
import LoadingSpinner from "@/app/(NextClient)/_components/ui/loading/LoadingSpinner";
import { onChangeFormId } from "@/app/_lib/redux/dataForm.slice";
import { addFormAnswer } from "@/app/_lib/redux/formAnswer.slice";
import { RootState } from "@/app/_lib/redux/store";
import { handleDataForm } from "@/app/_lib/utils";
import FormAnswerService from "@/app/_services/formAnswer.service";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HanderlDataFormLayout = ({ params, children }: { params: { id: string }; children: React.ReactNode }) => {
      const dispatch = useDispatch();

      const formAnswer = useSelector((state: RootState) => state.formAsnwer.formAnswerStore[params.id]);

      const [ready, setReady] = useState<boolean>(false);

      const getFormAnswer = useQuery({
            queryKey: ["get-form-answer", params.id],
            queryFn: () => FormAnswerService.getFormAnswer(params.id),
            enabled: !formAnswer,
      });
      useEffect(() => {
            if (!formAnswer && getFormAnswer.isSuccess && getFormAnswer.data.metadata.formAnswer) {
                  getFormAnswer.refetch().then((payload) => {
                        console.log({payload})
                        const { formAnswer } = payload!.data!.metadata;
                        dispatch(addFormAnswer({ form_id: formAnswer.form_id, reports: formAnswer }));

                        const { reports } = getFormAnswer.data.metadata.formAnswer;
                        const arrayReserver = [...reports];

                        const OK = handleDataForm(arrayReserver.reverse(), params.id);
                        dispatch(onChangeFormId({ form_id_current: params.id }));

                        setReady(OK);
                  });
            }
      }, [getFormAnswer.isSuccess, getFormAnswer.data, formAnswer]);

      useEffect(() => {
            if (!getFormAnswer.data?.metadata.formAnswer) {

                  dispatch(onChangeFormId({ form_id_current: params.id }));

                  return setReady(true);
            }
      }, [formAnswer, getFormAnswer.data]);

      useEffect(() => {
            if (formAnswer) {
                  if (!ready) setReady(true);
            }
      }, [formAnswer]);

      console.log({formAnswer})
      return (
            <>
                  {ready ? (
                        children
                  ) : (
                        <div className="h-full min-h-[20rem]">
                              <LoadingClient width="w-full" height="!h-full" style={{ borderRadius: ".6rem" }} />
                        </div>
                  )}
            </>
      );
};

export default HanderlDataFormLayout;
