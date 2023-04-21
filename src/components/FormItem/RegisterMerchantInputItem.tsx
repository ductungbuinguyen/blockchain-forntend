import { useField } from 'formik';
import { FieldAttributes } from '../../interfaces/transferMoney';

const RegisterMerchantInputItem = (props: FieldAttributes<string>) => {
	const [field, meta] = useField(props);
	return (
		<div className='relative w-full'>
			<input
				className='placeholder:text-bcpayment-gray-2 placeholder:font-medium px-4 text-[15px] py-[10px] rounded-3xl w-full shadow-xl outline-none'
				{...field}
				{...(props as any)}
			/>
			{meta.touched && meta.error ? (
				<div className='text-red-500 text-[15px]'>{meta.error}</div>
			) : null}
		</div>
	);
};

export default RegisterMerchantInputItem;
