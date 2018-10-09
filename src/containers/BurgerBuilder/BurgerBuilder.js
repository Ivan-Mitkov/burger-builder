import React, {Component} from 'react';
import Aux from '../../hoc/Hoc';

import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component{

    render(){
        return(
            <Aux>
                <Burger/>
                <div>Built Controls</div>
            </Aux>
        )
    }
}

export default BurgerBuilder;