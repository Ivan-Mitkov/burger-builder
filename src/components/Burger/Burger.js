import React from 'react'
import BurgerCss from './Burger.module.css';

import BurgerIngredient from './BurgerIngredien/BurgerIngredient';

const burger = (props) => {
    //sazdavame masiv s keys i dalgina kolkoto sa ingredients
    let transformedIngr=Object.keys(props.ingredients)
        //v gornia masiv sazdava masivi s tolkova ingred kolkoto ima v burgera
        .map((ingKey)=>{return [...Array(props.ingredients[ingKey])]
            //vav vseki edin ot nested masivite vkava jsx s index imeto i indeksa i type imeto
                                   .map((_,index)=>{
                                          return(
                                                <BurgerIngredient key={ingKey+index} type={ingKey}/>
                                          )
                                        })
                            });
    console.log(transformedIngr);
    return (
        <div className={BurgerCss.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngr}
            <BurgerIngredient type='bread-bottom'/>
            
        </div>
    );
}

export default burger;