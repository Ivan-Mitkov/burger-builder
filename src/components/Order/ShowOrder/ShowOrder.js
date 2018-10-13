import React from 'react';

const showOrder=(props)=>{
    return(
        <div style={{
             margin:'10px',
             padding: '5px',
             border:'1px solid #eee',
             display:'inline'}}>
        <span style={{
            textTransform:'capitalize',
           }}> {props.ingr} </span> - ({props.q})</div>
    )
}

export default showOrder;