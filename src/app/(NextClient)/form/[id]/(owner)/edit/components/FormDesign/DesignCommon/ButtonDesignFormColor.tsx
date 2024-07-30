import ClickOutSide from '@/app/(NextClient)/_components/Model/ClickOutSide';
import { FormDesignContext } from '@/app/(NextClient)/_components/provider/FormDesignProvider';
import { onFetchForm } from '@/app/_lib/redux/formEdit.slice';
import { RootState } from '@/app/_lib/redux/store';
import { FormCore } from '@/type'
import { Trash } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { HexColorPicker } from 'react-colorful';
import { useDispatch, useSelector } from 'react-redux'


const ButtonDesignFormColor = () => {




    const dispatch = useDispatch();

    const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

    const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);

    const [openModelColor, setOpenModelColor] = useState<boolean>(false);

    const onChangeColor = (color: string) => {
          if (!isDesignForm) {
                setIsDesginForm(true);
          }
          const newFormEdit = structuredClone(formCore);
          newFormEdit.form_color = color;

          dispatch(onFetchForm({ form: newFormEdit }));
    };
    const formBackground = !!formCore.form_background?.form_background_iamge_url || formCore.form_background_state;

  return (
    <div className="flex flex-col gap-[1rem]">
    <div
        //   disabled={!formBackground}
          onClick={() => setOpenModelColor((prev) => !prev)}
          className="relative flex items-center justify-between gap-[1rem] h-[4rem] hover:cursor-pointer"
    >
          <p className=''>Màu nền </p>
          <div className="w-[7rem] h-[3.2rem] flex items-center justify-center border-[.1rem] border-slate-300 rounded-md">
                {formCore.form_color ? (
                      <div
                            style={{ backgroundColor: formCore.form_color }}
                            className="w-[5rem] h-[1.5rem] border-[.1rem] border-slate-300 text-[1.1rem] flex items-center justify-center"
                      ></div>
                ) : (
                      <div className="w-[5rem] h-[1.5rem] border-[.1rem] border-slate-300 text-[1.1rem] flex items-center justify-center">
                            Trống
                      </div>
                )}
          </div>
          {openModelColor && (
                <ClickOutSide setOpenModel={setOpenModelColor}>
                      <button
                            className="absolute top-[100%] z-[2]  left-0  disabled:cursor-not-allowed"
                            // onBlur={() => setOpenModelColor(false)}
                            onClick={(e) => e.stopPropagation()}
                      >
                      <HexColorPicker color={formCore.form_color || ''} onChange={onChangeColor} />
                      </button>
                </ClickOutSide>
          )}
</div>
<button className="flex items-center  justify-between gap-[2rem] " onClick={() => onChangeColor('#f2f2f2')}>

<p className=''>Màu nền mặc định </p>

           <div className="w-[5rem] h-[3.2rem] flex items-center justify-center border-[.1rem] border-slate-300 rounded-md">

           <div
                            style={{ backgroundColor: '#f2f2f2' }}
                            className="w-[3rem] h-[1.5rem] border-[.1rem] border-slate-300 text-[1.1rem] flex items-center justify-center"
                      ></div>
</div>
    </button>

    <button className="flex items-center  justify-between gap-[2rem]" onClick={() => onChangeColor('')}>

<p className=''>Xóa tất cả màu nền </p>

 <Trash />
    </button>

   
</div>
  )
}

export default ButtonDesignFormColor
