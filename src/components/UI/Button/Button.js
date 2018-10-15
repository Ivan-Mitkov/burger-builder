import React from 'react';

import ButtonCss from './Button.module.css';

const button = (props) => {
    return (
        <button
            onClick={props.clicked}
            disabled={props.disabled}
            className={[ButtonCss.Button, ButtonCss[props.btnType]].join(' ')}
        >{props.children}</button>
    );
}

export default button;