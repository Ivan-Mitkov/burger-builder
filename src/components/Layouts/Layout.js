import React from 'react';
import Aux from '../../hoc/Hoc'
import LayoutCss from './Layout.module.css';

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, BackDrop</div>
        <main className={LayoutCss.content}>
            {props.children}
        </main>
    </Aux>

);

export default layout;