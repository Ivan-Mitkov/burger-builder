import React from 'react';

import BC from './BuildControl.module.css';

const buildControl=(props)=>{
return (
    <div className={BC.BuildControl}>
        <div className={BC.label}>{props.label}</div>
        <button className={BC.Less}>Less</button>
        <button className={BC.More}>More</button>
    </div>
)
}

export default buildControl;