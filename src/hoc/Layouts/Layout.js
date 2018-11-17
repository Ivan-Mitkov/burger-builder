import React, { Component } from "react";
import Aux from "../Hoc";
import LayoutCss from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };
  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  sideDrawerDrawerHandler = () => {
    console.log("Inside btnDrawerHandler");
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAutenticated}
          drawerToggle={this.sideDrawerDrawerHandler}
        />
        <SideDrawer
          isAuth={this.props.isAutenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}
        />
        <main className={LayoutCss.content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAutenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
