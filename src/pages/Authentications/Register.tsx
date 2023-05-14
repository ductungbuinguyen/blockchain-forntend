import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../generated/graphql';
import { SlArrowLeft } from 'react-icons/sl';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Formik, Form } from 'formik';
import AppButtonPrimary from '../../components/AppButtonPrimary';
import AuthInputItem from '../../components/FormItem/AuthInputItem';
import AuthPasswordItem from '../../components/FormItem/AuthPasswordItem';
import { fieldValidator, IValidateType } from '../../utils/formikValidator';
import AuthSelectItem from '../../components/FormItem/AuthSelectItem';
import AuthFileUpload from '../../components/AuthFileUpload';
import { useState } from 'react';
import { GENDER_OPTIONS } from '../../assets/constants';

const Register = () => {
	const navigate = useNavigate();
	const [isSuccess, setIsSuccess] = useState(false);
	const [register, { loading: isSubmitting }] = useRegisterMutation();

	return (
		<div className='w-screen h-screen bg-gradient-to-b from-bcpayment-green-1 to-bcpayment-green-2 px-[25px] py-[120px] relative'>
			<SlArrowLeft className='absolute top-10 left-[25px] text-white text-[20px] ' onClick={() => navigate('/login')}/>
			<div className='rounded-xl bg-white py-[40px] px-[20px] max-h-[100%] overflow-scroll'>
				{!isSuccess ? <Formik
					initialValues={{
						email: '',
						password: '',
						reEnterPassword: '',
						fullName: '',
						gender: undefined,
						identityCode: '',
						metaMaskPublicKey: '',
						phoneNumber: '',
					}}
					onSubmit={async ({
						email,
						password,
						fullName,
						gender,
						identityCode,
						metaMaskPublicKey,
						phoneNumber,
					}) => {
						const response = await register({
							variables: {
								registerInput: {
									email,
									password,
									fullName,
									gender,
									identityCode,
									metaMaskPublicKey,
									phoneNumber,
								},
							},
						});
						if (response?.data?.register?.success) {
							setIsSuccess(true);
						} else {
							console.log(response?.data?.register);
						}
					}}
				>
					{({values}) => (
						<Form>
							<div className='flex flex-col gap-4'>
								<AuthFileUpload name='avatar'/>
								<AuthInputItem
									name='fullName'
									placeholder='Nhập họ tên của bạn'
									label='Họ và tên'
									validate={(value) =>
										fieldValidator({
											value,
											validateTypes: [
												IValidateType.REQUIRED,
											],
										})
									}
								/>
								<AuthInputItem
									name='email'
									placeholder='Nhập email của bạn'
									label='Email'
									validate={(value) =>
										fieldValidator({
											value,
											validateTypes: [
												IValidateType.REQUIRED,
												IValidateType.EMAIL,
											],
										})
									}
								/>
								<AuthSelectItem
									name='gender'
									placeholder='Chọn giới tính của bạn'
									label='Giới tính'
									options={GENDER_OPTIONS}
									validate={(value) =>
										fieldValidator({
											value,
											validateTypes: [
												IValidateType.REQUIRED,
											],
										})
									}
								/>
								<AuthInputItem
									name='phoneNumber'
									placeholder='Số điện thoại của bạn'
									label='Số điện thoại'
									validate={(value) =>
										fieldValidator({
											value,
											validateTypes: [
												IValidateType.PHONE_NUMBER,
											],
										})
									}
								/>
								<AuthInputItem
									name='identityCode'
									placeholder='Nhập chứng minh nhân dân/ CCCD'
									label='Chứng minh nhân dân/ CCCD'
									validate={(value) =>
										fieldValidator({
											value,
											validateTypes: [
												IValidateType.REQUIRED,
											],
										})
									}
								/>
								<AuthInputItem
									name='metaMaskPublicKey'
									placeholder='Nhập địa chỉ ví'
									label='Địa chỉ ví'
									validate={(value) =>
										fieldValidator({
											value,
											validateTypes: [
												IValidateType.REQUIRED,
											],
										})
									}
								/>
								<AuthPasswordItem
									name='password'
									placeholder='Nhập mật khẩu của bạn'
									label='Mật khẩu'
									validate={(value) =>
										fieldValidator({
											value,
											validateTypes: [IValidateType.REQUIRED],
										})
									}
								/>
								<AuthPasswordItem
									name='reEnterPassword'
									placeholder='Nhập lại mật khẩu của bạn'
									label='Nhập lại mật khẩu'
									validate={(value) =>
										fieldValidator({
											value,
											validateTypes: [IValidateType.RE_ENTER_PASSWORD],
											values
										})
									}
								/>
								<AppButtonPrimary
									className='mt-4'
									type='submit'
									disabled={isSubmitting}
								>
									đăng ký
								</AppButtonPrimary>
							</div>
						</Form>
					)}
				</Formik> : (
					<div className='flex flex-col items-center gap-8'>
						<div className='flex flex-col items-center gap-4'>
							<AiOutlineCheckCircle className='text-bcpayment-green-1 text-[40px]'/>
							<p className='text-bcpayment-green-1 font-bold text-[20px] text-center'>Chúc mừng bạn đã đăng ký tài khoản ví điện tử thành công</p>
						</div>
						<p className='text-bcpayment-gray-1 font-bold text-[15px] text-center'>Bây giờ bạn sẽ sử dụng email và mật khẩu vừa tạo để đăng nhập.</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Register;
