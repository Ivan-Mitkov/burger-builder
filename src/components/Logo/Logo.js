import React from 'react';

//in development webpack need to know the address
import burgerLogo from '../../assets/images/burger-logo.png';
import LogoCss from './Logo.module.css';

const logo =()=>{
    return(
        <div className={LogoCss.Logo}>
            <img src={burgerLogo} alt=''/>
        </div>
    )
}

export default logo;