import { useField } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io'
import { FieldAttributes } from '../../interfaces/transferMoney';

export type AuthSelectItemProps = FieldAttributes<string> & {
	label: string;
	options: {
		name: string;
		value: any;
	}[]
};

const AuthSelectItem = (props: AuthSelectItemProps) => {
	const { id, name, label, options } = props;
	const [field, meta, helper] = useField(props);
	const [isShowOptions, setIsShowOptions] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				isShowOptions && setIsShowOptions(false);
			}
		};
		if (typeof window === 'object') {
			document?.addEventListener('click', handleClickOutside, true);
		}
	}, [isShowOptions]);
	const displayValue = options.find(option => option.value === meta.value)?.name
	return (
			<div ref={modalRef} className='relative flex flex-col gap-1'>
				<label
					htmlFor={id || name}
					className='text-bcpayment-green-1 font-semibold text-[16px]'
				>
					{label}
				</label>
				<div className='relative w-full'>
					<input
						maxLength={0}
						className='text-[20px] border-b placeholder:text-bcpayment-gray-2 outline-none !bg-white w-full'
						{...field}
						{...(props as any)}
						value={displayValue}
						onFocus={() => {
							setIsShowOptions(true);
						}}
					/>
					<IoMdArrowDropdown onClick={() => setIsShowOptions(prev => !prev)} className='text-bcpayment-gray-1 text-[20px] absolute right-0 top-1/2 -translate-y-1/2'/>
				</div>
				{meta.touched && meta.error ? (
					<div className='text-red-500 text-[15px]'>{meta.error}</div>
				) : null}
				{isShowOptions && (
				<ul className='absolute -bottom-1 w-full overflow-hidden text-base border rounded-md shadow translate-y-[100%]'>
					{options.map(({ name, value }, index) => {
						const isActive = value === meta.value
						return (
							<li
								onClick={() => {
									console.log('value', value)
									helper.setValue(value)
									setIsShowOptions(false)
								}}
								key={index}
								className={`cursor-pointer bg-white border-t-[1px] pl-4 p-2 hover:bg-bcpayment-green-4 ${
									isActive && 'border-l-2 border-l-bcpayment-green-1 !bg-bcpayment-green-4'
								}`}
							>
								{name}
							</li>
						);
					})}
				</ul>
			)}
			</div>
	);
};

export default AuthSelectItem;
