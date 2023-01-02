import React, {Component, useEffect, useState} from 'react';
import { addUser } from '../../Api/Route';
import M from '@materializecss/materialize/dist/js/materialize.min';

const FormRegister = ({ instanceModal, instanceSideNav }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [weight, setWeight] = useState('');

    function handleInputChange1(e){
        setName(e.target.value);
    }

    function handleInputChange2(e){
        setPassword(e.target.value);
    }

    function handleInputChange3(e){
        setWeight(e.target.value);
    }

    useEffect(() => {
        let input = document.getElementById("username").autofocus;
    }, []);

    async function signin(e) {
        e.preventDefault();

        try{
            var query = await addUser(name, password);
            var result = await query.json();
            M.toast({
                    html: `${result.msg}!`,
                    classes: 'green accent-4 rounded',
                    inDuration:250,
            }); 

        } catch(e){
            alert(e);
        }
        instanceModal.close();
        instanceSideNav.close();
    }

    return (
        <form className="col s12 container" action="" onSubmit={signin} >
            <span className="card-title black-text">Sign In</span>
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
                <div className="input-field col s12">
                    <input id="weight"
                           type="number"
                           className="validate"
                           onChange={handleInputChange3}
                    />
                    <label htmlFor="weight">Weight</label>
                </div>
            </div>

            <div className="row">
                <div className="input-field col s6">
                    <button className="purple darken-3 btn btn-large waves-effect waves-light"
                            type="submit"
                            name="action">Sign In
                        <i className="material-icons right">send</i>
                    </button>
                </div>
            </div>
        </form>
    );
}

export default FormRegister;