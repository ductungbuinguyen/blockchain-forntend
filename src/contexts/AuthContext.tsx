import {
	useState,
	Dispatch,
	SetStateAction,
	createContext,
	ReactNode,
	useContext,
	useCallback
} from 'react'
import JWTManager from '../utils/jwt'
import { User } from '../generated/graphql'

interface IAuthContext {
	isAuthenticated: boolean
	userInfo: User | null
	setUserInfo: Dispatch<SetStateAction<User | null>>
	setIsAuthenticated: Dispatch<SetStateAction<boolean>>
	checkAuth: () => Promise<void>
	logoutClient: () => void
}

const defaultIsAuthenticated = false

export const AuthContext = createContext<IAuthContext>({
	userInfo: null,
	isAuthenticated: defaultIsAuthenticated,
	setUserInfo: () => {},
	setIsAuthenticated: () => {},
	checkAuth: () => Promise.resolve(),
	logoutClient: () => {}
})

export const useAuthContext = () => useContext(AuthContext)

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(defaultIsAuthenticated)
	const [userInfo, setUserInfo] = useState<User | null>(null)

	const checkAuth = useCallback(async () => {
		const token = JWTManager.getToken()
		if (token) {
			setIsAuthenticated(true)
			const decodedUserInfo = JWTManager.getUserInfo()
			setUserInfo(decodedUserInfo)
		}
		else {
			const success = await JWTManager.getRefreshToken()
			if (success) {
				setIsAuthenticated(true)
				const decodedUserInfo = JWTManager.getUserInfo()
				setUserInfo(decodedUserInfo)
			}
		}
	}, [])

	const logoutClient = () => {
		JWTManager.deleteToken()
		setIsAuthenticated(false)
	}

	const authContextData = {
		isAuthenticated,
		setIsAuthenticated,
		userInfo,
		setUserInfo,
		checkAuth,
		logoutClient
	}

	return (
		<AuthContext.Provider value={authContextData}>
			{children}{' '}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
