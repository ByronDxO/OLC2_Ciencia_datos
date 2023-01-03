import {useEffect, useState} from "react";
import M from '@materializecss/materialize/dist/js/materialize.min';
import {Link, useNavigate} from "react-router-dom";
import useAuthContext from '../../hooks/useAuthContext';
import Modal from "./Modal";

const Navbar = ({ name = undefined, setName = undefined }) => {

    const [ instance, setInstance ] = useState(null);
    const [ instanceModal, setInstanceModal ] = useState(null);
    const [ typeForm, setTypeForm ] = useState("");
    let navigate = useNavigate();
    let menu = "";
    let menuSide = "";

    const {logoutUser} = useAuthContext();
    const {isAuthenticated} = useAuthContext();

    useEffect(() => {
        M.AutoInit();
        let sideNav = document.querySelector('.sidenav');
        let instanceSideNav = M.Sidenav.init(sideNav);
        setInstance(instanceSideNav);

        let modal = document.querySelector('.modal');
        setInstanceModal(M.Modal.init(modal));

    }, []);

    function closeSideNavbar() {
        instance.close();
    }

    function logout() {
        logoutUser();
        M.toast({
            html: 'SIGN OUT',
            classes: 'red darken-1 rounded',
            inDuration:250,
        });
        window.location.href = "/";

    }

    if ( !isAuthenticated ) {
        menu = (
            <div>
                <ul className="right hide-on-med-and-down">
                    <li><a className="waves-effect waves-light btn modal-trigger"
                           href="/dashboard"
                           
                        >
                        Regresion Lineal
                        
                    </a></li>

                    <li><a className="blue darken-1 waves-effect waves-light
                                    btn modal-trigger"
                            href="#modal1"
                            onClick={ () => setTypeForm("sign_in") }>
                        Regresion Polinomial 
                        
                    </a></li>
                    <li><a className="blue darken-1 waves-effect waves-light
                                    btn modal-trigger"
                            href="#modal1">Clasificador Gaussiano</a></li>
                    <li><a className="blue darken-1 waves-effect waves-light
                                    btn modal-trigger"
                            href="#modal1">clasificador de Arboles de Decision </a></li>
                    <li><a className="blue darken-1 waves-effect waves-light
                                    btn modal-trigger"
                            href="#modal1">Redes Neuronales</a></li>
                </ul>

               
            </div>
        );
        menuSide = (
            <div>
                <li>
                    <a className="waves-effect waves-light btn modal-trigger"
                          href="#modal1"
                          onClick={ () => setTypeForm("login")} >Login
                    <i className="material-icons right">person</i>
                    </a>
                </li>

                <li>
                    <a className="blue darken-1 waves-effect waves-light btn"
                       onClick={ () => setTypeForm("sign_in") }
                        >Sign In
                    <i className="material-icons right">person_add</i>
                    </a>
                </li>
                <Modal instanceSideNav={instance}
                       instanceModal={instanceModal}
                       name={name}
                       setName={setName} />
            </div>
        )
    } else {
        menu = (
            <ul className="right hide-on-med-and-down">
                <li><Link to="/dashboard" className="waves-effect waves-light btn">
                    Dashboard
                    <i className="material-icons right">dashboard</i>
                </Link></li>

                <li><Link to="/training" className="blue darken-1 waves-effect waves-light btn">
                    Trainings
                    <i className="material-icons right">accessibility</i>
                </Link></li>

                <li><a className="red darken-1 waves-effect waves-light btn"
                        onClick={logout}>
                    Sign Out
                    <i className="material-icons right">exit_to_app</i>
                </a></li>
            </ul>
        )
        menuSide = (
            <div>
                <li><Link to="/dashboard"
                          className="waves-effect waves-light btn"
                          onClick={closeSideNavbar}
                >Dashboard
                    <i className="material-icons right">dashboard</i>
                </Link></li>

                <li><Link to="/training"
                          className="blue darken-1 waves-effect waves-light btn"
                          onClick={closeSideNavbar}
                >Trainings
                    <i className="material-icons right">accessibility</i>
                </Link></li>

                <li><a className="red darken-1 waves-effect waves-light btn"
                       onClick={logout}
                >Sign Out
                    <i className="material-icons right">exit_to_app</i>
                </a></li>
            </div>
        )
    }

    return (
        <div>
            <nav>
                <div className="nav-wrapper purple darken-3">
                    <Link to="/" href="#!" className="brand-logo">
                        Machine<strong>Learning</strong>
                    </Link>

                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i
                        className="material-icons">menu</i></a>

                    { menu }
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li>
                    <Link to="/" className="brand-logo"
                          onClick={() => closeSideNavbar(instance)}
                    >
                    Box<strong>Smart</strong>
                    </Link>
                </li>

                { menuSide }
            </ul>
        </div>
    );
}

export default Navbar;