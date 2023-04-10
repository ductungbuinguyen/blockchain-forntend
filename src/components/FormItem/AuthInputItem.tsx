import { FieldAttributes, useField } from 'formik';

export type AuthInputItemProps = FieldAttributes<string> & {
	label: string;
};

const AuthInputItem = (props: AuthInputItemProps) => {
	const { id, name, label } = props;
	const [field, meta] = useField(props);
	return (
		<div className='flex flex-col gap-1'>
			<label
				htmlFor={id || name}
				className='text-bcpayment-green-1 font-semibold text-[16px]'
			>
				{label}
			</label>
			<input
				className='text-[20px] border-b placeholder:text-bcpayment-gray-2 outline-none !bg-white'
				{...field}
				{...(props as any)}
			/>
			{meta.touched && meta.error ? (
				<div className='text-red-500 text-[15px]'>{meta.error}</div>
			) : null}
		</div>
	);
};

export default AuthInputItem;
