const CardActivities = ({ title, unit, typeClass, progress, retro }) => {

    return (
        <div className="card blue-grey darken-4">
            <div className="card-content white-text">
                <span className="card-title">{ title }</span>
            </div>
            <div className="card-action">
                <div className="progress">
                    <div className={`determinate ${typeClass}`} style={{ width: `${progress}` }}></div>
                </div>
                <span className="white-text">{ unit }</span>
                <h5 className={ "white-text" }>{ retro }</h5>
            </div>
        </div>
    );
}

export default CardActivities;