import { useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";

export default function RedirectOwnProfile ({ children }){
    const userData = useSelector(state => state.user.data && state.user.data.user);
    const { idUser } = useParams();

    if (userData && userData.id === idUser) {
        return <Navigate to="/profile" />;
    }

    return children;
};

