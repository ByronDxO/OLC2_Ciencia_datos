import '../../App.css';
import {useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import useAuthContext from '../../hooks/useAuthContext';
import { getLogin } from '../../Api/Route';
import { MY_AUTH_USER, MY_AUTH_PASS, MY_AUTH_ID } from '../../config/env';
import M from '@materializecss/materialize/dist/js/materialize.min';

const Form = ({ name, setName, instanceModal, instanceSideNav }) => {
    let navigate = useNavigate();
    const {loginUser} = useAuthContext();

    const [password, setPassword] = useState('');


    function handleInputChange1(e){
        setName(e.target.value);
    }
    function handleInputChange2(e){
        setPassword(e.target.value);
    }
    

    useEffect(() => {
        let input = document.getElementById("username").autofocus;
    }, []);

    async function login(e) {
        e.preventDefault();
        try{

            
            var query = await getLogin(name, password);
            var result = await query.json();
            // console.log(result.usr)
            if (result.usr != "null" && result.usr.nombre == name && result.usr.pass == password) {

                window.localStorage.removeItem(MY_AUTH_USER);
                window.localStorage.removeItem(MY_AUTH_PASS);
                window.localStorage.removeItem(MY_AUTH_ID);

                window.localStorage.setItem(MY_AUTH_ID,   result.usr.id);
                window.localStorage.setItem(MY_AUTH_USER, result.usr.nombre);
                window.localStorage.setItem(MY_AUTH_PASS, result.usr.pass);
                loginUser();
                M.toast({
                    html: `Bienvenido, ${result.usr.nombre}!`,
                    classes: 'green accent-4 rounded',
                    inDuration:250,
                });
            } else {
                window.localStorage.removeItem(MY_AUTH_USER);
                window.localStorage.removeItem(MY_AUTH_PASS);
                window.localStorage.removeItem(MY_AUTH_ID);

                window.localStorage.setItem(MY_AUTH_ID,   '');
                window.localStorage.setItem(MY_AUTH_USER, '');
                window.localStorage.setItem(MY_AUTH_PASS, '');
                M.toast({
                    html: 'Usuario/Contraseña Incorrectos',
                    classes: 'red darken-1 rounded'
                });
            }
        } catch(e){
            M.toast({
                html: 'Usuario/Contraseña Incorrectos',
                classes: 'red darken-1 rounded',
                inDuration:250,
            });
        }
        instanceModal.close();
        instanceSideNav.close();
 
        
    }

    return (
        <form className="col s12 container" action="">
            <span className="card-title black-text">Login</span>
            <div className="row">
                <div className="input-field col s12">
                    <input id="username"
                           type="text"
                           className="validate"
                            autoComplete="off"
                            onChange={handleInputChange1}
                            />
                    <label htmlFor="username">Username</label>
                </div>
            </div>

            <div className="row">
                <div className="input-field col s12">
                    <input id="password"
                            type="password"
                            className="validate"
                            onChange={handleInputChange2}
                            />
                    <label htmlFor="password">Password</label>
                </div>
            </div>

            <div className="row">
                <div className="input-field col s6">
                    <button className="purple darken-3 btn btn-large waves-effect waves-light"
                            type="submit"
                            name="action"
                            onClick={(e) => login(e)}>Login
                        <i className="material-icons right">send</i>
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Form;