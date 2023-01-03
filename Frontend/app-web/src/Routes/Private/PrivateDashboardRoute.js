import { Navigate } from 'react-router-dom';
import Welcome from "../../Pages/Welcome";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import useAuthContext from '../../hooks/useAuthContext';

const PrivateDashboardRoute = (props) => {
    
    const {isAuthenticated} = useAuthContext();


    if(isAuthenticated){
        return <Navigate to="/" />
    }

    return ( <Dashboard setArrayNames={props.setArrayNames} />);
};


export default PrivateDashboardRoute;