import React from 'react'

const AppButtonPrimary = ({className, children, ...otherProps}: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  
  return (
    <button className={`w-full rounded-xl py-2 text-center text-[20px] font-bold text-white text uppercase bg-gradient-to-r from-bcpayment-green-1 to-bcpayment-green-2 ${otherProps.disabled && 'opacity-20'} ${className}`} {...otherProps}>{children}</button>
  )
}

export default AppButtonPrimary