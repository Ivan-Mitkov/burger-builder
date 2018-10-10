import React from 'react';

import ToolbarCss from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => {
    return (
        <header className={ToolbarCss.Toolbar}>
            <DrawerToggle showSideDrawer={props.clicked}>MENU</DrawerToggle>
            <div className={ToolbarCss.Logo}>
                <Logo />
            </div>

            <nav className={ToolbarCss.DesktopOnly}>
                <NavigationItems></NavigationItems>
            </nav>
        </header>
    )
}

export default toolbar;