import React from 'react';

import BC from './BuildControl.module.css';

const buildControl = (props) => {
    return (
        <div className={BC.BuildControl}>
            <div className={BC.label}>{props.label}</div>
            <button className={BC.Less}
                onClick={props.less}
                disabled={props.disabled}>Less</button>
            <button className={BC.More}
                //receive prop for more from BuildControls
                onClick={props.more}>More</button>
        </div>
    )
}

export default buildControl;