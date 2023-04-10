import { FieldAttributes, useField } from 'formik';

const TransferMoneyNoteItem = (props: FieldAttributes<string>) => {
	const [field, meta] = useField(props);
	return (
		<>
			<div className='relative w-full'>
				<textarea
          rows={4}
					placeholder='Nhập lời nhắn'
					className='shadow-xl px-4 pt-[45px] pb-4 text-medium text-[15px] w-full outline-none rounded-3xl'
					{...field}
					{...(props as any)}
				/>
				<p className='text-[15px] text-bcpayment-green-1 font-extrabold absolute top-[16px] left-4'>
					LỜI NHẮN
				</p>
			</div>
			{meta.touched && meta.error ? (
				<div className='text-red-500 text-[15px]'>{meta.error}</div>
			) : null}
		</>
	);
};

export default TransferMoneyNoteItem;
