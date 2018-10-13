import React from 'react';

import classes from './Order.module.css';
import ShowOrder from './ShowOrder/ShowOrder';

const order = (props) => {
    const ingredients = [];
     console.log('props',props.ingredients);

    for (let ing in props.ingredients) {
        // console.log(ing);
        let singleIng = []
        if(props){
            if (props.ingredients[ing] !== 0) {
                singleIng.push(ing);
                singleIng.push(props.ingredients[ing])
                ingredients.push(singleIng);
            }
        }
       

    }
    console.log('object', ingredients);
    const price=+props.price;
    return (

        <div className={classes.Order}>
            {ingredients.map((ing,index) =>(
                <ShowOrder key={index} ingr={ing[0]} q={ing[1]}  ></ShowOrder>
            ) 
            )}
            <p>Price: <strong>USD {price.toFixed(2)}</strong></p>
        </div>


    )
}

export default order;