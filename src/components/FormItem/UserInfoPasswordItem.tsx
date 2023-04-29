import { useField } from "formik";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FieldAttributes } from "../../interfaces/transferMoney";

export type UserInfoPasswordItemProps = FieldAttributes<string> & {
	label: string;
};

const UserInfoPasswordItem = (props: UserInfoPasswordItemProps) => {
  const [isShow, setIsShow] = useState(false)
	const { id, name, label } = props;
	const [field, meta] = useField(props);
	return (
		<>
			<div className='flex flex-col gap-1 w-full'>
        <label
          htmlFor={id || name}
          className='text-bcpayment-green-1 font-semibold text-[13px] mx-1'
        >
          {label}
        </label>
        <div className='relative'>
          <input
            className='text-[15px] border-b placeholder:text-bcpayment-gray-2 outline-none w-full rounded-3xl shadow-xl px-4 py-[10px]'
            {...field}
            autocomplete="off"
            {...(props as any)}
            type={isShow ? 'text' : 'password'}
          />
          <div onClick={() => setIsShow(prev => !prev)} className='absolute right-3 -translate-y-1/2 text-bcpayment-gray-2 top-1/2 pointer text-[20px]'>
            {isShow ? <AiFillEye/> : <AiFillEyeInvisible/>}
          </div>
        </div>
				{meta.touched && meta.error ? (
					<div className='text-red-500 text-[15px]'>{meta.error}</div>
				) : null}
			</div>
		</>
	);
}

export default UserInfoPasswordItem