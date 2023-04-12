import { SlArrowLeft } from 'react-icons/sl';
import AppHeaderWrapper from '../AppHeaderWrapper';
import { MdOutlineSettingsEthernet } from 'react-icons/md';
import { Form, Formik } from 'formik';
import TransferMoneyInputItem from '../FormItem/TransferMoneyInputItem';
import { fieldValidator, IValidateType } from '../../utils/formikValidator';
import AppButtonPrimary from '../AppButtonPrimary';

interface TransferToAddressProps {
	onBackButtonClick: () => void;
	onSubmit: (values: any) => void;
}

const TransferToAddress = ({
	onBackButtonClick,
	onSubmit,
}: TransferToAddressProps) => {
	return (
		<div className='relative w-full h-screen bg-bcpayment-green-4'>
			<AppHeaderWrapper bottomOffset={0}>
				<div className='relative flex flex-col items-center px-6 pt-6 text-white'>
					<span className='text-[80px] text-white'>
						<MdOutlineSettingsEthernet />
					</span>
					<p className='font-bold text-[2 0px] text-center'>
						Chuyển tiền qua địa chỉ
					</p>
					<SlArrowLeft
						className='text-[20px] absolute left-0 top-[24px]'
						onClick={onBackButtonClick}
					/>
				</div>
			</AppHeaderWrapper>
			<div className='px-4 mt-6'>
				<Formik
					initialValues={{
						amount: 0,
						address: '',
					}}
					onSubmit={onSubmit}
				>
					{(form) => (
						<Form>
							<div className='flex flex-col gap-6'>
								<TransferMoneyInputItem
									inputType='address'
									name='address'
									validate={(value) =>
										fieldValidator({
											value,
											validateTypes: [IValidateType.REQUIRED],
										})
									}
								/>
								<TransferMoneyInputItem
									inputType='amount'
									name='amount'
									validate={(value) =>
										fieldValidator({
											value,
											validateTypes: [IValidateType.REQUIRED],
										})
									}
								/>
							</div>
							<div className='absolute bottom-0 left-0 w-full px-4 py-2 bg-white'>
								<AppButtonPrimary disabled={!form.isValid} type='submit'>
									Chuyển tiền
								</AppButtonPrimary>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default TransferToAddress;
