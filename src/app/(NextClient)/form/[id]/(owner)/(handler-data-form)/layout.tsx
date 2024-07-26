"use client";

import LoadingSpinner from "@/app/(NextClient)/_components/ui/loading/LoadingSpinner";
import { onCalculationData, onChangeFormId } from "@/app/_lib/redux/features/dataForm.slice";
import { addFormAnswer } from "@/app/_lib/redux/features/formAnswer.slice";
import { RootState } from "@/app/_lib/redux/store";
import { handleDataForm } from "@/app/_lib/utils";
import FormAnswerService from "@/app/_services/formAnswer.service";
import { FormCore } from "@/type";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
                  const { formAnswer } = getFormAnswer.data.metadata;
                  dispatch(addFormAnswer({ form_id: formAnswer.form_id, reports: formAnswer }));

                  const { reports } = getFormAnswer.data.metadata.formAnswer;
                  const arrayReserver = [...reports];

                  const OK = handleDataForm(arrayReserver.reverse(), params.id);
                  console.log({ OK });
                  setReady(OK);
            }
      }, [getFormAnswer.isSuccess, getFormAnswer.data, formAnswer]);

      useEffect(() => {
            if (!getFormAnswer.data?.metadata.formAnswer) {
                  dispatch(onChangeFormId({ form_id_current: params.id }));
                  console.log({ API: true });

                  return setReady(true);
            }
      }, [formAnswer, getFormAnswer.data]);

      useEffect(() => {
            if (formAnswer) {
                  if (!ready) setReady(true);
            }
      }, [formAnswer]);

      return <>{ready ? children : <LoadingSpinner color="#0bceb2" />}</>;
};

export default HanderlDataFormLayout;
