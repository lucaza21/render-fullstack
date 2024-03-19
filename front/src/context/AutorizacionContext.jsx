import { createContext, useCallback, useEffect, useState } from "react"
import { mockLogin } from "../utils/mock_respuesta"
import {
  getCurrentUser,
  isTokenActive,
  setLogoutIfExpiredHandler,
  logout as logoutService,
  setAuthToken
} from "../utils/Autorizacion"

const AutorizacionContext = createContext({
  user: undefined,
  isLoading: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  loadUser: () => {}
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getCurrentUser())
  const [isLoading, setIsLoading] = useState(false)

  const loadUser = useCallback(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
  }, [])

  useEffect(() => {
    if (isTokenActive()) {
      setLogoutIfExpiredHandler(setUser)
      loadUser()
    } else {
      logoutService()
      setUser(undefined)
    }
  }, [loadUser])

  const login = useCallback(
    async (username, password, perfil) => {
      setIsLoading(true)     
      console.log('antes del try try')     
      try {
        console.log('entro al try')
        const result = await mockLogin(username, password, perfil)
        console.log("imprimier token- "+result.token);
        setAuthToken(result.token)    
        console.log("después del setAuthToken");
        setLogoutIfExpiredHandler(setUser)
        loadUser()
      } catch (apiError) {
        console.log('entro al catch')
        throw new Error()
      } finally {
        console.log('entro al finally')
        setIsLoading(false)
      }
    },
    [setUser, loadUser]
  )

  const logout = useCallback(async () => {
    logoutService()
    setUser(undefined)
  }, [])

  return (
    <AutorizacionContext.Provider value={{ user, isLoading, login, logout, loadUser }}>
      {children}
    </AutorizacionContext.Provider>
  )
}

export default AutorizacionContext