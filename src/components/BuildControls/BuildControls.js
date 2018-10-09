import React from 'react';

import BCs from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'

const controls=[
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Meat', type:'meat'},
    {label:'Cheese', type:'cheese'}

]
const buildControls=(props)=>{
return (
    <div className={BCs.BuildControls}>
        {controls.map((bc)=>{
            return <BuildControl key={bc.label} label={bc.label}/>
        })}
    </div>
)
}

export default buildControls;