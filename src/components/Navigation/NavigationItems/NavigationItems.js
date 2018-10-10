import React from 'react';
import classes from './NavigationItems.module.css'
import NavItem from './NavigationItem/NavItem';
const navigationItems=()=>{
    return(
        <ul className={classes.NavigationItems}>            
          <NavItem link={'/'} active={true}>
              Burger Builder
          </NavItem>
          <NavItem link={'/'}>
              Checkout
          </NavItem>
        </ul>
    )
}

export default navigationItems;
