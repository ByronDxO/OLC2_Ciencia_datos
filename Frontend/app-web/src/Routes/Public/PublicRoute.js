import { Navigate} from 'react-router-dom';
import Welcome from "../../Pages/Welcome";
import useAuthContext from '../../hooks/useAuthContext';

const PublicRoute = (props) => {
    
    const {isAuthenticated} = useAuthContext();


    if(isAuthenticated){
        return <Navigate to="/dashboard" />
    }

    return ( <Welcome setArrayNames={props.setArrayNames} />);

};


export default PublicRoute;