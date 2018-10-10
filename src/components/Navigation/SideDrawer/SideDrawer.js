import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Hoc';

const sideDrawer = (props) => {
    let cssOpenCloseClasses=[classes.SideDrawer,classes.Close];
    if(props.open){
        cssOpenCloseClasses=[classes.SideDrawer,classes.Open];
    }
    const cssClasses= cssOpenCloseClasses.join(' ');
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={cssClasses}>
                <div className={classes.Logo}>
                    <Logo></Logo>
                </div>

                <nav>
                    <NavigationItems></NavigationItems>
                </nav>
            </div>

        </Aux>

    )
}

export default sideDrawer;