import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    const inputClasses=[classes.InputElement];
    let inputEl = null;
    let validationError = null;
    //add css class for invalid validation
    if(props.invalid&&props.touched){
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>Please enter a valid {props.elementType}!</p>;
    }
    switch (props.elementType) {
        case ('input'):
            inputEl = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        case ('textarea'):
            inputEl = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;

        case ('select'):
            inputEl = <select
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map((op, i) => {
                    return (
                        <option key={i} value={op.value}>
                            {op.displayValue}
                        </option>
                    )
                })}

            </select>
            break;
        default:
            inputEl = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}/>

    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputEl}
            {validationError}
        </div>
    )
}

export default input;