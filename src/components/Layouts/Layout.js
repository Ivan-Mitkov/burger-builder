import React, { Component } from 'react';
import Aux from '../../hoc/Hoc'
import LayoutCss from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false });
    }
    sideDrawerDrawerHandler = () => {
        console.log('Inside btnDrawerHandler');
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };

        });
    }
    render() {
                return(
            <Aux>

            <Toolbar drawerToggle={this.sideDrawerDrawerHandler} />
            <SideDrawer
                open={this.state.showSideDrawer}
                closed={this.sideDrawerCloseHandler}>
            </SideDrawer>
            <main className={LayoutCss.content}>
                {this.props.children}
            </main>
            </Aux >
        )
    }

}




export default Layout;