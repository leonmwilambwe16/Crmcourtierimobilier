import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"


interface Props {
    children:JSX.Element;
    allowedRoles:("CLIENT" | "COURTIER" |  "ADMIN")[]
}


const ProtectedRoute =({ children, allowedRoles }: Props)=>{
  
    const {user}=useAuth();
    if(!user) return <Navigate to="/login"/>;

    
    if(!allowedRoles.includes(user.role)){
        return <Navigate to="/" replace/>
    }
    
return children

};

export default ProtectedRoute
