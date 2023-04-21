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
	userId: User["id"] | null
	setUserId: Dispatch<SetStateAction<User["id"] | null>>
	setIsAuthenticated: Dispatch<SetStateAction<boolean>>
	checkAuth: () => Promise<void>
	logoutClient: () => void
}

const defaultIsAuthenticated = false

export const AuthContext = createContext<IAuthContext>({
	userId: null,
	isAuthenticated: defaultIsAuthenticated,
	setUserId: () => {},
	setIsAuthenticated: () => {},
	checkAuth: () => Promise.resolve(),
	logoutClient: () => {}
})

export const useAuthContext = () => useContext(AuthContext)

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(defaultIsAuthenticated)
	const [userId, setUserId] = useState<User["id"]>(null)
	console.log("userId", userId)
	const checkAuth = useCallback(async () => {
		const token = JWTManager.getToken()
		console.log('token', token)
		if (token) {
			setIsAuthenticated(true)
			const userId = JWTManager.getUserId()
			console.log('userid', userId)
			setUserId(userId)
		}
		else {
			const success = await JWTManager.getRefreshToken()
			if (success) {
				setIsAuthenticated(true)
				const userId = JWTManager.getUserId()
				console.log('userid', userId)
				setUserId(userId)
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
		userId,
		setUserId,
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
