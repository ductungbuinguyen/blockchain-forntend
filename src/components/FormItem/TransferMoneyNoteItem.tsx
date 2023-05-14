import { useField } from 'formik';
import { FieldAttributes } from '../../interfaces/transferMoney';

type AppNoteItemProps = FieldAttributes<string> & {
	inputType: 'transferMoneyNote' | 'registerMerchantNote';
};

const AppNoteItem = (props: AppNoteItemProps) => {
	const { inputType } = props;
	const [field, meta] = useField(props);
	return (
		<>
			<div className='relative w-full'>
				<textarea
          rows={4}
					placeholder='Nhập lời nhắn'
					style={{
						paddingTop: inputType === "transferMoneyNote" ? 45 : 15
					}}
					className='shadow-md px-4 pb-4 text-medium text-[15px] w-full outline-none rounded-3xl'
					{...field}
					{...(props as any)}
				/>
				{inputType === "transferMoneyNote" && <p className='text-[15px] text-bcpayment-green-1 font-extrabold absolute top-[16px] left-4'>
					LỜI NHẮN
				</p>}
			</div>
			{meta.touched && meta.error ? (
				<div className='text-red-500 text-[15px]'>{meta.error}</div>
			) : null}
		</>
	);
};

export default AppNoteItem;
