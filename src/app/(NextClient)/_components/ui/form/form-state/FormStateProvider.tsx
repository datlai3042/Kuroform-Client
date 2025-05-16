import { FormCore } from "@/type";
import React from "react";
import FormStatePrivate from "./FormStatePrivate";
import FormStatePublic from "./FormStatePublic";
import FormStateDelete from "./FormStateDelete";

type TProps = {
      form_state: FormCore.FormState;
};

const FormStateProvider = (props: TProps) => {
      const { form_state } = props;

      return (
            <div className="form-state w-max">
                  {form_state === "isPrivate" && <FormStatePrivate />}
                  {form_state === "isPublic" && <FormStatePublic />}

                  {form_state === "isDelete" && <FormStateDelete />}
            </div>
      );
};

export default FormStateProvider;
