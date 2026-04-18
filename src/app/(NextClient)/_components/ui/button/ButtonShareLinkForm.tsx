import BoxCopySuccess from "@/app/(NextClient)/form/[id]/(owner)/_components/BoxCopySuccess";
import { FormCore } from "@/type";
import { LinkIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const ButtonShareLinkForm = ({ form_id }: { form_id: FormCore.Form['_id'] }) => {
      const [copySuccess, setCopySuccess] = useState<boolean>(false);

      const timeoutRef = useRef<NodeJS.Timeout | null>(null);

      useEffect(() => {
            if (copySuccess) {
                  const time = 3000;
                  timeoutRef.current = setTimeout(() => setCopySuccess(false), time);
            }

            return () => {
                  clearTimeout(timeoutRef.current as NodeJS.Timeout);
            };
      }, [copySuccess]);
      return (
            <>
                  <button
                        onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              navigator.clipboard.writeText(`${window.location.origin}/form/${form_id}`).then(() => setCopySuccess(true));
                        }}
                        className="p-[.6rem_1.4rem] relative !w-[4rem]  flex items-center gap-[1.6rem] bg-color-main text-[#fff] rounded-md"
                  >
                        <LinkIcon size={20} />
                        {copySuccess && (
                              <div className="absolute top-[120%] right-0 text-text-theme">
                                    <BoxCopySuccess message="Copy link chia sẽ thành công" />
                              </div>
                        )}
                  </button>
            </>
      );
};

export default ButtonShareLinkForm;
