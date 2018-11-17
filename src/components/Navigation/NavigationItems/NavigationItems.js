import React from "react";
import classes from "./NavigationItems.module.css";
import NavItem from "./NavigationItem/NavItem";
const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavItem link={"/"}>Burger Builder</NavItem>
      <NavItem link={"/orders"}>Orders</NavItem>
      {!props.isAuthenticated ? (
        <NavItem link={"/auth"}>Authenticate</NavItem>
      ) : (
        <NavItem link={"/logout"}>Logout</NavItem>
      )}
    </ul>
  );
};

export default navigationItems;
