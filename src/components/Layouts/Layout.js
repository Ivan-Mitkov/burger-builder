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
    btnDrawerHandler = () => {
        console.log('Inside btnDrawerHandler')
        if(this.state.showSideDrawer){
            this.setState({ showSideDrawer: false });
        }else{
            this.setState({ showSideDrawer: true });
        }
        
    }

    render() {
        return (
            <Aux>
               
                <Toolbar />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler}>
                </SideDrawer>
                <main className={LayoutCss.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }

}




export default Layout;