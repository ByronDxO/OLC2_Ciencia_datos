import {useEffect} from "react";
import Tabs from "../../Components/Trainings/Tabs";

const Training = ({ setArrayNames }) => {

    useEffect(() => {
        let initialObjects = [
            { link: "/", name: "inicio" },
            { link: "/training", name: "trainings" }
        ];
        setArrayNames(initialObjects);
    }, []);

    return (
        <div className="container">
            <h5>Entrenamientos</h5>
            <Tabs />
        </div>
    );
}

export default Training;