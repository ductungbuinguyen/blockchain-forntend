import { useField } from "formik";
import { FieldAttributes } from "../../interfaces/transferMoney";
import { RiFileCopy2Line } from "react-icons/ri";
import { useAppNoti } from "../../contexts/AppNotiContext";

export type UserInfoCopyItemProps = FieldAttributes<string> & {
	label: string;
};

const UserInfoCopyItem = (props: UserInfoCopyItemProps) => {
  const { open } = useAppNoti()
  const { id, name, label } = props;
	const [field, meta] = useField(props);
  const onCopyClipBoard = () => {
    navigator.clipboard.writeText(props.value);
    open({
      title: 'sao chép nội dung thành công'
    })
  }
  return (
    <div className='relative w-full flex flex-col gap-1'>
      <label
				htmlFor={id || name}
				className='text-bcpayment-green-1 font-semibold text-[13px] mx-1'
			>
        {label}
      </label>
      <div className="relative">
			<input
				className='placeholder:text-bcpayment-gray-2 placeholder:font-medium px-4 pr-9 text-[15px] py-[10px] rounded-3xl w-full shadow-xl outline-none'
				{...field}
				{...(props as any)}
			/>
      <div onClick={onCopyClipBoard} className='absolute right-3 -translate-y-1/2 text-bcpayment-green-1 top-1/2 pointer text-[20px]'>
        <RiFileCopy2Line/>
      </div>
      </div>
			{meta.touched && meta.error ? (
				<div className='text-red-500 text-[15px]'>{meta.error}</div>
			) : null}
		</div>
  )
}

export default UserInfoCopyItem