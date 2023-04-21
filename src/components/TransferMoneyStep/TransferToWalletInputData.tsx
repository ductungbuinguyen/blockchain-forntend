import { SlArrowLeft } from 'react-icons/sl';
import { User, useUsersQuery } from '../../generated/graphql';
import AppHeaderWrapper from '../AppHeaderWrapper';
import { Form, Formik } from 'formik';
import TransferMoneyInputItem from '../FormItem/TransferMoneyInputItem';
import { IValidateType, fieldValidator } from '../../utils/formikValidator';
import AppNoteItem from '../FormItem/TransferMoneyNoteItem';
import AppButtonPrimary from '../AppButtonPrimary';

interface TransferToWalletInputDataProps {
	userId: User['id'];
	onBackButtonClick: () => void;
	onSubmit: (values: any) => void;
}

const TransferToWalletInputData = ({
	userId,
	onBackButtonClick,
	onSubmit,
}: TransferToWalletInputDataProps) => {
	const { data } = useUsersQuery();
	const user = data?.users?.find((user) => user?.id === userId);
	if (user) {
		const { fullName, metaMaskPublicKey } = user;
		return (
			<div className='relative w-full h-screen bg-bcpayment-green-4'>
				<AppHeaderWrapper bottomOffset={0}>
					<div className='relative flex flex-col items-center px-6 pt-6 text-white'>
						<div className='rounded-full overflow-clip w-[170px] h-[170px]'>
							<img src='/avatar.jpg' />
						</div>
						<p className='font-bold text-[27px] text-center'>{fullName}</p>
						<p className='text-[20px] font-medium break-words text-center max-w-[294px]'>
							{metaMaskPublicKey}
						</p>
						<SlArrowLeft
							className='text-[20px] absolute left-0 top-[24px]'
							onClick={onBackButtonClick}
						/>
					</div>
				</AppHeaderWrapper>
				<div className='px-4 mt-6'>
					<Formik initialValues={{
						amount: 0,
						note: ''
					}} onSubmit={onSubmit}>
						{(form) => (
							<Form>
								<div className='flex flex-col gap-6'>
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
									<AppNoteItem inputType='transferMoneyNote' name='note' />
								</div>
								<div className='absolute bottom-0 left-0 w-full px-4 py-2 bg-white'>
									<AppButtonPrimary
										disabled={!form.isValid}
										type='submit'
									>
										Chuyển tiền
									</AppButtonPrimary>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		);
	}
	return <></>;
};

export default TransferToWalletInputData;
