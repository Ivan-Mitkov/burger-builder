import React from 'react'

import BackdropCss from './Backdrop.module.css';

const backdop=(props)=>{
    return (
        props.show?<div className={BackdropCss.Backdrop}
            onClick={props.clicked}></div>:null
    )
}
export default backdop;