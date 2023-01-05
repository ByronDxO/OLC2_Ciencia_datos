import {useEffect} from "react";
import Tabs from "../../Components/Dashboard/Tabs";
import Navigation from "../../Components/regresiones/navegacion"

const Polinomial = ({ setArrayNames }) => {

    useEffect(() => {
        let initialObjects = [
            { link: "/", name: "inicio" },
            { link: "/Polinomial", name: "Regresion Polinomial" }
        ];
        setArrayNames(initialObjects);
    }, []);

    return (
        <div className="container">
            
            <Navigation/>
        </div>
    );
}

export default Polinomial;