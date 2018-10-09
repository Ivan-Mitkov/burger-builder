import React from 'react';

import BCs from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' }

]
const buildControls = (props) => {
    return (
        <div className={BCs.BuildControls}>
        <p>Current Price: <strong> {props.price.toFixed(2)}</strong></p>
            {controls.map((bc) => {
                return <BuildControl
                    key={bc.label}
                    label={bc.label}
                    //add prop for more, connect it to type and then should be passed to BuildControl
                    more={() => props.ingredientAdded(bc.type)}
                    less={() => props.ingredientRemoved(bc.type)} 
                    disabled={props.disabled[bc.type]}/>
            })}
        </div>
    )
}

export default buildControls;