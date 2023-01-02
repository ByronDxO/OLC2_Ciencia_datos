import M from '@materializecss/materialize/dist/js/materialize.min';
import {useEffect, useState} from "react";
import CardActivities from "./CardActivities";
import io from "socket.io-client";
import { MY_AUTH_ID } from "../../config/env";

const Tabs = () => {
    const [ isConnected, setIsConnected ] = useState(false);
    const [ socketInstance, setSocketInstance ] = useState("");
    const [ force, setForce ] = useState("");
    const [ speed, setSpeed ] = useState("");
    const [ rithm, setRithm ] = useState("");
    const [ isPlay, setIsPlay ] = useState(true);
    const [ idType, setIdType ] = useState("1");
    const [ retro, setRetro ] = useState("");

    useEffect(() => {
        try {
            const socket = io("http://localhost:5000/", {
                transports: ["websocket"],
                cors: {
                    origin: "http://localhost:3000/training"
                },
            });

            setSocketInstance(socket);

            socket.on('connect', () => {
                setIsConnected(true);
            });

            socket.on('disconnect', () => {
                setIsConnected(false);
            });

            socket.on('fuerza', msg => {
                setForce(msg);
                console.log(msg);
            });

            socket.on('velocidad', msg => {
                let v = msg / 5 * 60;
                setSpeed(v.toString());
            });

            socket.on('ritmo', msg => {
                let r = msg / 5 * 60;

                if ( r > 60 ) {
                    setRetro("Vas muy very gud");
                } else {
                    setRetro("Te hacen falta vitaminas");
                }

                setRithm(r.toString());
            });
        } catch (e) {
            console.log("Error con sockets");
        }

        M.AutoInit();
        let tabs = document.querySelectorAll("tabs");
        let instanceTabs = M.Tabs.init(tabs);
    }, [force]);

    const sendDataTraining = (id) => {
        try {
            socketInstance.emit('nuevo_entrenamiento', {
                idTipo: id,
                idUsuario: localStorage.getItem(MY_AUTH_ID),
            });

            M.toast({html: 'Nuevo Entrenamiento Guardado!'});
        } catch (e) {
            M.toast({html: `Algo salió mal! ${e}`});
        }

    }

    const changeIcon = () => {
        setIsPlay(!isPlay);
        if ( isPlay ) {
            // console.log(idType);
            sendDataTraining(idType);
        } else {
            M.toast({html: 'Entrenamiento Detenido!'});
        }
    }

    return (
        <div className="row">
            <div className="fixed-action-btn">
                <a className="btn-floating btn-large red"
                    onClick={() => changeIcon()}>
                    { isPlay ?
                        <i className="large material-icons">play_arrow</i> :
                        <i className="large material-icons">stop</i> }
                </a>
            </div>
            <div className="col s12">
                <ul className="tabs tabs-fixed-width tab-demo z-depth-1">
                    <li className="tab col s3"><a className="active" href="#force"
                        onClick={ () => setIdType("1") }>Fuerza</a></li>

                    <li className="tab col s3"><a href="#speed"
                    onClick={ () => setIdType("2") }>Velocidad</a></li>

                    <li className="tab col s3"><a href="#rithm"
                    onClick={ () => setIdType("3") }>Ritmo</a></li>
                </ul>
            </div>
            <div className="row">

                <div id="force" className="col s12 m12">
                    <CardActivities retro={""}
                                    title={"Fuerza"}
                                    unit={`${force} N`}
                                    typeClass={"force"} progress={`${force}%`} />
                </div>
                <div id="speed" className="col s12 m12">
                    <CardActivities retro={""}
                                    title={"Velocidad"}
                                    unit={`${speed} golpes por minuto`}
                                    typeClass={"speed"} progress={`${speed}%`}/>
                </div>
                <div id="rithm" className="col s12 m12">
                    <CardActivities retro={retro}
                                    title={"Ritmo"}
                                    unit={`${rithm}%`}
                                    typeClass={"ritm"} progress={`${rithm}%`}/>
                </div>
            </div>
        </div>
    );
}

export default Tabs;