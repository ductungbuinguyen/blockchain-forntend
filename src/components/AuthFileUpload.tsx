import { useField } from 'formik';
import { useRef } from 'react';
import { TbCameraPlus } from 'react-icons/tb';
import { FieldAttributes } from '../interfaces/transferMoney';

const convertBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload = () => {
					resolve(fileReader.result as string);
			};

			fileReader.onerror = (error) => {
					reject(error);
			};
	});
};


const AuthFileUpload = (props: FieldAttributes<File | string | undefined>) => {
	const [field, meta, helper] = useField(props);
	const value = meta.value;
	console.log('value', value)
	const inputFile = useRef<any>(null);
	return (
		<div className='flex items-center justify-center flex-col'>
			<input
				ref={inputFile}
				{...field}
				{...(props as any)}
				type='file'
				accept='image/*'
				value={null}
				onChange={async (event) => {
					const file = event.currentTarget.files?.[0]
					if(!file) return;
					const base64Image = await convertBase64(file)
					helper.setValue(base64Image);
				}}
				className='hidden'
			/>
			<div className='relative'>
				<div className='rounded-full overflow-clip w-[140px] h-[140px] border'>
					<img
						className='object-contain w-[140px] h-[140px]'
						src={
							!value
								? '/AvatarPlaceholder.svg'
								: typeof value === 'string'
								? value
								: URL.createObjectURL(value)
						}
					/>
				</div>
				<div className='absolute bottom-0 right-0 p-2 -translate-x-1 -translate-y-1 bg-white rounded-full shadow-xl overflow-clip cursor-pointer' onClick={() => inputFile.current?.click()}>
					<TbCameraPlus className='text-bcpayment-green-1 text-[20px]' />
				</div>
			</div>
      {meta.touched && meta.error ? (
					<div className='text-red-500 text-[15px]'>{meta.error}</div>
				) : null}
		</div>
	);
};

export default AuthFileUpload;
