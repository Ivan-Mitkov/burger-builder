import React from 'react';
import ModalCss from './Modal.module.css'

const modal=(props)=>{
    return(
        <div className={ModalCss.Modal}>
            {props.children}
        </div>
    )
}

export default modal