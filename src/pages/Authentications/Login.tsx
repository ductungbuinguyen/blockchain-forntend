import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useLoginMutation } from '../../generated/graphql';
import JWTManager from '../../utils/jwt';
import AuthInputItem from '../../components/FormItem/AuthInputItem';
import { Formik, Form } from 'formik';
import AuthPasswordItem from '../../components/FormItem/AuthPasswordItem';
import AppButtonPrimary from '../../components/AppButtonPrimary';
import { IValidateType, fieldValidator } from '../../utils/formikValidator';
import { Link } from "react-router-dom";
import { useApolloClient } from '@apollo/client';

const Login = () => {
	const apolloClient = useApolloClient()
	const { setIsAuthenticated } = useAuthContext();
	const navigate = useNavigate();

	const [login, {
		loading: isSubmitting,
	}] = useLoginMutation();

	return (
		<div className='w-screen h-screen bg-gradient-to-b from-bcpayment-green-1 to-bcpayment-green-2 px-[25px] py-[80px] flex flex-col justify-between'>
			<div className='rounded-xl bg-white py-[40px] px-[20px]'>
				<Formik
					initialValues={{ email: '', password: '' }}
					onSubmit={async ({email, password}) => {
						const response = await login({
							variables: { loginInput: { email, password } },
						}).catch(err => console.log("err", err));
						if (response?.data?.login?.success) {
							JWTManager.setToken(response.data.login.accessToken as string);
							setIsAuthenticated(true);
							apolloClient.refetchQueries({ include: "active" })
							navigate('..');
						} else {
							console.log(response?.data?.login)
						}
					}}
				>
					{() => (
						<Form>
							<div className='flex flex-col gap-4'>
								<AuthInputItem
									name='email'
									placeholder='Nhập email của bạn'
									label='Email'
									validate={(value) => fieldValidator({
										value,
										validateTypes: [IValidateType.REQUIRED, IValidateType.EMAIL]
									})}
								/>
								<AuthPasswordItem
									name='password'
									placeholder='Nhập mật khẩu của bạn'
									label='Mật khẩu'
									validate = {(value) => fieldValidator({
										value,
										validateTypes: [IValidateType.REQUIRED]
									})}
								/>
								<AppButtonPrimary className='mt-4' type='submit' disabled={isSubmitting}>
									đăng nhập
								</AppButtonPrimary>
							</div>
						</Form>
					)}
				</Formik>
			</div>
			<p className='font-bold text-[17px] text-white	'>Bạn chưa có tài khoản? <span className='text-bcpayment-orange'><Link to={'/register'}>Đăng ký ngay</Link></span></p>
		</div>
	);
};

export default Login;
