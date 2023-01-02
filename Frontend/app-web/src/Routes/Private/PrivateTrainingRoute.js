import { Navigate } from 'react-router-dom';
import Training from "../../Pages/Training/Training";
import useAuthContext from '../../hooks/useAuthContext';

const PrivateTrainingRoute = (props) => {
    
    const {isAuthenticated} = useAuthContext();


    if(!isAuthenticated){
        return <Navigate to="/" />
    }

    return ( <Training setArrayNames={props.setArrayNames} />);
};


export default PrivateTrainingRoute;