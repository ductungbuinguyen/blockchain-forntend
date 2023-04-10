import jwtDecode, { JwtPayload } from 'jwt-decode'
import { User } from '../generated/graphql'

const JWTManager = () => {
	const LOGOUT_EVENT_NAME = 'jwt-logout'

	let inMemoryToken: string | null = null
	let refreshTokenTimeoutId: number | null = null
	let userInfo: User | null = null
	

	const getToken = () => inMemoryToken

	const getUserInfo = () => userInfo

	const setToken = (accessToken: string) => {
		inMemoryToken = accessToken

		// Decode and set countdown to refresh
		const decoded = jwtDecode<JwtPayload & { userInfo: User }>(accessToken)
		userInfo = decoded.userInfo
		setRefreshTokenTimeout((decoded.exp as number) - (decoded.iat as number))
		return true
	}

	const abortRefreshToken = () => {
		if (refreshTokenTimeoutId) window.clearTimeout(refreshTokenTimeoutId)
	}

	const deleteToken = () => {
		inMemoryToken = null
		abortRefreshToken()
		window.localStorage.setItem(LOGOUT_EVENT_NAME, Date.now().toString())
		return true
	}

	// To logout all tabs (nullify inMemoryToken)
	window.addEventListener('storage', event => {
		if (event.key === LOGOUT_EVENT_NAME) inMemoryToken = null
	})

	const getRefreshToken = async () => {
		try {
			const response = await fetch('http://localhost:4000/refresh_token', {
				credentials: 'include'
			})
			const data = (await response.json()) as {
				success: boolean
				accessToken: string
			}

			setToken(data.accessToken)
			return true
		} catch (error) {
			console.log('UNAUTHENTICATED', error)
			deleteToken()
			return false
		}
	}

	const setRefreshTokenTimeout = (delay: number) => {
		// 5s before token expires
		refreshTokenTimeoutId = window.setTimeout(
			getRefreshToken,
			delay * 1000 - 5000
		)
	}

	return { getToken, setToken, getRefreshToken, deleteToken, getUserInfo }
}

export default JWTManager()
