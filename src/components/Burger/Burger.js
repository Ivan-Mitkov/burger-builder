import React from 'react';
// import {withRouter} from 'react-router-dom';

import BurgerCss from './Burger.module.css';
import BurgerIngredient from './BurgerIngredien/BurgerIngredient';

const burger = (props) => {
    // console.log('Burger:',props)
    //sazdavame masiv s keys i dalgina kolkoto sa ingredients
    let transformedIngr = Object.keys(props.ingredients)
        //v gornia masiv sazdava masivi s tolkova ingred kolkoto ima v burgera
        .map((ingKey) => {
            return [...Array(props.ingredients[ingKey])]
                //vav vseki edin ot nested masivite vkava jsx s index imeto i indeksa i type imeto
                .map((_, index) => {
                    return (
                        <BurgerIngredient key={ingKey + index} type={ingKey} />
                    )
                })
        })
        //flatten the nested array
        .reduce((arr,el)=>{
            return arr.concat(el);
        },[]);
        if(transformedIngr.length===0){
            transformedIngr=<p>Please start adding ingredients </p>
        }
        // console.log(transformedIngr)
    return (
        <div className={BurgerCss.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngr}
            <BurgerIngredient type='bread-bottom' />

        </div>
    );
}

//only BurgerBuilder has prop.history because it's the first direct component in Route
//so to pass thi props in Burger we can use withRoute
// export default withRouter(burger);
export default burger;