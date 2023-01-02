import React from 'react';
import {Link} from "react-router-dom";

const Breadcrumbs = ({ arrayNames }) => {

    return (
        <div className="">
            <nav className="purple darken-3">
                <div className="container nav-wrapper">
                    <div className="col s12">
                        { arrayNames.map(a => {
                            return (
                                <Link to="/" className="breadcrumb">{ a.name }</Link>
                            )
                        })}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Breadcrumbs;