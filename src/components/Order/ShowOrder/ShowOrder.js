import React from 'react';

const showOrder=(props)=>{
    return(
        <div style={{ margin:'10px 10px 0 0'}}>
        <span style={{
            textTransform:'capitalize',
           }}>{props.ingr} </span> - ({props.q})</div>
    )
}

export default showOrder;