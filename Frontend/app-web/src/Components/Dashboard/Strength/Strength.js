import LineChart from '../Chart/LineChart';
import React, { useState, useEffect } from 'react';
import { MY_AUTH_USER, MY_AUTH_PASS, MY_AUTH_ID } from '../../../config/env';
import M from '@materializecss/materialize/dist/js/materialize.min';
import { getGraphStrength } from '../../../Api/Route';

function Strength(props){ 

    /* CONFIG */
    const [ range, setRange ] = useState(0);
    const [ tension, setTension ] = useState(0.0);
    const [ label, setLabel ] = useState([]);
    const [ datas, setDatas ] = useState([]);
    const [ title, setTitle ] = useState('Fuerza');
    const [ loading, setLoading] = useState(false);

    /* USUARIO */
    const [id, setId]           = useState(window.localStorage.getItem(MY_AUTH_ID));
    const [usuario, setUsuario] = useState(window.localStorage.getItem(MY_AUTH_USER));
    const [pass, setPass]       = useState(window.localStorage.getItem(MY_AUTH_PASS));

    /* Datos */
    const [limit, setLimit ] = useState('');

    function handleInputChangeNumero(e){
        setRange(e.target.value);        
    }

    function handleInputChange1(e){
        setLimit(e.target.value);  
    }


    useEffect(() => {
        
        var elems = document.querySelectorAll('.datepicker');
        var instances = M.Datepicker.init(elems, {
            "format": "yyyy-mm-dd",
        });

    });


    async function getGraph(){
        M.toast({
            html: `Obteniendo Datos!!`,
            classes: 'green accent-4 rounded',
            inDuration:250,
        });
        /* Asignar fechas*/
        var fecha1 = document.getElementById("dateInitial").value;
        var fecha2 = document.getElementById("dateFinal").value;
        // console.log(fecha1, fecha2, limit, id);

        try {
            var query = await getGraphStrength(id, fecha1, fecha2, limit);
            var result = await query.json();
            console.log(result.data.length);
            var labels = []
            var data = []
            for(var i=0; i<result.data.length; i++){
                labels.push(result.data[i].fecha + " | " + result.data[i].hora);
                data.push(result.data[i].valor);
            }

            /* visualizar graph*/
            setLoading(false);
            setTension(range/100);
            setLabel(labels);
            setDatas(data);
            setLoading(true);

        } catch(e) {
            alert(e);
        }

        
    }

    return(

        <div className="row">
            <h3 className="align-text center">Grafica de Fuerza</h3>

            <div className="row">
                <div className="col s3">
                    <div className="align-text center">
                        <div className="row">
                        <label className="purple-text text-lighten-2 align-text center">Fecha Final</label>
                        </div>
                         <div className="container white" >
                            <input type="text" placeholder="Fecha Inicial" className="datepicker" id="dateInitial" />
                        </div>
                    </div>
                </div>

                <div className="col s3">
                    <div className="align-text center">
                        <div className="row">
                        <label className="purple-text text-lighten-2 align-text center">Fecha Final</label>
                        </div>
                        <div className="container white" >
                            <input type="text" placeholder="Fecha Inicial" className="datepicker" id="dateFinal" />
                        </div>
                    </div>
                </div>

                <div className="col s3">
                    <div className="align-text center">
                      <div className="row">
                            <label className="purple-text text-lighten-2 align-text center">Cantidad</label>
                        </div>
                        <div className="row">
                            <input placeholder="Cantidad" type="text" className="" value={limit} onChange={handleInputChange1} />
                        </div>
                    </div> 
                </div>

                <div className="col s3">
                    <a className="btn-floating btn-large waves-effect waves-light green" type="submit" onClick={getGraph}><i className="material-icons">search</i></a>
                    <a className="btn-floating btn-large waves-effect waves-light red"   type="submit" onClick={()=>{
                        setLoading(false)
                        M.toast({
                            html: `Limpiando Datos!!`,
                            classes: 'red accent-4 rounded',
                            inDuration:250,
                        });
                    }}><i className="material-icons">replay</i></a>
                    

                </div>
                  
            </div>
             <div className="row">
             <center>Rango de Tensión de la Gráfica</center>
                <form action="#">
                    <p class="range-field">
                      <input type="range" value={range} onChange={handleInputChangeNumero} id="test5" min="0" max="100" />
                    </p>
                  </form>
            </div>
            <div className="row">

                
                    { 
                        (loading) ? (

                            (<LineChart 
                                dataTitle   = {title}
                                dataValue   = {datas}
                                labels      = {label}   
                                dataTension = {tension}
                            />)
                        ) : (<br/> )
                    }
                    
            </div>

            <br/><br/><br/><br/><br/><br/>
            
        </div>
            
    );
}


export default Strength;