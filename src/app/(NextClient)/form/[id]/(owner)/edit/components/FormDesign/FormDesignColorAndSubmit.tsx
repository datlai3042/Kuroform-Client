import React from 'react'
import ButtonDesignFormColor from './DesignCommon/ButtonDesignFormColor'
import ButtonDesignSubmit from './DesignCommon/ButtonDesignSubmit'

const FormDesignColorAndSubmit = () => {
  return (
    <div className='p-[1rem] flex flex-col gap-[3rem]'>
      <div className="flex flex-col gap-[1rem]">

<p className='underline font-normal'>Màu nền của form</p>
      <ButtonDesignFormColor />
      </div>

      <div className="flex flex-col gap-[1rem]">

<p className='underline font-normal'>Chữ của nút submit</p>
      <ButtonDesignSubmit />
      </div>
      
    </div>
  )
}

export default FormDesignColorAndSubmit
