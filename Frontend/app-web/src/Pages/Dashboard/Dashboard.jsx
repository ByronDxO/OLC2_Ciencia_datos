import {useEffect} from "react";
import Tabs from "../../Components/Dashboard/Tabs";


const Dashboard = ({ setArrayNames }) => {

    useEffect(() => {
        let initialObjects = [
            { link: "/", name: "inicio" },
            { link: "/dashboard", name: "Dashboard" }
        ];
        setArrayNames(initialObjects);
    }, []);

    return (
        <div className="container">
            <h5>Graficos</h5>
            <Tabs />
        </div>
    );
}

export default Dashboard;