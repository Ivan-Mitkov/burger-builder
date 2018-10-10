import React from 'react';

import ButtonCss from './Button.module.css';

const button = (props) => {
    return (
        <button
            onClick={props.clicked}
            className={[ButtonCss.Button, ButtonCss[props.btnType]].join(' ')}
        >{props.children}</button>
    );
}

export default button;