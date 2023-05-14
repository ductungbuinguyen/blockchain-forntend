import { useField } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FieldAttributes } from '../../interfaces/transferMoney';

export type UserInfoSelectItemProps = FieldAttributes<string> & {
	label?: string;
	options: {
		name: string;
		value: any;
	}[];
};

const UserInfoSelectItem = (props: UserInfoSelectItemProps) => {
	const { id, name, label, options, disabled } = props;
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
	const displayValue = options.find(
		(option) => option.value === meta.value
	)?.name;
	return (
		<div ref={modalRef} className='relative flex flex-col gap-1 w-full'>
			{label && <label
				htmlFor={id || name}
				className='text-bcpayment-green-1 font-semibold text-[13px] mx-1'
			>
				{label}
			</label>}
			<div className='relative w-full'>
				<input
					maxLength={0}
					className='text-[15px] py-[10px] border-b placeholder:text-bcpayment-gray-2 outline-none w-full rounded-3xl shadow-xl px-4'
					{...field}
					{...(props as any)}
					value={displayValue}
					onFocus={() => {
						setIsShowOptions(true);
					}}
				/>
				<IoMdArrowDropdown
					onClick={() => setIsShowOptions((prev) => !prev)}
					className='text-bcpayment-gray-1 text-[20px] absolute right-2 top-1/2 -translate-y-1/2'
				/>
			</div>
			{meta.touched && meta.error ? (
				<div className='text-red-500 text-[15px]'>{meta.error}</div>
			) : null}
			{!disabled && isShowOptions && (
				<ul className='absolute -bottom-1 w-full overflow-hidden text-base border rounded-md shadow translate-y-[100%] z-20'>
					{options.map(({ name, value }, index) => {
						const isActive = value === meta.value;
						return (
							<li
								onClick={() => {
									helper.setValue(value);
									setIsShowOptions(false);
								}}
								key={index}
								className={`cursor-pointer bg-white border-t-[1px] pl-4 p-2 hover:bg-bcpayment-green-4 ${
									isActive &&
									'border-l-2 border-l-bcpayment-green-1 !bg-bcpayment-green-4'
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

export default UserInfoSelectItem;
