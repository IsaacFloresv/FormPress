import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({user, children, redirecTo='/'}) => {
    console.log(user)
    if (!user){
        return <Navigate to={redirecTo} />
    }


    return children ? children : <Outlet />
}