import {useEffect} from "react";
import Tabs from "../../Components/Dashboard/Tabs";
import Navigation from "../../Components/regresiones/navegacion"

const Dashboard = ({ setArrayNames }) => {

    useEffect(() => {
        let initialObjects = [
            { link: "/", name: "inicio" },
            { link: "/dashboard", name: "Regresion Lineal" }
        ];
        setArrayNames(initialObjects);
    }, []);

    return (
        <div className="container">
            
            <Navigation/>
        </div>
    );
}

export default Dashboard;