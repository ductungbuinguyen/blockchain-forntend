import { MdStore } from 'react-icons/md';
import { SlArrowLeft } from 'react-icons/sl';
import AppHeaderWrapper from '../components/AppHeaderWrapper';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import RegisterMerchantInputItem from '../components/FormItem/RegisterMerchantInputItem';
import { IValidateType, fieldValidator } from '../utils/formikValidator';
import AppNoteItem from '../components/FormItem/TransferMoneyNoteItem';
import AppButtonPrimary from '../components/AppButtonPrimary';
import { UserDocument, UserQuery, useRegisterMerchantMutation, useUserQuery } from '../generated/graphql';
import { useContractContext } from '../contexts/ContractContext';
import AppOrderListing from '../components/AppOrderListing';
import UserInfoSelectItem from '../components/FormItem/UserInfoSelectItem';

const Merchant = () => {
	const navigate = useNavigate();
  const { data } = useUserQuery();
	const { metaMaskPublicKey, merchantMetaData } = data?.user ?? {}
  const { deployECommerceContract } = useContractContext()
	const [registerMerchant] = useRegisterMerchantMutation({
		update(cache, { data }) {
			const { registerMerchant } = data ?? {}
			cache.updateQuery<Omit<UserQuery, "__typename">>({
				query: UserDocument
			}, (data) => {
				return {
					user: {
						...data?.user as any,
						merchantMetaData: registerMerchant?.merchantMetaData
					}
				}
			})
		}
	});
	const onFormSubmit = async (values: any) => {
    const deployContractResult = await deployECommerceContract(metaMaskPublicKey || "", values?.type)
    if(deployContractResult) {
      await registerMerchant({
        variables: {
          registerMerchantInput: values
        },
      });
    }
	};
	return !merchantMetaData ? (
		<div className='relative w-full h-screen bg-bcpayment-green-4'>
			<AppHeaderWrapper bottomOffset={0}>
				<div className='relative flex flex-col items-center px-6 pt-6 text-white'>
					<span className='text-[80px] text-white'>
						<MdStore />
					</span>
					<p className='font-bold text-[2 0px] text-center'>
						Đăng kí làm nhà bán hàng
					</p>
					<SlArrowLeft
						className='text-[20px] absolute left-0 top-[24px]'
						onClick={() => navigate('/')}
					/>
				</div>
			</AppHeaderWrapper>
			<p className='mx-4 mt-6 text-black font-bold text-[18px]'>
				Thông tin doanh nghiệp
			</p>
			<div className='px-4 mt-6 overflow-y-scroll max-h-[calc(100%-280px)]'>
				<Formik
					initialValues={{
						companyName: '',
						companyIdentify: '',
						businessField: '',
						websiteUrl: '',
						storeLocation: '',
						note: '',
						type: 'online',
					}}
					onSubmit={onFormSubmit}
				>
					{(form) => (
						<Form>
							<div className='flex flex-col gap-6'>
								<UserInfoSelectItem
										name='type'
										placeholder='Loại cửa hàng'
										options={[
											{
												name: "online",
												value: "online",
											},
											{
												name: "offline",
												value: "offline",
											},
										]}
										validate={(value) =>
											fieldValidator({
												value,
												validateTypes: [IValidateType.REQUIRED],
											})
										}
									/>
								<RegisterMerchantInputItem
									name='companyName'
									placeholder='Tên doanh nghiệp'
									validate={(value) =>
										fieldValidator({
											value,
											validateTypes: [IValidateType.REQUIRED],
										})
									}
								/>
								<RegisterMerchantInputItem
									name='companyIdentify'
									placeholder='Mã số doanh nghiệp'
									validate={(value) =>
										fieldValidator({
											value,
											validateTypes: [IValidateType.REQUIRED],
										})
									}
								/>
								<RegisterMerchantInputItem
									name='businessField'
									placeholder='Ngành hàng'
									validate={(value) =>
										fieldValidator({
											value,
											validateTypes: [IValidateType.REQUIRED],
										})
									}
								/>
								<RegisterMerchantInputItem
									name='websiteUrl'
									placeholder='Địa chỉ website bán hàng'
								/>
								<RegisterMerchantInputItem
									name='storeLocation'
									placeholder='Địa điểm cửa hàng'
									validate={(value) =>
										fieldValidator({
											value,
											validateTypes: [IValidateType.REQUIRED],
										})
									}
								/>
								<AppNoteItem
									inputType='registerMerchantNote'
									name='note'
									placeholder='Ghi chú'
								/>
							</div>
							<div className='absolute bottom-0 left-0 w-full px-4 py-2 bg-white'>
								<AppButtonPrimary disabled={!form.isValid} type='submit'>
									Đăng ký
								</AppButtonPrimary>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	) : <AppOrderListing type='sell' />
};

export default Merchant;
