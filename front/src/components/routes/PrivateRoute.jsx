import useAutorizacion from "../../hooks/useAutorizacion"
import { useEffect } from "react";

function PrivateRoute({ children }) {
    const { user, loadUser } = useAutorizacion()
    console.log("imprimir user= "+user+"--imprimir LoadUser="+loadUser);

    useEffect(() => {
        loadUser()
    }, [loadUser])

    return user ? children : <Navigate to="/login" replace={true} />
}

export default PrivateRoute
