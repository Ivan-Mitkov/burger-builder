import React from 'react'
import BurgerCss from './Burger.module.css';

import BurgerIngredient from './BurgerIngredien/BurgerIngredient';

const burger = (props) => {
    return (
        <div className={BurgerCss.Burger}>
            <BurgerIngredient type='bread-top'/>
            <BurgerIngredient type='cheese'/>
            <BurgerIngredient type='meat'/>
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
}

export default burger;