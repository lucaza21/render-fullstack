import { createContext, useCallback, useEffect, useState } from "react"
import { mockLogin } from "../utils/mock_respuesta"
import {
  getCurrentUser,
  isTokenActive,
  setLogoutIfExpiredHandler,
  logout as logoutService,
  setAuthToken
} from "../utils/Autorizacion"
import { Spinner } from "react-bootstrap"

const AutorizacionContext = createContext({
  user: undefined,
  isLoading: false,
  login: () => login(),
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
        //const result = await mockLogin(username, password, perfil)
        let apiUrl
        if(perfil=='alumno'){
          apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/alumnos/login`;
        }
        else if(perfil=='profesor'){
          apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/profesors/login`;
        }

        const postData = {
          correo: username,
          password
      };
        const result = await fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
      })
      //.then(response => response.json())
      //console.log(result) 
      if (result.status == 200) {
            console.log(result.status)
            const data = await result.json();
            //console.log(data.logedUser.token)
            console.log("imprimir token- "+ JSON.stringify(data.logedUser));
            setAuthToken(data.logedUser)    
            console.log("después del setAuthToken");
            setLogoutIfExpiredHandler(setUser)
            loadUser()
            //const token = data.token
            //localStorage.setItem('authorization', JSON.stringify(data.token));
            //onLoginComplete(false);
          } 

      else if (result.status == 401){
            console.log(result.status)
            //onLoginComplete(true);
            //setLogError(true)
            navigate("/login")
        }

        else {
          console.log(result.status)
        }
        
      } catch (apiError) {
        console.log('entro al catch: ' + apiError)
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