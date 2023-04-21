import { useField } from 'formik';
import { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { FieldAttributes } from '../../interfaces/transferMoney';

export type AuthPasswordItemProps = FieldAttributes<string> & {
	label: string;
};

const AuthPasswordItem = (props: AuthPasswordItemProps) => {
  const [isShow, setIsShow] = useState(false)
	const { id, name, label } = props;
	const [field, meta] = useField(props);
	return (
		<>
			<div className='flex flex-col gap-1'>
				<label
					htmlFor={id || name}
					className='text-bcpayment-green-1 font-semibold text-[16px]'
				>
					{label}
				</label>
        <div className='relative'>
          <input
            className='text-[20px] border-b placeholder:text-bcpayment-gray-2 outline-none w-full'
            {...field}
            {...(props as any)}
            type={isShow ? 'text' : 'password'}
          />
          <div onClick={() => setIsShow(prev => !prev)} className='absolute right-0 -translate-y-1/2 text-bcpayment-gray-2 top-1/2 pointer text-[20px]'>
            {isShow ? <AiFillEye/> : <AiFillEyeInvisible/>}
          </div>
        </div>
				{meta.touched && meta.error ? (
					<div className='text-red-500 text-[15px]'>{meta.error}</div>
				) : null}
			</div>
		</>
	);
};

export default AuthPasswordItem;
