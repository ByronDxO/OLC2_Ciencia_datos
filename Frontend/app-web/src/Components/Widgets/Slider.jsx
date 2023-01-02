import box1 from '../../res/img/box1.jpg';
import box2 from '../../res/img/box2.jpg';
import box3 from '../../res/img/box3.jpg';

const Slider = () => {

    return (
        <div className="slider">
            <ul className="slides">
                <li>
                    <img
                        width="100%"
                        src={box1}
                    />
                        <div className="caption center-align">
                            <h3>Regresiones</h3>
                           
                        </div>
                </li>
                <li>
                    <img width="100%" src={box2} />
                        <div className="caption left-align">
                            <h3>Clasificadores</h3>
                      </div>
                </li>
                <li>
                    <img width="100%" src={box3} />
                        <div className="caption right-align">
                            <h3>Redes Neuronales</h3>
                      </div>
                </li>
            </ul>
        </div>
    );
}

export default Slider;