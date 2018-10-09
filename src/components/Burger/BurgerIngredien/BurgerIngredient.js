import React, { Component } from 'react';
import ingrCss from './BurgerIngredient.module';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {


    render() {
        let ingredient = null;
        switch (this.props.type) {
            case ('bread-bottom'):
                ingredient = <div className={ingrCss.BreadBottom}></div>
                break;
            case ('bread-top'):
                ingredient = <div className={ingrCss.BreadTop}>
                    <div className={ingrCss.Seeds1}></div>
                    <div className={ingrCss.Seeds2}></div>
                </div>
                break;
            case ('meat'):
                ingredient = <div className={ingrCss.Meat}></div>
                break;
            case ('salad'):
                ingredient = <div className={ingrCss.Salad}></div>
                break;
            case ('bacon'):
                ingredient = <div className={ingrCss.Bacon}></div>
                break;
            case ('cheese'):
                ingredient = <div className={ingrCss.Cheese}></div>
                break;
            default:
                ingredient = null;
        }
        return ingredient;

    }
}

BurgerIngredient.prototype={
    type:PropTypes.string.isRequired
}

export default BurgerIngredient;