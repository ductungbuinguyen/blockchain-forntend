import { SlArrowLeft } from 'react-icons/sl';
import AppHeaderWrapper from '../components/AppHeaderWrapper';
import { useNavigate } from 'react-router-dom';
import { fieldValidator, IValidateType } from '../utils/formikValidator';
import { Form, Formik } from 'formik';
import { useUpdateUserInfoMutation, useUserQuery } from '../generated/graphql';
import { BsPersonFill } from 'react-icons/bs';
import AppButtonPrimary from '../components/AppButtonPrimary';
import UserInfoInputItem from '../components/FormItem/UserInfoInputItem';
import UserInfoSelectItem from '../components/FormItem/UserInfoSelectItem';
import { GENDER_OPTIONS } from '../assets/constants';
import UserInfoPasswordItem from '../components/FormItem/UserInfoPasswordItem';
import UserInfoCopyItem from '../components/FormItem/UserInfoCopyItem';
import AuthFileUpload from '../components/AuthFileUpload';
import { useUpdatePasswordMutation } from '../generated/graphql';
import { useUpdateUserMerchantMetadataMutation } from '../generated/graphql';

const UserInfo = () => {
	const navigate = useNavigate();
	const [updateUserInfo] = useUpdateUserInfoMutation();
	const [updatePassword] = useUpdatePasswordMutation()
	const [updateUserMerchantMetadata] = useUpdateUserMerchantMetadataMutation()
	const { data: userData } = useUserQuery();
	const {
		fullName,
		email,
		gender,
		merchantMetaData,
		contract,
		identityCode,
		phoneNumber,
		metaMaskPublicKey,
		base64Avatar,
	} = userData?.user ?? {};
	const {
		businessField,
		companyIdentify,
		companyName,
		merchantSecretKey,
		note,
		storeLocation,
		websiteUrl,
	} = merchantMetaData ?? {};
	return (
		<div className='relative w-full h-screen bg-bcpayment-green-4'>
			<AppHeaderWrapper bottomOffset={0}>
				<div className='relative flex flex-col items-center px-6 pt-6 text-white'>
					<span className='text-[80px] text-white'>
						<BsPersonFill />
					</span>
					<p className='font-bold text-[2 0px] text-center'>
						Thông tin cá nhân
					</p>
					<SlArrowLeft
						className='text-[20px] absolute left-0 top-[24px]'
						onClick={() => navigate('/')}
					/>
				</div>
			</AppHeaderWrapper>
			<div className='max-h-[80%] overflow-y-scroll'>
				<p className='mx-4 mt-6 text-black font-bold text-[18px]'>
					Thông tin cá nhân
				</p>
				<div className='px-4 mt-6'>
					<Formik
						initialValues={{
							email,
							fullName,
							gender,
							identityCode,
							phoneNumber,
							base64Avatar,
						}}
						enableReinitialize
						onSubmit={(values) => {
							updateUserInfo({
								variables: {
									updateUserInfoInput: {
										...values,
									}
								}
							})
						}}
					>
						{(form) => (
							<Form>
								<div className='flex flex-col gap-6'>
									<AuthFileUpload name='base64Avatar' />
									<UserInfoInputItem
										name='fullName'
										placeholder='Họ và tên'
										label='Họ và tên'
										validate={(value) =>
											fieldValidator({
												value,
												validateTypes: [IValidateType.REQUIRED],
											})
										}
									/>
									<UserInfoInputItem
										name='email'
										placeholder='Email'
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
									<UserInfoSelectItem
										name='gender'
										placeholder='Chọn giới tính của bạn'
										label='Giới tính'
										options={GENDER_OPTIONS}
										validate={(value) =>
											fieldValidator({
												value,
												validateTypes: [IValidateType.REQUIRED],
											})
										}
									/>
									<UserInfoInputItem
										name='phoneNumber'
										placeholder='Số điện thoại'
										label='Số điện thoại'
										validate={(value) =>
											fieldValidator({
												value,
												validateTypes: [IValidateType.PHONE_NUMBER],
											})
										}
									/>
									<UserInfoInputItem
										name='identityCode'
										placeholder='Chứng minh nhân dân/ CCCD'
										label='Chứng minh nhân dân/ CCCD'
										validate={(value) =>
											fieldValidator({
												value,
												validateTypes: [IValidateType.REQUIRED],
											})
										}
									/>
									<UserInfoInputItem
										name='metaMaskPublicKey'
										label='Địa chỉ ví'
										disabled
										value={metaMaskPublicKey ?? ""}
									/>
									<AppButtonPrimary
										className='mt-4'
										type='submit'
										disabled={!form.isValid || !form.dirty}
									>
										Cập nhật thông tin
									</AppButtonPrimary>
								</div>
							</Form>
						)}
					</Formik>
				</div>
				<p className='mx-4 mt-6 text-black font-bold text-[18px]'>
					Đổi mật khẩu
				</p>
				<div className='px-4 mt-6'>
					<Formik
						initialValues={{
							oldPassword: '',
							newPassword: '',
							reEnterNewPassword: '',
						}}
						enableReinitialize
						onSubmit={(values) => {
							updatePassword({
								variables: {
									updatePasswordInput: {
										...values,
									}
								}
							})
						}}
					>
						{(form) => (
							<Form>
								<div className='flex flex-col gap-6'>
									<UserInfoPasswordItem
										name='oldPassword'
										placeholder='Mật khẩu cũ'
										label='Mật khẩu cũ'
										validate={(value) =>
											fieldValidator({
												value,
												validateTypes: [IValidateType.REQUIRED],
											})
										}
									/>
									<UserInfoPasswordItem
										name='newPassword'
										placeholder='Mật khẩu mới'
										label='Mật khẩu mới'
										validate={(value) =>
											fieldValidator({
												value,
												validateTypes: [IValidateType.REQUIRED],
											})
										}
									/>
									<UserInfoPasswordItem
										name='reEnterNewPassword'
										placeholder='Xác nhận mật khẩu mới'
										label='Xác nhận mật khẩu mới'
										validate={(value) =>
											fieldValidator({
												value,
												validateTypes: [IValidateType.REQUIRED],
											})
										}
									/>
									<AppButtonPrimary
										className='mt-4'
										type='submit'
										disabled={!form.isValid}
									>
										Đổi mật khẩu
									</AppButtonPrimary>
								</div>
							</Form>
						)}
					</Formik>
				</div>
				{merchantMetaData && (
					<>
						<p className='mx-4 mt-6 text-black font-bold text-[18px]'>
							Thông tin doanh nghiệp
						</p>
						<div className='px-4 mt-6'>
							<Formik
								initialValues={{
									companyName,
									companyIdentify,
									businessField,
									websiteUrl,
									storeLocation,
									note,
								}}
								enableReinitialize
								onSubmit={(values) => {
									updateUserMerchantMetadata({
										variables: {
											updateUserMerchantMetadataInput: {
												...values
											}
										}
									})
								}}
							>
								{(form) => (
									<Form>
										<div className='flex flex-col gap-6'>
											<UserInfoInputItem
												name='companyName'
												placeholder='Tên doanh nghiệp'
												label='Tên doanh nghiệp'
												validate={(value) =>
													fieldValidator({
														value,
														validateTypes: [IValidateType.REQUIRED],
													})
												}
											/>
											<UserInfoInputItem
												name='companyIdentify'
												placeholder='Mã số doanh nghiệp'
												label='Mã số doanh nghiệp'
												validate={(value) =>
													fieldValidator({
														value,
														validateTypes: [IValidateType.REQUIRED],
													})
												}
											/>
											<UserInfoInputItem
												name='businessField'
												placeholder='Ngành hàng'
												label='Ngành hàng'
												validate={(value) =>
													fieldValidator({
														value,
														validateTypes: [IValidateType.REQUIRED],
													})
												}
											/>
											<UserInfoInputItem
												name='websiteUrl'
												placeholder='Địa chỉ website bán hàng'
												label='Địa chỉ website bán hàng'
											/>
											<UserInfoInputItem
												name='storeLocation'
												placeholder='Địa điểm cửa hàng'
												label='Địa điểm cửa hàng'
												validate={(value) =>
													fieldValidator({
														value,
														validateTypes: [IValidateType.REQUIRED],
													})
												}
											/>
											<UserInfoInputItem
												name='note'
												placeholder='Ghi chú'
												label='Ghi chú'
											/>
											<UserInfoCopyItem
												name='apiSecretKey'
												label='Api secret key'
												disabled
												value={merchantSecretKey ?? ''}
											/>
											<UserInfoCopyItem
												name='smartContractAddress'
												label='Địa chỉ hợp đồng thông minh'
												disabled
												value={contract?.address ?? ''}
											/>
											<AppButtonPrimary
												className='mt-4'
												type='submit'
												disabled={!form.isValid || !form.dirty}
											>
												Đổi thông tin doanh nghiệp
											</AppButtonPrimary>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default UserInfo;
