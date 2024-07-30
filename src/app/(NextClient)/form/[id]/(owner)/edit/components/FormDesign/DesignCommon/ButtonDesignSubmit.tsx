import { FormDesignContext } from '@/app/(NextClient)/_components/provider/FormDesignProvider'
import DivNative from '@/app/(NextClient)/_components/ui/NativeHtml/DivNative'
import DivNativeRef from '@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef'
import SpanNative from '@/app/(NextClient)/_components/ui/NativeHtml/SpanNative'
import { onFetchForm } from '@/app/_lib/redux/formEdit.slice'
import { RootState } from '@/app/_lib/redux/store'
import { addOneToastError } from '@/app/_lib/redux/toast.slice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'

const ButtonDesignSubmit = () => {
    const formCore = useSelector((state: RootState) => state.form.formCoreOriginal)

    const formCoreBackUp = useSelector((state: RootState) => state.form.formCoreBackUp)

    const [labelTextSubmit, setLabelTextSubmit] = useState<string>(formCore.form_button_text || '')
    const dispatch = useDispatch();

    const router = useRouter()


    const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);

    const contentRef = useRef<HTMLDivElement | null>(null);

    const labelClick = () => {
          if (contentRef.current) {
                contentRef.current.focus();
          }
    };

    const handleErrorInput = (e: React.ChangeEvent<HTMLDivElement>) => {

        const textContent = e.target.textContent 

        if(e.target.textContent && e.target.textContent?.length > 50) {
            dispatch(addOneToastError({toast_item: {_id: v4(), type: 'ERROR', toast_title: 'Độ dài vượt mức', core: {message: 'Độ dài chữ tối đa 50 kí tự'}}}))

            if (contentRef.current) {
                contentRef.current.textContent = formCoreBackUp.form_button_text
                setLabelTextSubmit(formCoreBackUp.form_button_text)
            }
                return
        }

        const labelSubmit = textContent || formCore.form_button_text

          if (contentRef.current) {
                setLabelTextSubmit(labelSubmit)
                if (!isDesignForm) {
                    setIsDesginForm(true);
              }
              const newFormEdit = structuredClone(formCore);
              newFormEdit.form_button_text = labelSubmit;
    
              dispatch(onFetchForm({ form: newFormEdit }));
              router.push("#submit")
              
          }
    };



  return (
    <button className='text-left'  >
       <DivNative className="h-max flex flex-col  justify-between gap-[.6rem]" onClick={(e) => {

       }}>
                  <SpanNative textContent={`Nhập thông báo lỗi`} onClick={labelClick} className="hover:cursor-pointer" />
                  <DivNativeRef
                        spellCheck={false}
                        ref={contentRef}
                        contentEditable={true}
                        defaultValue={labelTextSubmit}
                        onBlur={handleErrorInput}
                        className="input-setting  border-[1px] border-slate-400 p-[.8rem_1rem] rounded-lg  outline-2 outline-blue-400"
                        // data-text={`${error || inputSettingText.input_error}`}
                        suppressContentEditableWarning={true}
                  >
                {labelTextSubmit}  </DivNativeRef>
            </DivNative>
    </button>
  )
}

export default ButtonDesignSubmit
