import M from '@materializecss/materialize/dist/js/materialize.min';
import React, { useState, useEffect } from 'react';
import Strength from "./Strength/Strength";
import Velocity from "./Velocity/Velocity";
import Rate from "./Rate/Rate";
import Information from "./Information/Information";
const Tabs = () => {

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        M.AutoInit();
        let tabs = document.querySelectorAll("tabs");
        let instanceTabs = M.Tabs.init(tabs);
    }, []);

    return (
    
        <div className="row">
            <div className="col s12">
                <ul className="tabs tabs-fixed-width tab-demo z-depth-1 ">

                    <li className="tab col s2">

                       <a href="#test1"><i className="material-icons">fitness_center</i></a>
                    </li>

                    <li className="tab col s3">
                        <a href="#test2"><i className="material-icons">directions_run</i></a>
                    </li>

                    <li className="tab col s3">
                        <a href="#test3"><i className="material-icons">whatshot</i></a>
                    </li>
                    <li className="tab col s3">
                        <a href="#test4"><i className="material-icons">perm_identity</i></a>
                    </li>
                </ul>
            </div>
            <br/><br/><br/><br/><br/>
            <div className="row">

                <div id="test1" className="col s10 m12">

                    <Strength />
                
                </div>
                <div id="test2" className="col s10 m12">
                    <Velocity />
                </div>
                <div id="test3" className="col s10 m12">
                    <Rate />
                </div>
                <div id="test4" className="col s10 m12">
                    <Information />
                </div>
               
            </div>
        </div>
    );
}

export default Tabs;