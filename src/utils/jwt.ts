import jwtDecode, { JwtPayload } from 'jwt-decode'
import { User } from '../generated/graphql'

const JWTManager = () => {
	const LOGOUT_EVENT_NAME = 'jwt-logout'

	let inMemoryToken: string | null = null
	let refreshTokenTimeoutId: number | null = null
	let userId: User["id"] = null
	

	const getToken = () => inMemoryToken
	console.log("inMemoryToken", inMemoryToken)
	const getUserId = () => userId

	const setToken = (accessToken: string) => {
		inMemoryToken = accessToken
		console.log("accessToken", accessToken)

		// Decode and set countdown to refresh
		const decoded = jwtDecode<JwtPayload & { userId: User['id'] }>(accessToken)
		userId = decoded.userId
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
			const response = await fetch(process.env.REACT_APP_REFRESH_TOKEN_URI as string, {
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

	return { getToken, setToken, getRefreshToken, deleteToken, getUserId }
}

export default JWTManager()
