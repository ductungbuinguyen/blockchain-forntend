import { FieldAttributes, useField } from 'formik';

type TransferMoneyInputItemProps = FieldAttributes<number | string> & {
	inputType: 'amount' | 'address';
};

const TransferMoneyInputItem = (props: TransferMoneyInputItemProps) => {
	const { inputType } = props;
	const [field, meta] = useField(props);
	return (
		<div className='w-full'>
			<div className='relative'>
				<input
					type={inputType === 'address' ? 'text' : 'number'}
					className={
						inputType === 'amount'
							? 'bg-white outline-none text-black text-center text-[40px] w-full rounded-3xl px-3 py-2 underline shadow-xl'
							: 'placeholder:text-bcpayment-gray-2 px-4 font-medium text-[15px] py-[30px] rounded-3xl w-full shadow-xl outline-none'
					}
					placeholder={inputType === 'address' ? 'Địa chỉ' : ''}
					{...field}
					{...(props as any)}
				/>
				{inputType === "amount" && <p className='absolute -translate-y-1/2 right-5 top-1/2 text-bcpayment-green-3'>BNB</p>}
			</div>
			{meta.touched && meta.error ? (
				<div className='text-red-500 text-[15px]'>{meta.error}</div>
			) : null}
		</div>
	);
};

export default TransferMoneyInputItem;
