import React from 'react'

const InputContent = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='pl-[3rem] flex flex-col gap-[1.4rem] '>{children}</div>
  )
}

export default InputContent