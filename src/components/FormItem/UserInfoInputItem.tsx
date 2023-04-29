import { useField } from 'formik';
import { FieldAttributes } from '../../interfaces/transferMoney';

export type UserInfoInputItemProps = FieldAttributes<string> & {
	label: string;
};

const UserInfoInputItem = (props: UserInfoInputItemProps) => {
  const { id, name, label } = props;
	const [field, meta] = useField(props);
  return (
    <div className='relative w-full flex flex-col gap-1'>
      <label
				htmlFor={id || name}
				className='text-bcpayment-green-1 font-semibold text-[13px] mx-1'
			>
        {label}
      </label>
			<input
				className='placeholder:text-bcpayment-gray-2 placeholder:font-medium px-4 text-[15px] py-[10px] rounded-3xl w-full shadow-xl outline-none'
				{...field}
				{...(props as any)}
			/>
			{meta.touched && meta.error ? (
				<div className='text-red-500 text-[15px]'>{meta.error}</div>
			) : null}
		</div>
  )
}

export default UserInfoInputItem