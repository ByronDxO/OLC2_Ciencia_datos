import Slider from "../Components/Widgets/Slider";
import {useEffect, useState} from "react";
import M from '@materializecss/materialize/dist/js/materialize.min';

const Welcome = ({ setArrayNames }) => {

    useEffect(() => {
        M.AutoInit();
        let slider = document.querySelector('.slider');
        let instanceSlider = M.Slider.init(slider, {
            "height": 700
        });

        let initialObjects = [
            { link: "/", name: "inicio" },
        ];
        setArrayNames(initialObjects);

    }, []);

    return (
        <div>
            <Slider />
        </div>
    );
}

export default Welcome;