import React, { useState, useEffect } from 'react';
import { MY_AUTH_USER, MY_AUTH_PASS, MY_AUTH_ID } from '../../../config/env';
import M from '@materializecss/materialize/dist/js/materialize.min';
import { getReporte1, getReporte2, getReporte3 } from '../../../Api/Route';

function Strength(props){ 

    /* CONFIG */
    const [ loading,     setLoading]     = useState(false);
    const [ loading2,    setLoading2]     = useState(false);
    const [ option1,     setOption1]     = useState('0');
    const [ viewOption1, setViewOption1] = useState(false);
    const [ option2,     setOption2]     = useState('0');
    const [ viewOption2, setViewOption2] = useState(false);
    const [ result,      setResult]      = useState([]);
    const [ totalTime,   setTotalTime]   = useState(0);


    /* DATA */
    const [ textData,   setTextData]    = useState('');
    const [ textResult, setTextResult]  = useState('');

    /* USUARIO */
    const [id, setId]           = useState(window.localStorage.getItem(MY_AUTH_ID));
    const [usuario, setUsuario] = useState(window.localStorage.getItem(MY_AUTH_USER));
    const [pass, setPass]       = useState(window.localStorage.getItem(MY_AUTH_PASS));


    useEffect(() => {
        
        var elems = document.querySelectorAll('.datepicker');
        var instances = M.Datepicker.init(elems, {
            "format": "yyyy-mm-dd",
        });

    }, []);

    function handleInputChange1(e){
        setOption1(e.target.value);  
    }

    function handleInputChange2(e){
        setOption2(e.target.value);  
    }

    async function getInformation(){
        
        /* visualizar graph*/
        setLoading(false);
        setLoading2(false);
        setLoading(true);

        try {

            if (option1 === '1'){ // Reporte 1

                M.toast({
                    html: `Obteniendo, número de entrenamientos!`,
                    classes: 'black accent-4 rounded',
                    inDuration:250,
                });

                var query = await getReporte1(id);
                var result = await query.json();
                console.log(result);
                setTextData('Número de Entrenamientos: ');
                setTextResult(result.entrenamiento);

            } else if( option1 === '2' ) {
                

                if (option2 == '1') {
                    M.toast({
                        html: `Obteniendo, número de entrenamientos por Tipo Fuerza!`,
                        classes: 'blue accent-4 rounded',
                        inDuration:250,
                    });

                    var query = await getReporte2(id, option2);
                    var result = await query.json();
                    console.log(result);
                    setTextData('Número de Entrenamientos por Tipo Fuerza: ');
                    setTextResult(result.entrenamiento);

                } else if (option2 == '2') {
                    M.toast({
                        html: `Obteniendo, número de entrenamientos por Tipo Velocidad!`,
                        classes: 'grey darked-1 rounded',
                        inDuration:250,
                    });

                    var query = await getReporte2(id, option2);
                    var result = await query.json();
                    console.log(result);
                    setTextData('Número de Entrenamientos por Tipo Velocidad: ');
                    setTextResult(result.entrenamiento);

                } else if (option2 == '3') {
                    M.toast({
                        html: `Obteniendo, número de entrenamientos por Tipo Ritmo!`,
                        classes: 'cyan accent-4 rounded',
                        inDuration:250,
                    });

                    var query = await getReporte2(id, option2);
                    var result = await query.json();
                    console.log(result);
                    setTextData('Número de Entrenamientos por Tipo Ritmo: ');
                    setTextResult(result.entrenamiento);

                } else {
                    M.toast({
                        html: `Debe de ingresar Tipo`,
                        classes: 'red accent-4 rounded',
                        inDuration:250,
                    });
                }

            } else if( option1 === '3') {
                M.toast({
                    html: `Obteniendo, tiempo total de Entrenamiento!`,
                    classes: 'orange accent-4 rounded',
                    inDuration:250,
                });
                var query = await getReporte3(id);
                var result = await query.json();
                setLoading2(true);
                setTextData('Tiempo total de Entrenamiento:\n ');
                setResult(result);

                var hora = 0, minuto = 0 , segundos = 0;
                result.data.map(i => {
                    var dataResult = i.total_tiempo.split(":");

                    hora += parseInt(dataResult[0]);
                    minuto += parseInt(dataResult[1]);
                    segundos += parseInt(dataResult[2]);

                });

                console.log((hora + (minuto/60) + (segundos/3600)).toFixed(2));
                setTotalTime((hora + (minuto/60) + (segundos/3600)).toFixed(2));

            }else {
                M.toast({
                    html: `Error en Opción de Entrenamiento`,
                    classes: 'red accent-4 rounded',
                    inDuration:250,
                });
            }

            

        } catch(e) {
            M.toast({
                html: `Error en datos de información`,
                classes: 'red accent-4 rounded',
                inDuration:250,
            });
            console.log(e);
        }

        
    }

    return(

        <div className="row">
           <h3 className="align-text center">Información Personal de {usuario}</h3>
            <div className="row">
                

                <div className="col s4">
                    <div className="align-text center">
                        <div className="row">
                             <label className="purple-text text-lighten-2 align-text center">Opción de Entrenamiento</label>
                        </div>
                        <div className="row">
                            <select className="browser-default" onChange={handleInputChange1} >
                                <option value="" disabled selected>Choose your option</option>
                                <option value="1">Número de Entranamientos</option>
                                <option value="2">Número de Entranamientos por Tipo</option>
                                <option value="3">Tiempo Total de Entramiento</option>
                            </select>
                                    
                        </div>
                    </div>
                </div>

                <div className="col s4">
                    <div className="align-text center">
                        <div className="row">
                             <label className="purple-text text-lighten-2 align-text center">Tipo de Entrenamiento</label>
                        </div>
                        <div className="row">
                            <select className="browser-default" onChange={handleInputChange2} >
                                <option value="0">Choose your option</option>
                                <option value="1">Fuerza</option>
                                <option value="2">Velocidad</option>
                                <option value="3">Ritmo</option>
                            </select>
                                    
                        </div>
                    </div>
                </div>

                <div className="col s4">
                    <a className="btn-floating btn-large waves-effect waves-light green" type="submit" onClick={getInformation}><i className="material-icons">search</i></a>
                    <a className="btn-floating btn-large waves-effect waves-light red"   type="submit" onClick={()=>{
                        setLoading(false);
                        setLoading2(false);
                        M.toast({
                            html: `Limpiando Datos!!`,
                            classes: 'red accent-4 rounded',
                            inDuration:250,
                        });
                    }}><i className="material-icons">replay</i></a>

                </div>

            </div>

            <div className="row">

                
                    { 
                        (loading) ? (

                            (
                                
                                (loading2) ? (
                                    <>
                                    <table >
                                    <thead>
                                      <tr>
                                          <th>Cantidad de Entrenamientos </th>
                                          <th>Tiempo Total (horas)</th>
                                      </tr>
                                    </thead>
                                        <tbody>
                                            <th>{result.data.length}</th>
                                            <th>{totalTime}</th>
                                      </tbody>     
                                    </table>

                                    <table >
                                    <thead>
                                      <tr>
                                          <th>Fecha</th>
                                          <th>Id Entrenamiento</th>
                                          <th>Id Tipo</th>
                                          <th>Tiempo</th>
                                      </tr>
                                    </thead>
                                        <tbody>
                                                         
                                            {        
                                                result.data.map(i => {
                                                    return(
                                                        <tr>
                                                        <td>{i.fecha}</td>
                                                        <td>{i.idEntrenamiento}</td>
                                                        <td>{i.idTipo}</td>
                                                        <td>{i.total_tiempo}</td>
                                                      </tr>
                                                        
                                                        )
                                                })   
                                            }
                                        </tbody>     
                                    </table>
                                    </>
                                ) : ( <h4>{textData}{textResult} </h4> )
        
                            )
                        ) : (<br/> )
                    }

                    
            </div>

            

            <br/><br/><br/><br/><br/><br/>

            
        </div>
            
    );
}


export default Strength;